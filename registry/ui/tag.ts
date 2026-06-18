import { defineRegistryItem } from './_template'

export const tag = defineRegistryItem({
  dependencies: ['@stalk-ui/preset', 'lucide-react'],
  filePath: 'src/components/ui/tag.tsx',
  name: 'tag',
  recipes: ['tag'],
  registryDependencies: ['create-style-context'],
  sourcePath: 'packages/components/src/tag.tsx',
})
