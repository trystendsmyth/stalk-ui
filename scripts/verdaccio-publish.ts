import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const registry = process.env.STALK_VERDACCIO_REGISTRY ?? 'http://localhost:4873'
const packages = [
  ['@stalk-ui/preset', 'packages/preset/package.json'],
  ['@stalk-ui/i18n', 'packages/i18n/package.json'],
  ['@stalk-ui/cli', 'packages/cli/package.json'],
] as const
const publishEnvironment = {
  ...process.env,
  NPM_CONFIG_PROVENANCE: 'false',
}

execFileSync('pnpm', ['build'], { stdio: 'inherit' })

for (const [packageName, packageJsonPath] of packages) {
  const absolutePackageJsonPath = join(process.cwd(), packageJsonPath)
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
      [
        '--filter',
        packageName,
        'publish',
        '--registry',
        registry,
        '--no-git-checks',
        '--access',
        'public',
      ],
      { env: publishEnvironment, stdio: 'inherit' },
    )
  } finally {
    writeFileSync(absolutePackageJsonPath, originalPackageJson)
  }
}
