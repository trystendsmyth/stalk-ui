import { defineRegistryItem } from './_template'

export const calendar = defineRegistryItem({
  dependencies: ['@stalk-ui/preset', 'lucide-react', 'react-day-picker'],
  filePath: 'src/components/ui/calendar.tsx',
  name: 'calendar',
  recipes: ['calendar'],
  sourcePath: 'packages/components/src/calendar.tsx',
})
