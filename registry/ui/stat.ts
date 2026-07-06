import { defineRegistryItem } from './_template'

export const stat = defineRegistryItem({
  dependencies: ['@stalk-ui/preset', 'lucide-react'],
  filePath: 'src/components/ui/stat.tsx',
  name: 'stat',
  recipes: ['stat'],
  registryDependencies: ['create-style-context'],
  sourcePath: 'packages/components/src/stat.tsx',
})
