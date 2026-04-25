import { join } from 'node:path'

import { Project, SyntaxKind } from 'ts-morph'

import { CliError } from './errors'
import { pathExists, readTextIfExists, writeText } from './fs'

import type { GlobalOptions } from './types'

interface PresetOptions {
  accentColor?: string | undefined
  additionalThemes?: string[]
  borderRadius?: string | undefined
  grayColor?: string | undefined
}

const configCandidates = [
  'panda.config.ts',
  'panda.config.mts',
  'panda.config.js',
  'panda.config.mjs',
]

const createPresetSource = (options: PresetOptions) => {
  const entries = [
    ['accentColor', options.accentColor ?? 'blue'],
    ['grayColor', options.grayColor ?? 'neutral'],
    ['borderRadius', options.borderRadius ?? 'md'],
  ] as const
  const themeSource =
    options.additionalThemes === undefined || options.additionalThemes.length === 0
      ? ''
      : `,\n      additionalThemes: ${JSON.stringify(options.additionalThemes)}`

  return `createPreset({\n      ${entries
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join(',\n      ')}${themeSource}\n    })`
}

export const findPandaConfigPath = async (root: string, override?: string) => {
  if (override !== undefined) {
    return join(root, override)
  }

  for (const candidate of configCandidates) {
    const path = join(root, candidate)

    if (await pathExists(path)) {
      return path
    }
  }

  return join(root, 'panda.config.ts')
}

const createFreshPandaConfig = (
  options: PresetOptions,
) => `import { defineConfig } from '@pandacss/dev'
import { createPreset } from '@stalk-ui/preset'

export default defineConfig({
  presets: [
    ${createPresetSource(options)},
  ],
  include: ['./src/**/*.{ts,tsx,js,jsx}'],
  outdir: 'styled-system',
})
`

export const patchPandaConfig = async (
  root: string,
  options: PresetOptions,
  globalOptions: GlobalOptions,
) => {
  const configPath = await findPandaConfigPath(root, globalOptions.config)
  const existingSource = await readTextIfExists(configPath)

  if (existingSource === undefined) {
    const source = createFreshPandaConfig(options)

    if (globalOptions.dryRun === true) {
      console.log(`[dry-run] write ${configPath}`)
      return
    }

    await writeText(configPath, source)
    return
  }

  const project = new Project({ useInMemoryFileSystem: true })
  const sourceFile = project.createSourceFile(configPath, existingSource, { overwrite: true })
  const diagnostics = sourceFile.getPreEmitDiagnostics()

  if (diagnostics.length > 0) {
    throw new CliError(`Could not parse ${configPath}. Fix the TypeScript syntax and try again.`)
  }

  const hasCreatePresetImport = sourceFile
    .getImportDeclarations()
    .some((declaration) => declaration.getModuleSpecifierValue() === '@stalk-ui/preset')

  if (!hasCreatePresetImport) {
    sourceFile.insertImportDeclaration(0, {
      moduleSpecifier: '@stalk-ui/preset',
      namedImports: ['createPreset'],
    })
  }

  const callExpression = sourceFile
    .getDescendantsOfKind(SyntaxKind.CallExpression)
    .find((call) => call.getExpression().getText() === 'defineConfig')
  const configObject = callExpression?.getArguments()[0]?.asKind(SyntaxKind.ObjectLiteralExpression)

  if (configObject === undefined) {
    throw new CliError(`Could not find defineConfig({ ... }) in ${configPath}.`)
  }

  const presetSource = createPresetSource(options)
  const presetsProperty = configObject.getProperty('presets')?.asKind(SyntaxKind.PropertyAssignment)
  const presetsArray = presetsProperty?.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression)

  if (presetsArray === undefined) {
    configObject.addPropertyAssignment({
      name: 'presets',
      initializer: `[\n    ${presetSource},\n  ]`,
    })
  } else {
    const existingPreset = presetsArray
      .getElements()
      .find(
        (element) =>
          element.asKind(SyntaxKind.CallExpression)?.getExpression().getText() === 'createPreset',
      )

    if (existingPreset === undefined) {
      presetsArray.addElement(presetSource)
    } else {
      existingPreset.replaceWithText(presetSource)
    }
  }

  if (globalOptions.dryRun === true) {
    console.log(`[dry-run] update ${configPath}`)
    return
  }

  await writeText(configPath, sourceFile.getFullText())
}
