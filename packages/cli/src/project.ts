import { basename, dirname, join, resolve } from 'node:path'

import { select } from '@clack/prompts'

import { defaultConfig } from './constants'
import { assertNotCancelled, CliError } from './errors'
import { pathExists, readJsonIfExists, writeJson } from './fs'

import type { GlobalOptions, PackageManager, StalkConfig } from './types'

interface PackageJson {
  name?: string
  packageManager?: string
  workspaces?: unknown
}

export interface ProjectContext {
  config: StalkConfig
  configPath: string
  packageJson: PackageJson | undefined
  packageJsonPath: string
  packageManager: PackageManager
  root: string
}

const lockfilePackageManagers = [
  ['pnpm-lock.yaml', 'pnpm'],
  ['yarn.lock', 'yarn'],
  ['bun.lockb', 'bun'],
  ['package-lock.json', 'npm'],
] as const

const packageManagers = ['pnpm', 'yarn', 'npm', 'bun'] as const

const findUp = async (start: string, predicate: (directory: string) => Promise<boolean>) => {
  let current = resolve(start)

  for (;;) {
    if (await predicate(current)) {
      return current
    }

    const parent = dirname(current)

    if (parent === current) {
      return undefined
    }

    current = parent
  }
}

const hasProjectMarker = async (directory: string) =>
  (await pathExists(join(directory, 'package.json'))) ||
  (await pathExists(join(directory, 'pnpm-workspace.yaml'))) ||
  (await pathExists(join(directory, 'turbo.json')))

const detectPackageManager = async (
  root: string,
  packageJson: PackageJson | undefined,
  config: StalkConfig | undefined,
): Promise<PackageManager | undefined> => {
  if (config?.packageManager !== undefined) {
    return config.packageManager
  }

  if (packageJson?.packageManager !== undefined) {
    const [name] = packageJson.packageManager.split('@')

    if (packageManagers.includes(name as PackageManager)) {
      return name as PackageManager
    }
  }

  for (const [lockfile, packageManager] of lockfilePackageManagers) {
    if (await pathExists(join(root, lockfile))) {
      return packageManager
    }
  }

  return undefined
}

const promptPackageManager = async (): Promise<PackageManager> => {
  const value = await select({
    message: 'Which package manager should Stalk UI use?',
    options: packageManagers.map((packageManager) => ({
      label: packageManager,
      value: packageManager,
    })),
  })
  assertNotCancelled(value)
  return value as PackageManager
}

export const resolveProject = async (options: GlobalOptions): Promise<ProjectContext> => {
  const root = await findUp(process.cwd(), hasProjectMarker)

  if (root === undefined) {
    throw new CliError('Could not find a project root. Run this command inside a package.')
  }

  if (options.workspace !== undefined) {
    throw new CliError('--workspace is reserved for monorepo selection and is not implemented yet.')
  }

  const packageJsonPath = join(root, 'package.json')
  const packageJson = await readJsonIfExists<PackageJson>(packageJsonPath)
  const configPath = join(root, 'stalk.config.json')
  const existingConfig = await readJsonIfExists<StalkConfig>(configPath)
  const packageManager =
    (await detectPackageManager(root, packageJson, existingConfig)) ??
    (options.dryRun === true ? 'pnpm' : await promptPackageManager())
  const config = {
    ...defaultConfig,
    ...existingConfig,
    packageManager,
  }

  return {
    config,
    configPath,
    packageJson,
    packageJsonPath,
    packageManager,
    root,
  }
}

export const writeProjectConfig = async (context: ProjectContext, config: StalkConfig) => {
  await writeJson(context.configPath, config)
}

export const describeProject = (context: ProjectContext) =>
  context.packageJson?.name ?? basename(context.root)
