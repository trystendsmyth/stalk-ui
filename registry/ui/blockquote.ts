import { defineRegistryItem } from './_template'

export const blockquote = defineRegistryItem({
  dependencies: ['@stalk-ui/preset'],
  filePath: 'src/components/ui/blockquote.tsx',
  name: 'blockquote',
  recipes: ['blockquote'],
  sourcePath: 'packages/components/src/blockquote.tsx',
})
