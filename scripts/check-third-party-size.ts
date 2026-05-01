// Soft cap on the install-time disk footprint of each third-party runtime
// dep. Default 600 KB; override per-package via PACKAGE_SIZE_OVERRIDES.

import { readdirSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { registryItems } from '../registry/ui'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DEFAULT_CAP_BYTES = 600 * 1024

// Override individual caps here when a primitive legitimately exceeds the
// default. Add a brief comment explaining why.
const PACKAGE_SIZE_OVERRIDES: Record<string, number> = {
  // Bundle their own focus-scope/dismissable-layer/roving-focus helpers.
  '@radix-ui/react-dropdown-menu': 1 * 1024 * 1024,
  '@radix-ui/react-select': 1 * 1024 * 1024,
  // ~1500 icon modules; tree-shakes per-icon at the consumer's bundler.
  'lucide-react': 30 * 1024 * 1024,
}

const SELF_PACKAGES = new Set([
  '@stalk-ui/components',
  '@stalk-ui/i18n',
  '@stalk-ui/preset',
  '@stalk-ui/utils',
])

const collectThirdPartyDeps = (): Set<string> => {
  const out = new Set<string>()
  for (const item of registryItems) {
    for (const dep of item.dependencies) {
      if (SELF_PACKAGES.has(dep)) continue
      out.add(dep)
    }
  }
  return out
}

const directorySizeBytes = (directory: string): number => {
  let total = 0
  const stack = [directory]
  while (stack.length > 0) {
    const current = stack.pop()
    if (!current) continue
    let entries: string[]
    try {
      entries = readdirSync(current)
    } catch {
      continue
    }
    for (const entry of entries) {
      const full = join(current, entry)
      let stats
      try {
        stats = statSync(full)
      } catch {
        continue
      }
      if (stats.isDirectory()) {
        stack.push(full)
      } else if (stats.isFile()) {
        total += stats.size
      }
    }
  }
  return total
}

const failures: string[] = []
const warnings: string[] = []

const findPackageDirectory = (packageName: string): string | undefined => {
  const candidates = [
    resolve(projectRoot, 'node_modules', packageName),
    resolve(projectRoot, 'packages/components/node_modules', packageName),
  ]
  for (const candidate of candidates) {
    try {
      if (statSync(candidate).isDirectory()) return candidate
    } catch {
      continue
    }
  }
  return undefined
}

for (const dep of collectThirdPartyDeps()) {
  const packageDirectory = findPackageDirectory(dep)
  if (!packageDirectory) {
    warnings.push(`${dep}: not installed; run 'pnpm install' before running this gate`)
    continue
  }
  const bytes = directorySizeBytes(packageDirectory)

  const cap = PACKAGE_SIZE_OVERRIDES[dep] ?? DEFAULT_CAP_BYTES
  if (bytes > cap) {
    failures.push(
      `${dep}: ${(bytes / 1024).toFixed(1)} KB exceeds cap ${(cap / 1024).toFixed(1)} KB`,
    )
  }
}

if (warnings.length > 0) {
  for (const warning of warnings) console.warn(`  warn: ${warning}`)
}

if (failures.length > 0) {
  console.error('Third-party install-size check failed:')
  for (const failure of failures) console.error(`  - ${failure}`)
  console.error(
    `\n${String(failures.length)} package${failures.length === 1 ? '' : 's'} exceed their install-size cap.`,
  )
  console.error('Justified bumps go in PACKAGE_SIZE_OVERRIDES with a comment.')
  process.exit(1)
}

console.log(
  `Third-party install-size check passed for ${String(collectThirdPartyDeps().size)} runtime dependencies (default cap ${(DEFAULT_CAP_BYTES / 1024).toFixed(0)} KB).`,
)
