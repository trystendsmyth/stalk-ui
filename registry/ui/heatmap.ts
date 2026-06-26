import { defineRegistryItem } from './_template'

export const heatmap = defineRegistryItem({
  dependencies: ['@stalk-ui/preset'],
  filePath: 'src/components/ui/heatmap.tsx',
  name: 'heatmap',
  recipes: ['heatmap'],
  sourcePath: 'packages/components/src/heatmap.tsx',
})
