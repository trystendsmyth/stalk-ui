import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import { note } from '@clack/prompts'

import { defaultConfig } from './constants'
import { CliError } from './errors'
import { backupFile, pathExists, readTextIfExists, toProjectPath, writeText } from './fs'
import { fetchManifest, resolveManifestUrl } from './manifest'
import { installPackages, runPandaCodegen } from './package-manager'
import { patchPandaConfig } from './panda-config'
import { describeProject, resolveProject, writeProjectConfig } from './project'

import type { GlobalOptions, RegistryItem, StalkConfig } from './types'

interface InfoOptions extends GlobalOptions {
  json?: boolean
}

interface InitOptions extends GlobalOptions {
  accentColor?: string
  borderRadius?: string
  grayColor?: string
}

const backupRoot = (root: string) =>
  join(root, '.stalk-ui-backup', new Date().toISOString().replaceAll(':', '-'))

const packageDependenciesForManifest = (manifest: RegistryItem) => [
  ...new Set([
    ...manifest.dependencies,
    manifest.stalk.packageDependencies.preset,
    ...(manifest.stalk.packageDependencies.i18n === undefined
      ? []
      : [manifest.stalk.packageDependencies.i18n]),
  ]),
]

const ensureGitignoreEntry = async (root: string, options: GlobalOptions) => {
  const path = join(root, '.gitignore')
  const existing = (await readTextIfExists(path)) ?? ''

  if (existing.includes('.stalk-ui-backup/')) {
    return
  }

  if (options.dryRun === true) {
    console.log(`[dry-run] add .stalk-ui-backup/ to ${path}`)
    return
  }

  await writeText(path, `${existing.trimEnd()}\n.stalk-ui-backup/\n`)
}

const writeFileWithBackup = async (
  root: string,
  backupDirectory: string,
  path: string,
  content: string,
  options: GlobalOptions,
) => {
  if (options.dryRun === true) {
    console.log(`[dry-run] write ${path}`)
    return
  }

  await backupFile(root, backupDirectory, path)
  await writeText(path, content)
}

export const initCommand = async (options: InitOptions) => {
  const context = await resolveProject(options)
  const nextConfig: StalkConfig = {
    ...defaultConfig,
    ...context.config,
    packageManager: context.packageManager,
  }
  const backupDirectory = backupRoot(context.root)

  if ((await pathExists(context.configPath)) && options.force !== true) {
    note(`Stalk UI is already initialized in ${describeProject(context)}.`, 'No changes needed')
    return
  }

  if (options.dryRun !== true) {
    await mkdir(backupDirectory, { recursive: true })
    await backupFile(context.root, backupDirectory, context.configPath)
  }

  await ensureGitignoreEntry(context.root, options)
  await patchPandaConfig(context.root, options)

  if (options.dryRun === true) {
    console.log(`[dry-run] write ${context.configPath}`)
  } else {
    await writeProjectConfig(context, nextConfig)
  }

  await installPackages(
    context.packageManager,
    ['@pandacss/dev', '@stalk-ui/preset', '@stalk-ui/i18n'],
    options,
  )
  await runPandaCodegen(context.packageManager, options)
  note(`Configured Stalk UI in ${describeProject(context)}.`, 'Initialized')
}

export const addCommand = async (name: string, options: GlobalOptions) => {
  const context = await resolveProject(options)
  const manifestUrl = resolveManifestUrl(name, context.config, options.registry)
  const manifest = await fetchManifest(manifestUrl, options.verbose)
  const backupDirectory = backupRoot(context.root)

  if (options.dryRun !== true) {
    await mkdir(backupDirectory, { recursive: true })
  }

  for (const file of manifest.files) {
    const targetPath = toProjectPath(context.root, file.path)
    const existing = await readTextIfExists(targetPath)

    if (existing === file.content) {
      continue
    }

    if (existing !== undefined && options.force !== true && options.dryRun !== true) {
      throw new CliError(`${file.path} already exists. Re-run with --force to overwrite.`)
    }

    await writeFileWithBackup(context.root, backupDirectory, targetPath, file.content, options)
  }

  await installPackages(context.packageManager, packageDependenciesForManifest(manifest), options)
  await runPandaCodegen(context.packageManager, options)
  note(`Installed ${manifest.name} from ${manifestUrl}.`, 'Added component')
}

