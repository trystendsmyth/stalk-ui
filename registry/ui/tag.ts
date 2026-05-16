import { defineRegistryItem } from './_template'

export const tag = defineRegistryItem({
  dependencies: ['@stalk-ui/preset', 'lucide-react'],
  filePath: 'src/components/ui/tag.tsx',
  name: 'tag',
  recipes: ['tag'],
  sourcePath: 'packages/components/src/tag.tsx',
})
