import { defineRegistryItem } from './_template'

export const card = defineRegistryItem({
  dependencies: ['@stalk-ui/preset'],
  filePath: 'src/components/ui/card.tsx',
  name: 'card',
  recipes: ['card'],
  registryDependencies: ['create-style-context'],
  sourcePath: 'packages/components/src/card.tsx',
})
