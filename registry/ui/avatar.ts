import { defineRegistryItem } from './_template'

export const avatar = defineRegistryItem({
  dependencies: ['@radix-ui/react-avatar', '@stalk-ui/preset'],
  filePath: 'src/components/ui/avatar.tsx',
  name: 'avatar',
  recipes: ['avatar'],
  registryDependencies: ['tones'],
  sourcePath: 'packages/components/src/avatar.tsx',
})
