import { defineRegistryItem } from './_template'

export const form = defineRegistryItem({
  dependencies: ['@radix-ui/react-slot', '@stalk-ui/preset', 'react-hook-form'],
  filePath: 'src/components/ui/form.tsx',
  name: 'form',
  recipes: ['form'],
  registryDependencies: ['label'],
  sourcePath: 'packages/components/src/form.tsx',
})
