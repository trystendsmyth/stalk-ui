import { defineRegistryItem } from './_template'

export const accordion = defineRegistryItem({
  dependencies: ['@radix-ui/react-accordion', '@stalk-ui/preset', 'lucide-react'],
  filePath: 'src/components/ui/accordion.tsx',
  name: 'accordion',
  recipes: ['accordion'],
  registryDependencies: ['create-style-context'],
  sourcePath: 'packages/components/src/accordion.tsx',
})
