import type { RegistryItem } from '../schema'

export const registryItems = [
  {
    $schema: 'https://stalk-ui.com/schema/v1/registry-item.json',
    name: 'badge',
    type: 'registry:ui',
    dependencies: ['@stalk-ui/preset'],
    registryDependencies: [],
    files: [
      {
        path: 'src/components/ui/badge.tsx',
        type: 'registry:ui',
        sourcePath: 'packages/components/src/badge.tsx',
      },
    ],
    stalk: {
      schemaVersion: '1.0',
      preset: {
        semanticTokens: {},
        recipes: ['badge'],
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
    name: 'dialog',
    type: 'registry:ui',
    dependencies: ['@radix-ui/react-dialog', '@stalk-ui/preset'],
    registryDependencies: [],
    files: [
      {
        path: 'src/components/ui/dialog.tsx',
        type: 'registry:ui',
        sourcePath: 'packages/components/src/dialog.tsx',
      },
    ],
    stalk: {
      schemaVersion: '1.0',
      preset: {
        semanticTokens: {},
        recipes: ['dialog'],
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
    name: 'dropdown-menu',
    type: 'registry:ui',
    dependencies: ['@radix-ui/react-dropdown-menu', '@stalk-ui/preset'],
    registryDependencies: [],
    files: [
      {
        path: 'src/components/ui/dropdown-menu.tsx',
        type: 'registry:ui',
        sourcePath: 'packages/components/src/dropdown-menu.tsx',
      },
    ],
    stalk: {
      schemaVersion: '1.0',
      preset: {
        semanticTokens: {},
        recipes: ['dropdownMenu'],
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
    name: 'label',
    type: 'registry:ui',
    dependencies: ['@stalk-ui/preset'],
    registryDependencies: [],
    files: [
      {
        path: 'src/components/ui/label.tsx',
        type: 'registry:ui',
        sourcePath: 'packages/components/src/label.tsx',
      },
    ],
    stalk: {
      schemaVersion: '1.0',
      preset: {
        semanticTokens: {},
        recipes: ['label'],
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
    name: 'switch',
    type: 'registry:ui',
    dependencies: ['@stalk-ui/preset'],
    registryDependencies: [],
    files: [
      {
        path: 'src/components/ui/switch.tsx',
        type: 'registry:ui',
        sourcePath: 'packages/components/src/switch.tsx',
      },
    ],
    stalk: {
      schemaVersion: '1.0',
      preset: {
        semanticTokens: {},
        recipes: ['switch'],
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
