import { defineRegistryItem } from './_template'

export const timeline = defineRegistryItem({
  dependencies: ['@stalk-ui/preset'],
  filePath: 'src/components/ui/timeline.tsx',
  name: 'timeline',
  recipes: ['timeline'],
  registryDependencies: ['create-style-context', 'tones'],
  sourcePath: 'packages/components/src/timeline.tsx',
})
