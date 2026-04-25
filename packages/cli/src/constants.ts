export const configSchemaUrl = 'https://stalk-ui.com/schema/v1/config.json'
export const defaultRegistryTemplate = 'https://stalk-ui.com/r/{name}.json'
export const supportedSchemaVersion = '1.0'

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
