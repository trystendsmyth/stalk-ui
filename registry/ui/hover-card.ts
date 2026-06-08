import { defineRegistryItem } from './_template'

export const hoverCard = defineRegistryItem({
  dependencies: ['@radix-ui/react-hover-card', '@stalk-ui/preset'],
  filePath: 'src/components/ui/hover-card.tsx',
  name: 'hover-card',
  recipes: ['hoverCard'],
  sourcePath: 'packages/components/src/hover-card.tsx',
})
