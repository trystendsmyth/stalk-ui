import { execFileSync } from 'node:child_process'
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

interface PackageJson {
  exports?: Record<string, unknown>
}

const packageRoot = 'packages/i18n'
const packageJsonPath = join(packageRoot, 'package.json')
const localesDirectory = join(packageRoot, 'src/locales')
const originalPackageJson = readFileSync(packageJsonPath, 'utf8')

try {
  execFileSync('pnpm', ['--filter', '@stalk-ui/i18n', 'run', 'prepack'], { stdio: 'inherit' })

  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as PackageJson
  const sourceLocales = readdirSync(localesDirectory)
    .filter((file) => file.endsWith('.ts') && !file.endsWith('.test.ts') && !file.includes('.d.ts'))
    .map((file) => file.replace('.ts', ''))

  for (const locale of sourceLocales) {
    const exportKey = `./locales/${locale}`

    if (packageJson.exports?.[exportKey] === undefined) {
      throw new Error(`Missing explicit export for ${exportKey} after prepack.`)
    }
  }

  console.log(`i18n exports drift check passed (${String(sourceLocales.length)} locales).`)
} finally {
  writeFileSync(packageJsonPath, originalPackageJson)
}
