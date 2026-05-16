import { defineRegistryItem } from './_template'

export const alert = defineRegistryItem({
  dependencies: ['@stalk-ui/preset', 'lucide-react'],
  filePath: 'src/components/ui/alert.tsx',
  name: 'alert',
  recipes: ['alert'],
  sourcePath: 'packages/components/src/alert.tsx',
})
