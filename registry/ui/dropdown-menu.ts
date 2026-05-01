import { defineRegistryItem } from './_template'

export const dropdownMenu = defineRegistryItem({
  dependencies: ['@radix-ui/react-dropdown-menu', '@stalk-ui/preset'],
  filePath: 'src/components/ui/dropdown-menu.tsx',
  name: 'dropdown-menu',
  recipes: ['dropdownMenu'],
  sourcePath: 'packages/components/src/dropdown-menu.tsx',
})
