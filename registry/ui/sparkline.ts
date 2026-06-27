import { defineRegistryItem } from './_template'

export const sparkline = defineRegistryItem({
  dependencies: ['@stalk-ui/preset'],
  filePath: 'src/components/ui/sparkline.tsx',
  name: 'sparkline',
  recipes: ['sparkline'],
  registryDependencies: ['tones'],
  sourcePath: 'packages/components/src/sparkline.tsx',
})
