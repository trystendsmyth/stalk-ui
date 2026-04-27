import { defineConfig } from '@pandacss/dev'
import { createPreset } from '@stalk-ui/preset'

export default defineConfig({
  preflight: true,
  presets: [
    '@pandacss/preset-base',
    createPreset({
      accentColor: 'blue',
      borderRadius: 'md',
      grayColor: 'neutral',
    }),
  ],
  include: ['src/**/*.{ts,tsx}', '../../packages/components/src/**/*.{ts,tsx}'],
  jsxFramework: 'react',
  outdir: 'styled-system',
})
