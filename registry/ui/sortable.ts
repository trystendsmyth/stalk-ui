import { defineRegistryItem } from './_template'

export const sortable = defineRegistryItem({
  // `@dnd-kit/dom` is a transitive dependency of `@dnd-kit/react` (auto-installed);
  // only packages imported directly are declared here.
  dependencies: ['@dnd-kit/helpers', '@dnd-kit/react', '@stalk-ui/preset', 'lucide-react'],
  filePath: 'src/components/ui/sortable.tsx',
  name: 'sortable',
  recipes: ['sortable'],
  registryDependencies: ['create-style-context'],
  sourcePath: 'packages/components/src/sortable.tsx',
})
