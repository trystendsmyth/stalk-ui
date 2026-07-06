import { join } from 'node:path'

import { Project, SyntaxKind } from 'ts-morph'

import { CliError } from './errors'
import { pathExists, readTextIfExists, writeText } from './fs'

import type { GlobalOptions } from './types'
import type { SourceFile } from 'ts-morph'

const configCandidates = [
  'panda.config.ts',
  'panda.config.mts',
  'panda.config.js',
  'panda.config.mjs',
]

const presetSource = `'@stalk-ui/preset'`
const legacyPresetFactoryName = ['create', 'Preset'].join('')

/** Panda `importMap` object form: one specifier per styled-system entrypoint. */
export interface PandaImportMapEntries {
  css: string
  jsx: string
  patterns: string
  recipes: string
}

export type PandaImportMap = string | PandaImportMapEntries

const importMapKeys = ['css', 'jsx', 'patterns', 'recipes'] as const

const findDefineConfigObject = (sourceFile: SourceFile) => {
  const callExpression = sourceFile
    .getDescendantsOfKind(SyntaxKind.CallExpression)
    .find((call) => call.getExpression().getText() === 'defineConfig')
  return callExpression?.getArguments()[0]?.asKind(SyntaxKind.ObjectLiteralExpression)
}

/**
 * Read the Panda `importMap` from the project's panda config, if declared with
 * literal values. Consumers that alias the Panda outdir (e.g. `@styled`) declare
 * it here, and registry file content must be rewritten to match on install.
 * Returns `undefined` for missing configs, unparsable syntax, or computed values.
 */
export const detectPandaImportMap = async (
  root: string,
  globalOptions: GlobalOptions,
): Promise<PandaImportMap | undefined> => {
  const configPath = await findPandaConfigPath(root, globalOptions.config)
  const source = await readTextIfExists(configPath)

  if (source === undefined) {
    return undefined
  }

  const project = new Project({ useInMemoryFileSystem: true })
  const sourceFile = project.createSourceFile(configPath, source, { overwrite: true })
  const configObject = findDefineConfigObject(sourceFile)
  const initializer = configObject
    ?.getProperty('importMap')
    ?.asKind(SyntaxKind.PropertyAssignment)
    ?.getInitializer()

  if (initializer === undefined) {
    return undefined
  }

  const literal = initializer.asKind(SyntaxKind.StringLiteral)

  if (literal !== undefined) {
    return literal.getLiteralValue()
  }

  const objectLiteral = initializer.asKind(SyntaxKind.ObjectLiteralExpression)

  if (objectLiteral === undefined) {
    return undefined
  }

  const entries: Partial<PandaImportMapEntries> = {}

  for (const key of importMapKeys) {
    const value = objectLiteral
      .getProperty(key)
      ?.asKind(SyntaxKind.PropertyAssignment)
      ?.getInitializerIfKind(SyntaxKind.StringLiteral)
      ?.getLiteralValue()

    if (value !== undefined) {
      entries[key] = value
    }
  }

  if (Object.keys(entries).length === 0) {
    return undefined
  }

  return {
    css: entries.css ?? 'styled-system/css',
    jsx: entries.jsx ?? 'styled-system/jsx',
    patterns: entries.patterns ?? 'styled-system/patterns',
    recipes: entries.recipes ?? 'styled-system/recipes',
  }
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

const createFreshPandaConfig = () => `import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  preflight: true,
  presets: [${presetSource}],
  include: ['./src/**/*.{ts,tsx,js,jsx}'],
  jsxFramework: 'react',
  outdir: 'styled-system',
})
`

export const patchPandaConfig = async (root: string, globalOptions: GlobalOptions) => {
  const configPath = await findPandaConfigPath(root, globalOptions.config)
  const existingSource = await readTextIfExists(configPath)

  if (existingSource === undefined) {
    const source = createFreshPandaConfig()

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

  sourceFile
    .getImportDeclarations()
    .filter((declaration) => declaration.getModuleSpecifierValue() === '@stalk-ui/preset')
    .forEach((declaration) => {
      declaration.remove()
    })

  const configObject = findDefineConfigObject(sourceFile)

  if (configObject === undefined) {
    throw new CliError(`Could not find defineConfig({ ... }) in ${configPath}.`)
  }

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
          element.getText() === presetSource ||
          element.asKind(SyntaxKind.CallExpression)?.getExpression().getText() ===
            legacyPresetFactoryName,
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
