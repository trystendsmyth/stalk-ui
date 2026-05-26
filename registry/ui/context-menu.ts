import { defineRegistryItem } from './_template'

export const contextMenu = defineRegistryItem({
  dependencies: ['@radix-ui/react-context-menu', '@stalk-ui/preset', 'lucide-react'],
  filePath: 'src/components/ui/context-menu.tsx',
  name: 'context-menu',
  recipes: ['contextMenu'],
  sourcePath: 'packages/components/src/context-menu.tsx',
})
