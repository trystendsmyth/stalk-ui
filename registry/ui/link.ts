import { defineRegistryItem } from './_template'

export const link = defineRegistryItem({
  dependencies: ['@radix-ui/react-slot', '@stalk-ui/preset'],
  filePath: 'src/components/ui/link.tsx',
  name: 'link',
  recipes: ['link'],
  sourcePath: 'packages/components/src/link.tsx',
})
