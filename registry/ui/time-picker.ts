import { defineRegistryItem } from './_template'

export const timePicker = defineRegistryItem({
  dependencies: ['@stalk-ui/preset'],
  filePath: 'src/components/ui/time-picker.tsx',
  name: 'time-picker',
  recipes: ['timePicker'],
  registryDependencies: ['select'],
  sourcePath: 'packages/components/src/time-picker.tsx',
})
