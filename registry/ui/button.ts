import { defineRegistryItem } from './_template'

export const button = defineRegistryItem({
  dependencies: ['@radix-ui/react-slot', '@stalk-ui/preset'],
  filePath: 'src/components/ui/button.tsx',
  name: 'button',
  recipes: ['button'],
  registryDependencies: ['spinner', 'tones'],
  sourcePath: 'packages/components/src/button.tsx',
})
