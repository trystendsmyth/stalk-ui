import { defineRegistryItem } from './_template'

export const toolbar = defineRegistryItem({
  dependencies: ['@radix-ui/react-toolbar', '@stalk-ui/preset'],
  filePath: 'src/components/ui/toolbar.tsx',
  name: 'toolbar',
  recipes: ['toolbar'],
  registryDependencies: ['kbd', 'tooltip'],
  sourcePath: 'packages/components/src/toolbar.tsx',
})
