import { defineRegistryItem } from './_template'

export const table = defineRegistryItem({
  dependencies: ['@stalk-ui/preset'],
  filePath: 'src/components/ui/table.tsx',
  name: 'table',
  recipes: ['table'],
  registryDependencies: ['create-style-context'],
  sourcePath: 'packages/components/src/table.tsx',
})
