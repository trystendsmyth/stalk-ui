import { defineRegistryItem } from './_template'

export const dialog = defineRegistryItem({
  dependencies: ['@radix-ui/react-dialog', '@stalk-ui/preset'],
  filePath: 'src/components/ui/dialog.tsx',
  name: 'dialog',
  recipes: ['dialog'],
  sourcePath: 'packages/components/src/dialog.tsx',
})
