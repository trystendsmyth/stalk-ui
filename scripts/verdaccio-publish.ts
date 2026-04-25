import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const registry = process.env.STALK_VERDACCIO_REGISTRY ?? 'http://localhost:4873'
const packageDirectories = ['packages/preset', 'packages/i18n', 'packages/cli'] as const
const publishEnvironment = {
  ...process.env,
  NPM_CONFIG_PROVENANCE: 'false',
}

execFileSync('pnpm', ['build'], { stdio: 'inherit' })

for (const packageDirectory of packageDirectories) {
  const absolutePackageDirectory = join(process.cwd(), packageDirectory)
  const absolutePackageJsonPath = join(absolutePackageDirectory, 'package.json')
  const originalPackageJson = readFileSync(absolutePackageJsonPath, 'utf8')

  try {
    const packageJson = JSON.parse(originalPackageJson) as {
      publishConfig?: Record<string, unknown>
    }
    packageJson.publishConfig = {
      ...packageJson.publishConfig,
      provenance: false,
    }
    writeFileSync(absolutePackageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`)

    execFileSync(
      'pnpm',
      ['publish', '--registry', registry, '--no-git-checks', '--access', 'public'],
      { cwd: absolutePackageDirectory, env: publishEnvironment, stdio: 'inherit' },
    )
  } finally {
    writeFileSync(absolutePackageJsonPath, originalPackageJson)
  }
}
