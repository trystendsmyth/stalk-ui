import { defineRegistryItem } from './_template'

export const fileUpload = defineRegistryItem({
  dependencies: ['@stalk-ui/preset', 'lucide-react'],
  filePath: 'src/components/ui/file-upload.tsx',
  name: 'file-upload',
  recipes: ['fileUpload'],
  sourcePath: 'packages/components/src/file-upload.tsx',
})
