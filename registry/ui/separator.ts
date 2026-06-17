import { defineRegistryItem } from './_template'

export const separator = defineRegistryItem({
  dependencies: ['@radix-ui/react-separator', '@stalk-ui/preset'],
  filePath: 'src/components/ui/separator.tsx',
  name: 'separator',
  recipes: ['separator'],
  sourcePath: 'packages/components/src/separator.tsx',
})
