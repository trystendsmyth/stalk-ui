import type { RegistryItem } from '../schema'

export const registryItems = [
  {
    $schema: 'https://stalk-ui.com/schema/v1/registry-item.json',
    name: 'button',
    type: 'registry:ui',
    dependencies: ['@stalk-ui/preset'],
    registryDependencies: [],
    files: [
      {
        path: 'src/components/ui/button.tsx',
        type: 'registry:ui',
        sourcePath: 'packages/components/src/button.tsx',
      },
    ],
    stalk: {
      schemaVersion: '1.0',
      preset: {
        semanticTokens: {},
        recipes: ['button'],
      },
      packageDependencies: {
        preset: '@stalk-ui/preset',
      },
      pandaCodegen: true,
      importAliases: {
        styledSystem: 'styled-system',
      },
    },
  },
  {
    $schema: 'https://stalk-ui.com/schema/v1/registry-item.json',
    name: 'input',
    type: 'registry:ui',
    dependencies: ['@stalk-ui/preset'],
    registryDependencies: [],
    files: [
      {
        path: 'src/components/ui/input.tsx',
        type: 'registry:ui',
        sourcePath: 'packages/components/src/input.tsx',
      },
    ],
    stalk: {
      schemaVersion: '1.0',
      preset: {
        semanticTokens: {},
        recipes: ['input'],
      },
      packageDependencies: {
        preset: '@stalk-ui/preset',
      },
      pandaCodegen: true,
      importAliases: {
        styledSystem: 'styled-system',
      },
    },
  },
] satisfies RegistryItem[]
