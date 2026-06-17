import { defineRegistryItem } from './_template'

export const sidebar = defineRegistryItem({
  dependencies: ['@radix-ui/react-slot', '@stalk-ui/preset', 'lucide-react'],
  filePath: 'src/components/ui/sidebar.tsx',
  name: 'sidebar',
  recipes: ['sidebar'],
  sourcePath: 'packages/components/src/sidebar.tsx',
})
