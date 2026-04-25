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
    name: 'checkbox',
    type: 'registry:ui',
    dependencies: ['@stalk-ui/preset'],
    registryDependencies: [],
    files: [
      {
        path: 'src/components/ui/checkbox.tsx',
        type: 'registry:ui',
        sourcePath: 'packages/components/src/checkbox.tsx',
      },
    ],
    stalk: {
      schemaVersion: '1.0',
      preset: {
        semanticTokens: {},
        recipes: ['checkbox'],
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
  {
    $schema: 'https://stalk-ui.com/schema/v1/registry-item.json',
    name: 'radio',
    type: 'registry:ui',
    dependencies: ['@stalk-ui/preset'],
    registryDependencies: [],
    files: [
      {
        path: 'src/components/ui/radio.tsx',
        type: 'registry:ui',
        sourcePath: 'packages/components/src/radio.tsx',
      },
    ],
    stalk: {
      schemaVersion: '1.0',
      preset: {
        semanticTokens: {},
        recipes: ['radio'],
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
    name: 'select',
    type: 'registry:ui',
    dependencies: ['@stalk-ui/preset'],
    registryDependencies: [],
    files: [
      {
        path: 'src/components/ui/select.tsx',
        type: 'registry:ui',
        sourcePath: 'packages/components/src/select.tsx',
      },
    ],
    stalk: {
      schemaVersion: '1.0',
      preset: {
        semanticTokens: {},
        recipes: ['select'],
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
    name: 'textarea',
    type: 'registry:ui',
    dependencies: ['@stalk-ui/preset'],
    registryDependencies: [],
    files: [
      {
        path: 'src/components/ui/textarea.tsx',
        type: 'registry:ui',
        sourcePath: 'packages/components/src/textarea.tsx',
      },
    ],
    stalk: {
      schemaVersion: '1.0',
      preset: {
        semanticTokens: {},
        recipes: ['textarea'],
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
