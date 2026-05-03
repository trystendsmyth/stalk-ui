import { defineRegistryItem } from './_template'

export const spinner = defineRegistryItem({
  dependencies: ['@stalk-ui/preset'],
  filePath: 'src/components/ui/spinner.tsx',
  name: 'spinner',
  recipes: ['spinner'],
  sourcePath: 'packages/components/src/spinner.tsx',
})
