import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { rimrafSync } from 'rimraf'

interface PackageJson {
  bin?: unknown
  exports?: unknown
  main?: unknown
  name?: unknown
  private?: unknown
  scripts?: {
    prepack?: unknown
  }
}

const run = (command: string, args: string[], cwd = process.cwd()) => {
  execFileSync(command, args, {
    cwd,
    stdio: 'inherit',
  })
}

const readPackageJson = (path: string): PackageJson =>
  JSON.parse(readFileSync(path, 'utf8')) as PackageJson

const packageDirectories = readdirSync('packages')
  .filter((packageDirectory) => {
    const packageJsonPath = join('packages', packageDirectory, 'package.json')

    if (!existsSync(packageJsonPath)) {
      return false
    }

    const packageJson = readPackageJson(packageJsonPath)

    return (
      packageJson.private !== true &&
      (packageJson.main !== undefined ||
        packageJson.exports !== undefined ||
        packageJson.bin !== undefined)
    )
  })
  .sort()

for (const packageDirectory of packageDirectories) {
  const packageJsonPath = join(process.cwd(), 'packages', packageDirectory, 'package.json')
  const packageJson = readPackageJson(packageJsonPath)
  const packageName = String(packageJson.name)

  console.log(`\nChecking ${packageName}`)

  run('pnpm', ['--filter', packageName, 'exec', 'attw', '--pack', '.'])
  run('pnpm', ['--filter', packageName, 'exec', 'publint'])

  if (typeof packageJson.scripts?.prepack !== 'string') {
    continue
  }

  const originalPackageJson = readFileSync(packageJsonPath, 'utf8')
  const packageRoot = join(process.cwd(), 'packages', packageDirectory)
  const installDirectory = mkdtempSync(join(tmpdir(), `stalk-${packageDirectory}-check-`))
  const packDirectory = mkdtempSync(join(tmpdir(), `stalk-${packageDirectory}-pack-`))

  try {
    run('pnpm', ['--filter', packageName, 'run', 'prepack'])
    run('pnpm', ['--filter', packageName, 'exec', 'attw', '--pack', '.'])
    run('pnpm', ['--filter', packageName, 'exec', 'publint'])
    run('pnpm', ['pack', '--pack-destination', packDirectory], packageRoot)

    const tarballs = readdirSync(packDirectory).filter((file) => file.endsWith('.tgz'))

    if (tarballs.length !== 1) {
      throw new Error(
        `Expected exactly one tarball in ${packDirectory}, found ${String(tarballs.length)}`,
      )
    }

    const tarball = tarballs[0]

    if (tarball === undefined) {
      throw new Error(`Expected a tarball in ${packDirectory}`)
    }

    run('pnpm', ['init'], installDirectory)
    run('pnpm', ['add', join(packDirectory, tarball)], installDirectory)

    if (packageName === '@stalk-ui/i18n') {
      run(
        'node',
        [
          '--input-type=module',
          '--eval',
          "await import('@stalk-ui/i18n'); await import('@stalk-ui/i18n/locales/en');",
        ],
        installDirectory,
      )
    }
  } finally {
    writeFileSync(packageJsonPath, originalPackageJson)
    rimrafSync(installDirectory)
    rimrafSync(packDirectory)
  }
}
