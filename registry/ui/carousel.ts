import { defineRegistryItem } from './_template'

export const carousel = defineRegistryItem({
  dependencies: ['@stalk-ui/preset', 'embla-carousel-react', 'lucide-react'],
  filePath: 'src/components/ui/carousel.tsx',
  name: 'carousel',
  recipes: ['carousel'],
  sourcePath: 'packages/components/src/carousel.tsx',
})
