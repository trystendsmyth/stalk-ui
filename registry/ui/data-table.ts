import { defineRegistryItem } from './_template'

export const dataTable = defineRegistryItem({
  dependencies: ['@stalk-ui/preset', '@tanstack/react-table', 'lucide-react'],
  filePath: 'src/components/ui/data-table.tsx',
  name: 'data-table',
  recipes: ['dataTable'],
  registryDependencies: ['button', 'table'],
  sourcePath: 'packages/components/src/data-table.tsx',
})
