import { defineRegistryItem } from './_template'

export const resizable = defineRegistryItem({
  dependencies: ['@stalk-ui/preset', 'lucide-react', 'react-resizable-panels'],
  filePath: 'src/components/ui/resizable.tsx',
  name: 'resizable',
  recipes: ['resizable'],
  sourcePath: 'packages/components/src/resizable.tsx',
})
