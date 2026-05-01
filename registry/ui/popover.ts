import { defineRegistryItem } from './_template'

export const popover = defineRegistryItem({
  dependencies: ['@radix-ui/react-popover', '@stalk-ui/preset'],
  filePath: 'src/components/ui/popover.tsx',
  name: 'popover',
  recipes: ['popover'],
  sourcePath: 'packages/components/src/popover.tsx',
})
