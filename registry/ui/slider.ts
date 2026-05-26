import { defineRegistryItem } from './_template'

export const slider = defineRegistryItem({
  dependencies: ['@radix-ui/react-slider', '@stalk-ui/preset'],
  filePath: 'src/components/ui/slider.tsx',
  name: 'slider',
  recipes: ['slider'],
  sourcePath: 'packages/components/src/slider.tsx',
})
