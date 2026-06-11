import { defineRegistryItem } from './_template'

export const otpInput = defineRegistryItem({
  dependencies: ['@stalk-ui/preset', 'input-otp'],
  filePath: 'src/components/ui/otp-input.tsx',
  name: 'otp-input',
  recipes: ['otpInput'],
  sourcePath: 'packages/components/src/otp-input.tsx',
})
