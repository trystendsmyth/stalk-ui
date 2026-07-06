import { defineRegistryItem } from './_template'

export const tree = defineRegistryItem({
  dependencies: ['@stalk-ui/preset', 'lucide-react'],
  filePath: 'src/components/ui/tree.tsx',
  name: 'tree',
  recipes: ['tree'],
  sourcePath: 'packages/components/src/tree.tsx',
})
