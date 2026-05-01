import { defineRegistryItem } from './_template'

export const checkbox = defineRegistryItem({
  dependencies: ['@radix-ui/react-checkbox', '@stalk-ui/preset', 'lucide-react'],
  filePath: 'src/components/ui/checkbox.tsx',
  name: 'checkbox',
  recipes: ['checkbox'],
  sourcePath: 'packages/components/src/checkbox.tsx',
})
