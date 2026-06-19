import { defineRegistryItem } from './_template'

export const heading = defineRegistryItem({
  dependencies: ['@stalk-ui/preset'],
  filePath: 'src/components/ui/heading.tsx',
  name: 'heading',
  recipes: ['text'],
  registryDependencies: ['text', 'tones'],
  sourcePath: 'packages/components/src/heading.tsx',
})
