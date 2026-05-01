// Asserts every direct third-party runtime dep of a registry component uses
// a permissive license. Transitive coverage is delegated to dependency-review.

import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { registryItems } from '../registry/ui'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const ALLOWED = new Set([
  '0BSD',
  'Apache-2.0',
  'BSD-2-Clause',
  'BSD-3-Clause',
  'CC0-1.0',
  'ISC',
  'MIT',
])

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

const findInstalledPackageJson = (packageName: string): string | undefined => {
  const candidates = [
    resolve(projectRoot, 'node_modules', packageName, 'package.json'),
    resolve(projectRoot, 'packages/components/node_modules', packageName, 'package.json'),
  ]
  for (const candidate of candidates) {
    try {
      readFileSync(candidate, 'utf8')
      return candidate
    } catch {
      continue
    }
  }
  return undefined
}

const failures: string[] = []
const warnings: string[] = []

for (const dep of collectThirdPartyDeps()) {
  const packageJsonPath = findInstalledPackageJson(dep)
  if (!packageJsonPath) {
    warnings.push(
      `${dep}: not installed in the workspace; install once via 'pnpm install' before running this gate`,
    )
    continue
  }
  const manifest = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as {
    license?: string | { type?: string }
    licenses?: { type: string }[]
  }

  let license: string | undefined
  if (typeof manifest.license === 'string') {
    license = manifest.license
  } else if (manifest.license && typeof manifest.license === 'object') {
    license = manifest.license.type
  } else if (Array.isArray(manifest.licenses) && manifest.licenses[0]?.type) {
    license = manifest.licenses[0].type
  }

  if (!license) {
    failures.push(`${dep}: package.json declares no 'license' field`)
    continue
  }

  const segments = license
    .replace(/[()]/g, '')
    .split(/\s+(?:OR|AND|or|and)\s+/)
    .map((segment) => segment.trim())

  const disallowed = segments.filter((segment) => !ALLOWED.has(segment))
  if (disallowed.length > 0) {
    failures.push(`${dep}: disallowed license '${license}'`)
  }
}

if (warnings.length > 0) {
  for (const warning of warnings) console.warn(`  warn: ${warning}`)
}

if (failures.length > 0) {
  console.error('Third-party license check failed:')
  for (const failure of failures) console.error(`  - ${failure}`)
  console.error(
    `\n${String(failures.length)} package${failures.length === 1 ? '' : 's'} declare a license that is not on the allow-list.`,
  )
  console.error(`Allow-list: ${[...ALLOWED].sort((a, b) => a.localeCompare(b)).join(', ')}.`)
  process.exit(1)
}

console.log(
  `Third-party license check passed for ${String(collectThirdPartyDeps().size)} runtime dependencies.`,
)
