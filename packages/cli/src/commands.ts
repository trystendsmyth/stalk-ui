import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import { note } from '@clack/prompts'

import { defaultConfig } from './constants'
import { CliError } from './errors'
import { backupFile, pathExists, readTextIfExists, toProjectPath, writeText } from './fs'
import {
  createImportRewriter,
  resolveStyledSystemTarget,
  styledSystemAliasFor,
} from './import-rewrite'
import { readBaseSnapshot, readLock, recordComponent, writeLock } from './lock'
import { fetchManifest, resolveManifestUrl } from './manifest'
import { mergeThreeWay } from './merge'
import { installPackages, runPandaCodegen } from './package-manager'
import { detectPandaImportMap, patchPandaConfig } from './panda-config'
import { describeProject, resolveProject, writeProjectConfig } from './project'

import type { GlobalOptions, RegistryItem, StalkConfig } from './types'

interface InfoOptions extends GlobalOptions {
  json?: boolean
}

interface ResolvedManifest {
  manifest: RegistryItem
  url: string
}

// Resolve a component and the transitive closure of its `registryDependencies`
// (sibling components and shared lib helpers), de-duplicated and ordered
// dependencies-first so a helper is written before the component that imports
// it. A `{name}`-templated registry override propagates to dependencies so a
// custom registry resolves its own closure; a fixed-URL override targets a
// single item, so dependencies fall back to the configured registries.
const collectManifests = async (
  name: string,
  context: { config: StalkConfig },
  options: GlobalOptions,
  seen: Set<string>,
  registryOverride?: string,
): Promise<ResolvedManifest[]> => {
  if (seen.has(name)) {
    return []
  }
  seen.add(name)

  const url = resolveManifestUrl(name, context.config, registryOverride)
  const manifest = await fetchManifest(url, options.verbose)

  const dependencyOverride =
    registryOverride?.includes('{name}') === true ? registryOverride : undefined

  const resolved: ResolvedManifest[] = []
  for (const dependency of manifest.registryDependencies) {
    resolved.push(
      ...(await collectManifests(dependency, context, options, seen, dependencyOverride)),
    )
  }
  resolved.push({ manifest, url })
  return resolved
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

  // A consumer whose panda config aliases the outdir (Panda `importMap`) gets
  // that alias recorded as `styledSystem`, so installs rewrite imports to it.
  if (nextConfig.styledSystem === defaultConfig.styledSystem) {
    const importMap = await detectPandaImportMap(context.root, options)
    const alias = importMap === undefined ? undefined : styledSystemAliasFor(importMap)

    if (alias !== undefined) {
      nextConfig.styledSystem = alias
    }
  }

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
  const resolved = await collectManifests(name, context, options, new Set(), options.registry)
  const styledSystemTarget = await resolveStyledSystemTarget(context.root, context.config, options)
  const backupDirectory = backupRoot(context.root)

  if (options.dryRun !== true) {
    await mkdir(backupDirectory, { recursive: true })
  }

  // Write every file across the dependency closure first, de-duplicating shared
  // files (e.g. a lib helper pulled in by multiple components) by target path.
  const writtenPaths = new Set<string>()
  const lock = await readLock(context.root)
  for (const { manifest, url } of resolved) {
    const rewriteImports = createImportRewriter(
      manifest.stalk.importAliases.styledSystem,
      styledSystemTarget,
    )
    const installedFiles: { content: string; path: string }[] = []
    for (const file of manifest.files) {
      const content = rewriteImports(file.content)
      installedFiles.push({ content, path: file.path })

      if (writtenPaths.has(file.path)) {
        continue
      }
      writtenPaths.add(file.path)

      const targetPath = toProjectPath(context.root, file.path)
      const existing = await readTextIfExists(targetPath)

      if (existing === content) {
        continue
      }

      if (existing !== undefined && options.force !== true && options.dryRun !== true) {
        throw new CliError(`${file.path} already exists. Re-run with --force to overwrite.`)
      }

      await writeFileWithBackup(context.root, backupDirectory, targetPath, content, options)
    }

    if (options.dryRun !== true) {
      await recordComponent(context.root, lock, manifest.name, url, installedFiles)
    }
  }

  if (options.dryRun !== true) {
    await writeLock(context.root, lock)
  }

  const packageDependencies = [
    ...new Set(resolved.flatMap(({ manifest }) => packageDependenciesForManifest(manifest))),
  ]
  await installPackages(context.packageManager, packageDependencies, options)
  await runPandaCodegen(context.packageManager, options)

  const installed = resolved.map(({ manifest }) => manifest.name)
  const requested = resolved.at(-1)?.manifest.name ?? name
  const dependencyNames = installed.filter((installedName) => installedName !== requested)
  const summary =
    dependencyNames.length > 0
      ? `Installed ${requested} (with ${dependencyNames.join(', ')}).`
      : `Installed ${requested}.`
  note(summary, 'Added component')
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
  const resolved = await collectManifests(name, context, options, new Set(), options.registry)
  const styledSystemTarget = await resolveStyledSystemTarget(context.root, context.config, options)
  const requested = resolved.at(-1)?.manifest.name ?? name
  let differences = 0

  const checkedPaths = new Set<string>()
  for (const { manifest } of resolved) {
    const rewriteImports = createImportRewriter(
      manifest.stalk.importAliases.styledSystem,
      styledSystemTarget,
    )
    for (const file of manifest.files) {
      if (checkedPaths.has(file.path)) {
        continue
      }
      checkedPaths.add(file.path)

      const targetPath = toProjectPath(context.root, file.path)
      const existing = await readTextIfExists(targetPath)

      if (existing !== rewriteImports(file.content)) {
        differences += 1
        console.log(`${file.path}: ${existing === undefined ? 'missing' : 'differs'}`)
      }
    }
  }

  if (differences === 0) {
    console.log(`${requested}: no differences`)
  }
}

