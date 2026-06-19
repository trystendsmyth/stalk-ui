import { defineRegistryItem } from './_template'

export const dataList = defineRegistryItem({
  dependencies: ['@stalk-ui/preset'],
  filePath: 'src/components/ui/data-list.tsx',
  name: 'data-list',
  recipes: ['dataList'],
  registryDependencies: ['create-style-context', 'tones'],
  sourcePath: 'packages/components/src/data-list.tsx',
})
