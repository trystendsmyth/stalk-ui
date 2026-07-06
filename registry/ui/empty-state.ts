import { defineRegistryItem } from './_template'

export const emptyState = defineRegistryItem({
  dependencies: ['@stalk-ui/preset'],
  filePath: 'src/components/ui/empty-state.tsx',
  name: 'empty-state',
  recipes: ['emptyState'],
  registryDependencies: ['create-style-context'],
  sourcePath: 'packages/components/src/empty-state.tsx',
})
