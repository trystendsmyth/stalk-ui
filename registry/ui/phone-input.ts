import { defineRegistryItem } from './_template'

export const phoneInput = defineRegistryItem({
  dependencies: ['@stalk-ui/preset', 'react-international-phone'],
  filePath: 'src/components/ui/phone-input.tsx',
  name: 'phone-input',
  recipes: [],
  registryDependencies: ['input', 'select'],
  sourcePath: 'packages/components/src/phone-input.tsx',
})
