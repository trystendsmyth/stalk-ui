import { defineRegistryItem } from './_template'

export const tour = defineRegistryItem({
  dependencies: ['@stalk-ui/preset'],
  filePath: 'src/components/ui/tour.tsx',
  name: 'tour',
  recipes: ['tour'],
  registryDependencies: ['button'],
  sourcePath: 'packages/components/src/tour.tsx',
})
