import { defineRegistryItem } from './_template'

export const sheet = defineRegistryItem({
  dependencies: ['@radix-ui/react-dialog', '@stalk-ui/preset'],
  filePath: 'src/components/ui/sheet.tsx',
  name: 'sheet',
  recipes: ['sheet'],
  sourcePath: 'packages/components/src/sheet.tsx',
})
