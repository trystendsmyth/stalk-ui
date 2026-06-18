import { defineRegistryItem } from './_template'

export const passwordInput = defineRegistryItem({
  dependencies: ['@stalk-ui/preset', 'lucide-react'],
  filePath: 'src/components/ui/password-input.tsx',
  name: 'password-input',
  recipes: [],
  registryDependencies: ['input'],
  sourcePath: 'packages/components/src/password-input.tsx',
})
