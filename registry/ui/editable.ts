import { defineRegistryItem } from './_template'

export const editable = defineRegistryItem({
  dependencies: ['@stalk-ui/preset'],
  filePath: 'src/components/ui/editable.tsx',
  name: 'editable',
  recipes: ['editable'],
  sourcePath: 'packages/components/src/editable.tsx',
})
