import { defineRegistryItem } from './_template'

export const combobox = defineRegistryItem({
  dependencies: ['@stalk-ui/preset', 'lucide-react'],
  filePath: 'src/components/ui/combobox.tsx',
  name: 'combobox',
  recipes: ['combobox'],
  registryDependencies: ['button', 'command', 'popover'],
  sourcePath: 'packages/components/src/combobox.tsx',
})
