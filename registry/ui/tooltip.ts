import { defineRegistryItem } from './_template'

export const tooltip = defineRegistryItem({
  dependencies: ['@radix-ui/react-tooltip', '@stalk-ui/preset'],
  filePath: 'src/components/ui/tooltip.tsx',
  name: 'tooltip',
  recipes: ['tooltip'],
  sourcePath: 'packages/components/src/tooltip.tsx',
})
