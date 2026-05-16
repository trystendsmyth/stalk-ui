import { defineRegistryItem } from './_template'

export const tabs = defineRegistryItem({
  dependencies: ['@radix-ui/react-tabs', '@stalk-ui/preset'],
  filePath: 'src/components/ui/tabs.tsx',
  name: 'tabs',
  recipes: ['tabs'],
  sourcePath: 'packages/components/src/tabs.tsx',
})
