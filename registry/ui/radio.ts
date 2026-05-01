import { defineRegistryItem } from './_template'

export const radio = defineRegistryItem({
  dependencies: ['@radix-ui/react-radio-group', '@stalk-ui/preset'],
  filePath: 'src/components/ui/radio.tsx',
  name: 'radio',
  recipes: ['radio'],
  sourcePath: 'packages/components/src/radio.tsx',
})