const themes = {
  neutral: {
    description: 'applied automatically',
  },
  rainbow: {
    description: 'apply via data-panda-theme="rainbow"',
  },
  monochrome: {
    description: 'apply via data-panda-theme="monochrome"',
  },
} as const

export const themeCommand = (name?: string) => {
  if (name === undefined) {
    console.log(`Stalk UI ships with three themes:

  neutral (default) - ${themes.neutral.description}
  rainbow           - ${themes.rainbow.description}
  monochrome        - ${themes.monochrome.description}

To use a theme, add the data-panda-theme attribute to the appropriate
element in your HTML or layout:

  <html data-panda-theme="rainbow">  <!-- whole app -->
  <div data-panda-theme="rainbow">   <!-- a subtree -->

For runtime switching between themes, see:
https://stalk-ui.com/en/docs/getting-started/theming`)
    return
  }

  if (name in themes) {
    console.log(`Theme: ${name}

Apply via:
  <html data-panda-theme="${name}">      // App-wide
  <div data-panda-theme="${name}">       // Subtree

Runtime switching: https://stalk-ui.com/en/docs/getting-started/theming`)
    return
  }

  console.log(`Unknown theme: ${name}

Available themes: ${Object.keys(themes).join(', ')}

To add custom themes, see:
https://stalk-ui.com/en/docs/getting-started/custom-themes`)
}

export const diffCommand = async (name: string, options: GlobalOptions) => {
  const context = await resolveProject(options)
  const manifestUrl = resolveManifestUrl(name, context.config, options.registry)
  const manifest = await fetchManifest(manifestUrl, options.verbose)
  let differences = 0

  for (const file of manifest.files) {
    const targetPath = toProjectPath(context.root, file.path)
    const existing = await readTextIfExists(targetPath)

    if (existing !== file.content) {
      differences += 1
      console.log(`${file.path}: ${existing === undefined ? 'missing' : 'differs'}`)
    }
  }

  if (differences === 0) {
    console.log(`${manifest.name}: no differences`)
  }
}

export const upgradeCommand = async (options: GlobalOptions) => {
  const context = await resolveProject(options)
  await installPackages(
    context.packageManager,
    ['@stalk-ui/preset@latest', '@stalk-ui/i18n@latest'],
    options,
  )
  await runPandaCodegen(context.packageManager, options)
  note('Updated shared Stalk UI runtime packages.', 'Upgrade complete')
}

const listInstalledComponents = async (root: string, components: string): Promise<string[]> => {
  const directory = toProjectPath(root, components)
  if (!(await pathExists(directory))) {
    return []
  }
  const entries = await readdir(directory)
  return entries
    .filter((entry) => entry.endsWith('.tsx') || entry.endsWith('.ts'))
    .map((entry) => entry.replace(/\.(tsx|ts)$/, ''))
    .sort()
}

export const infoCommand = async (options: InfoOptions) => {
  const context = await resolveProject(options)
  const installed = await listInstalledComponents(context.root, context.config.components)
  const payload = {
    name: describeProject(context),
    root: context.root,
    packageManager: context.packageManager,
    config: context.config,
    installed,
  }

  if (options.json === true) {
    console.log(JSON.stringify(payload, null, 2))
    return
  }

  console.log(`Project:        ${payload.name}`)
  console.log(`Root:           ${payload.root}`)
  console.log(`Package mgr:    ${payload.packageManager}`)
  console.log(`Components dir: ${payload.config.components}`)
  console.log(`Styled-system:  ${payload.config.styledSystem}`)
  console.log(`Variant:        ${payload.config.primitives ?? 'radix'}`)
  console.log(`Registries:`)
  for (const [name, template] of Object.entries(payload.config.registries)) {
    console.log(`  ${name} → ${template}`)
  }
  console.log(`Installed (${String(installed.length)}):${installed.length === 0 ? ' none' : ''}`)
  for (const component of installed) {
    console.log(`  - ${component}`)
  }
}

export const readCliVersion = async () => {
  const packageJson = JSON.parse(
    await readFile(new URL('../package.json', import.meta.url), 'utf8'),
  ) as {
    version?: string
  }
  return packageJson.version ?? '0.0.0'
}

export const writeExecutableSmokeFile = async (path: string) => {
  await writeFile(path, 'ok\n')
}
