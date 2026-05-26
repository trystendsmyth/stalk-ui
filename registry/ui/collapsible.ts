import { defineRegistryItem } from './_template'

export const collapsible = defineRegistryItem({
  dependencies: ['@radix-ui/react-collapsible', '@stalk-ui/preset'],
  filePath: 'src/components/ui/collapsible.tsx',
  name: 'collapsible',
  recipes: ['collapsible'],
  sourcePath: 'packages/components/src/collapsible.tsx',
})