const runtimePackages = ['@stalk-ui/preset', '@stalk-ui/i18n']

const assertTracked = (names: string[], tracked: string[]) => {
  for (const name of names) {
    if (!tracked.includes(name)) {
      throw new CliError(
        tracked.length === 0
          ? `No tracked components — the lock is recorded by 'add'. Re-run 'stalk-ui add ${name} --force' to begin tracking.`
          : `'${name}' is not tracked in .stalk-ui/lock.json. Tracked: ${tracked.join(', ')}.`,
      )
    }
  }
}

export const upgradeCommand = async (names: string[], options: GlobalOptions) => {
  const context = await resolveProject(options)
  const lock = await readLock(context.root)
  const tracked = Object.keys(lock.components)
  assertTracked(names, tracked)
  const targets = names.length > 0 ? names : tracked
  const conflicts: string[] = []

  if (targets.length > 0) {
    const styledSystemTarget = await resolveStyledSystemTarget(
      context.root,
      context.config,
      options,
    )
    const backupDirectory = backupRoot(context.root)

    if (options.dryRun !== true) {
      await mkdir(backupDirectory, { recursive: true })
    }

    const processedPaths = new Set<string>()
    const newPackageDependencies = new Set<string>()

    for (const target of targets) {
      const resolved = await collectManifests(target, context, options, new Set(), options.registry)

      for (const { manifest, url } of resolved) {
        const rewriteImports = createImportRewriter(
          manifest.stalk.importAliases.styledSystem,
          styledSystemTarget,
        )
        const installedFiles: { content: string; path: string }[] = []

        for (const file of manifest.files) {
          const content = rewriteImports(file.content)
          installedFiles.push({ content, path: file.path })

          if (processedPaths.has(file.path)) {
            continue
          }
          processedPaths.add(file.path)

          const targetPath = toProjectPath(context.root, file.path)
          const local = await readTextIfExists(targetPath)
          const base = await readBaseSnapshot(context.root, file.path)

          if (local === content) {
            console.log(`${file.path}: up to date`)
            continue
          }

          if (local === undefined) {
            console.log(`${file.path}: deleted locally — skipped`)
            continue
          }

          if (base === undefined) {
            // Installed before upgrade tracking existed, so there is no merge
            // base. Overwrite only under --force; otherwise leave it alone.
            if (options.force === true) {
              await writeFileWithBackup(context.root, backupDirectory, targetPath, content, options)
              console.log(`${file.path}: overwritten (--force; no base snapshot)`)
            } else {
              console.log(
                `${file.path}: no base snapshot — skipped (re-run with --force to overwrite local edits)`,
              )
            }
            continue
          }

          if (base === content) {
            console.log(`${file.path}: local edits kept (registry unchanged)`)
            continue
          }

          if (local === base) {
            await writeFileWithBackup(context.root, backupDirectory, targetPath, content, options)
            console.log(`${file.path}: updated`)
            continue
          }

          const merged = mergeThreeWay(base, local, content)
          await writeFileWithBackup(
            context.root,
            backupDirectory,
            targetPath,
            merged.content,
            options,
          )

          if (merged.conflicted) {
            conflicts.push(file.path)
            console.log(`${file.path}: CONFLICT — resolve the markers, then commit`)
          } else {
            console.log(`${file.path}: merged local edits with registry changes`)
          }
        }

        for (const dependency of packageDependenciesForManifest(manifest)) {
          if (!runtimePackages.includes(dependency)) {
            newPackageDependencies.add(dependency)
          }
        }

        if (options.dryRun !== true) {
          await recordComponent(context.root, lock, manifest.name, url, installedFiles)
        }
      }
    }

    if (options.dryRun !== true) {
      await writeLock(context.root, lock)
    }

    await installPackages(context.packageManager, [...newPackageDependencies], options)
  }

  await installPackages(
    context.packageManager,
    runtimePackages.map((name) => `${name}@latest`),
    options,
  )
  await runPandaCodegen(context.packageManager, options)

  if (conflicts.length > 0) {
    note(
      `Merged with ${String(conflicts.length)} conflict${conflicts.length === 1 ? '' : 's'}:\n${conflicts
        .map((path) => `  ${path}`)
        .join('\n')}\nResolve the conflict markers, then commit. Backups are in .stalk-ui-backup/.`,
      'Upgrade needs attention',
    )
  } else if (targets.length > 0) {
    note('Upgraded tracked components and shared runtime packages.', 'Upgrade complete')
  } else {
    note('Updated shared Stalk UI runtime packages.', 'Upgrade complete')
  }
}

