import type { Variant } from './types'

export const configSchemaUrl = 'https://stalk-ui.com/schema/v1/config.json'
export const defaultRegistryTemplate = 'https://stalk-ui.com/r/{name}.json'
export const supportedSchemaVersion = '1.0'

export const VARIANTS = ['radix', 'base'] as const satisfies readonly Variant[]
export const DEFAULT_VARIANT: Variant = 'radix'

export const defaultConfig = {
  $schema: configSchemaUrl,
  preset: '@stalk-ui/preset',
  components: './src/components/ui',
  utils: './src/lib/utils',
  styledSystem: 'styled-system',
  registries: {
    '@stalk-ui': defaultRegistryTemplate,
  },
} as const
