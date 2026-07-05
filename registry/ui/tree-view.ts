import { defineRegistryItem } from './_template'

export const treeView = defineRegistryItem({
  dependencies: ['@stalk-ui/preset', 'lucide-react'],
  filePath: 'src/components/ui/tree-view.tsx',
  name: 'tree-view',
  recipes: ['treeView'],
  sourcePath: 'packages/components/src/tree-view.tsx',
})
