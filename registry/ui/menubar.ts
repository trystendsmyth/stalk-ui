import { defineRegistryItem } from './_template'

export const menubar = defineRegistryItem({
  dependencies: ['@radix-ui/react-menubar', '@stalk-ui/preset', 'lucide-react'],
  filePath: 'src/components/ui/menubar.tsx',
  name: 'menubar',
  recipes: ['menubar'],
  sourcePath: 'packages/components/src/menubar.tsx',
})
