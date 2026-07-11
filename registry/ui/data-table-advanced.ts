import { defineRegistryItem } from './_template'

export const dataTableAdvanced = defineRegistryItem({
  dependencies: [
    '@stalk-ui/preset',
    '@tanstack/react-table',
    '@tanstack/react-virtual',
    'lucide-react',
  ],
  filePath: 'src/components/ui/data-table-advanced.tsx',
  name: 'data-table-advanced',
  recipes: ['dataTable'],
  registryDependencies: ['button', 'table'],
  sourcePath: 'packages/components/src/data-table-advanced.tsx',
})
