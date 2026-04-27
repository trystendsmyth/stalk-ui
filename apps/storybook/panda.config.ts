import { defineConfig } from '@pandacss/dev'
import stalkPreset from '@stalk-ui/preset'

export default defineConfig({
  preflight: true,
  presets: [stalkPreset],
  include: ['src/**/*.{ts,tsx}', '../../packages/components/src/**/*.{ts,tsx}'],
  jsxFramework: 'react',
  outdir: 'styled-system',
})
