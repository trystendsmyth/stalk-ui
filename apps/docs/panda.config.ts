import { defineConfig } from '@pandacss/dev'
import stalkPreset from '@stalk-ui/preset'

export default defineConfig({
  preflight: true,
  presets: [stalkPreset],
  include: [
    'app/**/*.{ts,tsx,mdx}',
    'components/**/*.{ts,tsx}',
    'content/**/*.{ts,tsx,mdx}',
    '../../packages/components/src/**/*.{ts,tsx}',
  ],
  jsxFramework: 'react',
  outdir: 'styled-system',
})
