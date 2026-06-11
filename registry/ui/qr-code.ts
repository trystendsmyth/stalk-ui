import { defineRegistryItem } from './_template'

export const qrCode = defineRegistryItem({
  dependencies: ['@stalk-ui/preset', 'react-qrcode-logo'],
  filePath: 'src/components/ui/qr-code.tsx',
  name: 'qr-code',
  recipes: ['qrCode'],
  sourcePath: 'packages/components/src/qr-code.tsx',
})
