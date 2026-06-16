import { defineRegistryItem } from './_template'

export const breadcrumb = defineRegistryItem({
  dependencies: ['@radix-ui/react-slot', '@stalk-ui/preset', 'lucide-react'],
  filePath: 'src/components/ui/breadcrumb.tsx',
  name: 'breadcrumb',
  recipes: ['breadcrumb'],
  sourcePath: 'packages/components/src/breadcrumb.tsx',
})
