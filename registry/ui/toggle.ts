import { defineRegistryItem } from './_template'

export const toggle = defineRegistryItem({
  dependencies: ['@radix-ui/react-toggle', '@radix-ui/react-toggle-group', '@stalk-ui/preset'],
  filePath: 'src/components/ui/toggle.tsx',
  name: 'toggle',
  recipes: ['toggle'],
  sourcePath: 'packages/components/src/toggle.tsx',
})
