import { defineRegistryItem } from './_template'

export const pagination = defineRegistryItem({
  dependencies: ['@radix-ui/react-slot', '@stalk-ui/preset', 'lucide-react'],
  filePath: 'src/components/ui/pagination.tsx',
  name: 'pagination',
  recipes: ['button', 'pagination'],
  sourcePath: 'packages/components/src/pagination.tsx',
})
