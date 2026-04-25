import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

const rootDirectory = process.cwd()
const workspaceRoots = ['apps', 'packages'] as const
const requiredRootScripts = ['build', 'typecheck', 'lint', 'format', 'test', 'clean'] as const
const requiredWorkspaceScripts = ['build', 'typecheck', 'test'] as const
const publishedPackages = new Set(['@stalk-ui/cli', '@stalk-ui/preset', '@stalk-ui/i18n'])

interface PackageJson {
  name?: string
  private?: boolean
  scripts?: Record<string, string>
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const isStringRecord = (value: unknown): value is Record<string, string> =>
  isRecord(value) && Object.values(value).every((item) => typeof item === 'string')

const readPackageJson = async (path: string): Promise<PackageJson> => {
  const raw = await readFile(path, 'utf8')
  const value: unknown = JSON.parse(raw)

  if (!isRecord(value)) {
    throw new Error(`${path} must contain a JSON object`)
  }

  const packageJson: PackageJson = {}

  if (typeof value.name === 'string') {
    packageJson.name = value.name
  }

  if (typeof value.private === 'boolean') {
    packageJson.private = value.private
  }

  if (value.scripts !== undefined) {
    if (!isStringRecord(value.scripts)) {
      throw new Error(`${path} scripts must be a string map`)
    }

    packageJson.scripts = value.scripts
  }

  return packageJson
}

const hasScript = (packageJson: PackageJson, script: string): boolean =>
  typeof packageJson.scripts?.[script] === 'string' && packageJson.scripts[script].length > 0

const checkScripts = (
  label: string,
  packageJson: PackageJson,
  requiredScripts: readonly string[],
): string[] =>
  requiredScripts
    .filter((script) => !hasScript(packageJson, script))
    .map((script) => `${label} is missing required script "${script}"`)

const workspacePackagePaths = async (): Promise<string[]> => {
  const packagePaths: string[] = []

  for (const workspaceRoot of workspaceRoots) {
    const rootPath = join(rootDirectory, workspaceRoot)
    const entries = await readdir(rootPath, { withFileTypes: true })

    for (const entry of entries) {
      if (entry.isDirectory()) {
        packagePaths.push(join(rootPath, entry.name, 'package.json'))
      }
    }
  }

  return packagePaths.sort()
}

const errors: string[] = []
const rootPackage = await readPackageJson(join(rootDirectory, 'package.json'))

errors.push(...checkScripts('root package.json', rootPackage, requiredRootScripts))

for (const packagePath of await workspacePackagePaths()) {
  const packageJson = await readPackageJson(packagePath)
  const label = packageJson.name ?? packagePath

  errors.push(...checkScripts(label, packageJson, requiredWorkspaceScripts))

  if (publishedPackages.has(label) && packageJson.private === true) {
    errors.push(`${label} is a published package and must not be marked private`)
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'))
  process.exit(1)
}
