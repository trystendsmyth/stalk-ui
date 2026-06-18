import { defineRegistryItem } from './_template'

export const numberInput = defineRegistryItem({
  dependencies: ['@stalk-ui/preset', 'lucide-react'],
  filePath: 'src/components/ui/number-input.tsx',
  name: 'number-input',
  recipes: ['numberInput'],
  registryDependencies: ['input'],
  sourcePath: 'packages/components/src/number-input.tsx',
})
