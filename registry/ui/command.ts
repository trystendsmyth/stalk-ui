import { defineRegistryItem } from './_template'

export const command = defineRegistryItem({
  dependencies: ['@stalk-ui/preset', 'cmdk', 'lucide-react'],
  filePath: 'src/components/ui/command.tsx',
  name: 'command',
  recipes: ['command'],
  sourcePath: 'packages/components/src/command.tsx',
})
