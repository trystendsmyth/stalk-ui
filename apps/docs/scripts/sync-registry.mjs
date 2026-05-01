/**
 * Mirror the canonical registry artifacts into the docs app's public folder so
 * `/r/*.json` is served wherever the docs are deployed.
 *
 * Source of truth: <repo-root>/public/r (built by `pnpm build:registry`).
 * Destination:     apps/docs/public/r (gitignored, rebuilt every dev/build).
 */
import { copyFileSync, cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const docsPublic = join(here, '..', 'public')
const repoRoot = join(here, '..', '..', '..')
const repoRegistry = join(repoRoot, 'public', 'r')
const repoHeaders = join(repoRoot, 'public', '_headers')
const docsRegistry = join(docsPublic, 'r')
const docsHeaders = join(docsPublic, '_headers')

if (!existsSync(repoRegistry)) {
  console.error(
    `[sync-registry] missing source ${repoRegistry}. Run \`pnpm build:registry\` from the repo root first.`,
  )
  process.exit(1)
}

rmSync(docsRegistry, { force: true, recursive: true })
mkdirSync(docsRegistry, { recursive: true })
cpSync(repoRegistry, docsRegistry, { recursive: true })

if (existsSync(repoHeaders)) {
  copyFileSync(repoHeaders, docsHeaders)
}

console.log(`[sync-registry] copied ${repoRegistry} -> ${docsRegistry}`)
