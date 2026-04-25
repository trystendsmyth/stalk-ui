import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

interface PackageJson {
  exports: Record<string, unknown>
}

const packageRoot = join(import.meta.dirname, '../packages/i18n')
const packageJsonPath = join(packageRoot, 'package.json')
const localesDirectory = join(packageRoot, 'src/locales')

const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as PackageJson

const locales = readdirSync(localesDirectory)
  .filter((file) => file.endsWith('.ts') && !file.endsWith('.test.ts') && !file.includes('.d.ts'))
  .map((file) => file.replace('.ts', ''))
  .sort()

const explicitLocaleExports = Object.fromEntries(
  locales.map((locale) => [
    `./locales/${locale}`,
    {
      types: `./dist/locales/${locale}.d.ts`,
      import: `./dist/locales/${locale}.js`,
      require: `./dist/locales/${locale}.cjs`,
    },
  ]),
)

packageJson.exports = {
  '.': packageJson.exports['.'],
  ...explicitLocaleExports,
  './locales/*': packageJson.exports['./locales/*'],
  './package.json': './package.json',
}

writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`)

console.log(`Generated ${String(locales.length)} explicit locale exports: ${locales.join(', ')}`)
