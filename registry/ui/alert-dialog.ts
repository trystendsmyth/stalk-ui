import { defineRegistryItem } from './_template'

export const alertDialog = defineRegistryItem({
  dependencies: ['@radix-ui/react-alert-dialog', '@stalk-ui/preset'],
  filePath: 'src/components/ui/alert-dialog.tsx',
  name: 'alert-dialog',
  recipes: ['alertDialog'],
  sourcePath: 'packages/components/src/alert-dialog.tsx',
})
