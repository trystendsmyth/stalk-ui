import { defineRegistryItem } from './_template'

export const switchItem = defineRegistryItem({
  dependencies: ['@radix-ui/react-switch', '@stalk-ui/preset'],
  filePath: 'src/components/ui/switch.tsx',
  name: 'switch',
  recipes: ['switch'],
  sourcePath: 'packages/components/src/switch.tsx',
})
