import { defineRegistryItem } from './_template'

export const navigationMenu = defineRegistryItem({
  dependencies: ['@radix-ui/react-navigation-menu', '@stalk-ui/preset', 'lucide-react'],
  filePath: 'src/components/ui/navigation-menu.tsx',
  name: 'navigation-menu',
  recipes: ['navigationMenu'],
  sourcePath: 'packages/components/src/navigation-menu.tsx',
})