interface DriftOptions extends GlobalOptions {
  json?: boolean
}

interface DriftFileReport {
  local: 'clean' | 'deleted' | 'edited' | 'untracked'
  path: string
  registry: 'changed' | 'current' | 'untracked'
}

export const driftCommand = async (names: string[], options: DriftOptions) => {
  const context = await resolveProject(options)
  const lock = await readLock(context.root)
  const tracked = Object.keys(lock.components)
  assertTracked(names, tracked)
  const targets = names.length > 0 ? names : tracked
  const styledSystemTarget = await resolveStyledSystemTarget(context.root, context.config, options)

  const files: DriftFileReport[] = []
  const seenPaths = new Set<string>()

  for (const target of targets) {
    const resolved = await collectManifests(target, context, options, new Set(), options.registry)

    for (const { manifest } of resolved) {
      const rewriteImports = createImportRewriter(
        manifest.stalk.importAliases.styledSystem,
        styledSystemTarget,
      )

      for (const file of manifest.files) {
        if (seenPaths.has(file.path)) {
          continue
        }
        seenPaths.add(file.path)

        const remote = rewriteImports(file.content)
        const local = await readTextIfExists(toProjectPath(context.root, file.path))
        const base = await readBaseSnapshot(context.root, file.path)

        files.push({
          local:
            local === undefined
              ? 'deleted'
              : base === undefined
                ? 'untracked'
                : local === base
                  ? 'clean'
                  : 'edited',
          path: file.path,
          registry: base === undefined ? 'untracked' : base === remote ? 'current' : 'changed',
        })
      }
    }
  }

  const upstreamDrift = files.some((file) => file.registry === 'changed')

  if (options.json === true) {
    console.log(JSON.stringify({ files, upstreamDrift }, null, 2))
  } else if (files.length === 0) {
    console.log('No tracked components. Run `stalk-ui add` to begin tracking.')
  } else {
    for (const file of files) {
      console.log(`${file.path}: registry ${file.registry}, local ${file.local}`)
    }
    console.log(
      upstreamDrift
        ? 'Upstream drift detected — run `stalk-ui upgrade` to merge registry changes.'
        : 'All tracked components match the registry base.',
    )
  }

  if (upstreamDrift) {
    process.exitCode = 1
  }
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
