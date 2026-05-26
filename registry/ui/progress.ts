import { defineRegistryItem } from './_template'

export const progress = defineRegistryItem({
  dependencies: ['@radix-ui/react-progress', '@stalk-ui/preset'],
  filePath: 'src/components/ui/progress.tsx',
  name: 'progress',
  recipes: ['progress'],
  sourcePath: 'packages/components/src/progress.tsx',
})
