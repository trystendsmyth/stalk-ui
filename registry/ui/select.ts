import { defineRegistryItem } from './_template'

export const select = defineRegistryItem({
  dependencies: ['@radix-ui/react-select', '@stalk-ui/preset', 'lucide-react'],
  filePath: 'src/components/ui/select.tsx',
  name: 'select',
  recipes: ['select'],
  sourcePath: 'packages/components/src/select.tsx',
})
