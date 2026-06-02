import { defineRegistryItem } from './_template'

export const alert = defineRegistryItem({
  dependencies: ['@stalk-ui/preset'],
  filePath: 'src/components/ui/alert.tsx',
  name: 'alert',
  recipes: ['alert'],
  registryDependencies: ['create-style-context'],
  sourcePath: 'packages/components/src/alert.tsx',
})
