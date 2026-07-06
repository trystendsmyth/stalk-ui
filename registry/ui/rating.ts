import { defineRegistryItem } from './_template'

export const rating = defineRegistryItem({
  dependencies: ['@stalk-ui/preset', 'lucide-react'],
  filePath: 'src/components/ui/rating.tsx',
  name: 'rating',
  recipes: ['rating'],
  sourcePath: 'packages/components/src/rating.tsx',
})
