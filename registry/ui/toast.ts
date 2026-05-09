import { defineRegistryItem } from './_template'

export const toast = defineRegistryItem({
  dependencies: ['sonner', '@stalk-ui/preset'],
  filePath: 'src/components/ui/toast.tsx',
  name: 'toast',
  recipes: ['toast'],
  sourcePath: 'packages/components/src/toast.tsx',
})
