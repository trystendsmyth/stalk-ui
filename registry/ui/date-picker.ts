import { defineRegistryItem } from './_template'

export const datePicker = defineRegistryItem({
  dependencies: ['@stalk-ui/preset', 'lucide-react', 'react-day-picker'],
  filePath: 'src/components/ui/date-picker.tsx',
  name: 'date-picker',
  recipes: ['datePicker'],
  registryDependencies: ['button', 'calendar', 'datetime-input', 'popover'],
  sourcePath: 'packages/components/src/date-picker.tsx',
})
