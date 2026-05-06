import { registryItemSchemaUrl, schemaVersion } from '../schema'

import type { NonDefaultVariant, RegistryItem } from '../schema'

interface DefineRegistryItemOptions {
  dependencies: string[]
  filePath: string
  i18n?: boolean
  name: string
  recipes?: string[]
  registryDependencies?: string[]
  semanticTokens?: Record<string, unknown>
  // Source for the default variant. Required so every component has a canonical
  // manifest at `public/r/<name>.json`.
  sourcePath: string
  // Optional sources for non-default primitive backends. The build script emits
  // `public/r/<variant>/<name>.json` for each entry. Components without an entry
  // here are radix-only today; the variant slot is reserved.
  variantSources?: Partial<Record<NonDefaultVariant, string>>
}

// Internal-only shape: the on-disk JSON is per-variant and matches `RegistryItem`,
// but the in-memory declaration carries `variantSources` so the build script can
// fan out to multiple per-variant manifests. The extra field is stripped before
// zod parsing.
export interface RegistrySource extends RegistryItem {
  variantSources?: Partial<Record<NonDefaultVariant, string>>
}

export const defineRegistryItem = (options: DefineRegistryItemOptions): RegistrySource => {
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
    ...(options.variantSources === undefined ? {} : { variantSources: options.variantSources }),
  }
}
