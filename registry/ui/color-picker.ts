import { defineRegistryItem } from './_template'

export const colorPicker = defineRegistryItem({
  dependencies: ['@stalk-ui/preset', 'lucide-react', 'react-colorful'],
  filePath: 'src/components/ui/color-picker.tsx',
  name: 'color-picker',
  recipes: ['colorPicker'],
  registryDependencies: ['popover'],
  sourcePath: 'packages/components/src/color-picker.tsx',
})
