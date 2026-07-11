import { defineRegistryItem } from './_template'

export const virtualList = defineRegistryItem({
  dependencies: ['@stalk-ui/preset', '@tanstack/react-virtual'],
  filePath: 'src/components/ui/virtual-list.tsx',
  name: 'virtual-list',
  recipes: ['virtualList'],
  registryDependencies: ['create-style-context'],
  sourcePath: 'packages/components/src/virtual-list.tsx',
})
