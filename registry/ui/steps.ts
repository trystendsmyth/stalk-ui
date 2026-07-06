import { defineRegistryItem } from './_template'

export const steps = defineRegistryItem({
  dependencies: ['@stalk-ui/preset', 'lucide-react'],
  filePath: 'src/components/ui/steps.tsx',
  name: 'steps',
  recipes: ['steps'],
  sourcePath: 'packages/components/src/steps.tsx',
})
