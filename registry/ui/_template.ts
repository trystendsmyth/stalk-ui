import { registryItemSchemaUrl, schemaVersion, type RegistryItem } from '../schema'

interface DefineRegistryItemOptions {
  dependencies: string[]
  filePath: string
  i18n?: boolean
  name: string
  recipes?: string[]
  registryDependencies?: string[]
  semanticTokens?: Record<string, unknown>
  sourcePath: string
}

export const defineRegistryItem = (options: DefineRegistryItemOptions): RegistryItem => {
  const packageDependencies: RegistryItem['stalk']['packageDependencies'] = options.i18n
    ? { i18n: '@stalk-ui/i18n', preset: '@stalk-ui/preset' }
    : { preset: '@stalk-ui/preset' }

  return {
    $schema: registryItemSchemaUrl,
    dependencies: options.dependencies,
    files: [
      {
        path: options.filePath,
        sourcePath: options.sourcePath,
        type: 'registry:ui',
      },
    ],
    name: options.name,
    registryDependencies: options.registryDependencies ?? [],
    stalk: {
      importAliases: {
        styledSystem: 'styled-system',
      },
      packageDependencies,
      pandaCodegen: true,
      preset: {
        recipes: options.recipes ?? [],
        semanticTokens: options.semanticTokens ?? {},
      },
      schemaVersion,
    },
    type: 'registry:ui',
  }
}
