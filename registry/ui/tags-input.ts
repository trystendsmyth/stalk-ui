import { defineRegistryItem } from './_template'

export const tagsInput = defineRegistryItem({
  dependencies: ['@stalk-ui/preset'],
  filePath: 'src/components/ui/tags-input.tsx',
  name: 'tags-input',
  recipes: ['tagsInput'],
  registryDependencies: ['tag'],
  sourcePath: 'packages/components/src/tags-input.tsx',
})
