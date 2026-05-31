import { registryItemSchemaUrl, schemaVersion, VARIANTS, DEFAULT_VARIANT } from '../schema'

import type { NonDefaultVariant } from '../schema'
import type { RegistrySource } from '../ui/_template'

interface DefineRegistryLibOptions {
  dependencies?: string[]
  filePath: string
  name: string
  sourcePath: string
}

// Lib items are primitive-agnostic helpers (no recipes, no Panda codegen). The
// same source is emitted at every variant segment so `registryDependencies`
// resolve regardless of the consumer's `primitives` setting — the CLI applies a
// variant segment when resolving manifest URLs and cannot know an item is a lib
// until after it fetches it.
const allNonDefaultVariantSources = (
  sourcePath: string,
): Partial<Record<NonDefaultVariant, string>> => {
  const sources: Partial<Record<NonDefaultVariant, string>> = {}
  for (const variant of VARIANTS) {
    if (variant === DEFAULT_VARIANT) continue
    sources[variant as NonDefaultVariant] = sourcePath
  }
  return sources
}

export const defineRegistryLib = (options: DefineRegistryLibOptions): RegistrySource => ({
  $schema: registryItemSchemaUrl,
  dependencies: options.dependencies ?? [],
  files: [
    {
      path: options.filePath,
      sourcePath: options.sourcePath,
      type: 'registry:lib',
    },
  ],
  name: options.name,
  registryDependencies: [],
  stalk: {
    importAliases: {
      styledSystem: 'styled-system',
    },
    packageDependencies: {
      preset: '@stalk-ui/preset',
    },
    // Pure React helpers: nothing for Panda to generate.
    pandaCodegen: false,
    preset: {
      recipes: [],
      semanticTokens: {},
    },
    schemaVersion,
  },
  type: 'registry:lib',
  variantSources: allNonDefaultVariantSources(options.sourcePath),
})
