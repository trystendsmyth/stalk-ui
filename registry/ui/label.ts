import { defineRegistryItem } from './_template'

export const label = defineRegistryItem({
  dependencies: ['@radix-ui/react-label', '@stalk-ui/preset'],
  filePath: 'src/components/ui/label.tsx',
  name: 'label',
  recipes: ['label'],
  sourcePath: 'packages/components/src/label.tsx',
})
