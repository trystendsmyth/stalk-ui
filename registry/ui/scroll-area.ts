import { defineRegistryItem } from './_template'

export const scrollArea = defineRegistryItem({
  dependencies: ['@radix-ui/react-scroll-area', '@stalk-ui/preset'],
  filePath: 'src/components/ui/scroll-area.tsx',
  name: 'scroll-area',
  recipes: ['scrollArea'],
  sourcePath: 'packages/components/src/scroll-area.tsx',
})
