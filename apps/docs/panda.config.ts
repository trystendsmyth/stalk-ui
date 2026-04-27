import { defineConfig } from '@pandacss/dev'
import { createPreset } from '@stalk-ui/preset'

type PandaPreset = NonNullable<Parameters<typeof defineConfig>[0]['presets']>[number]

export default defineConfig({
  preflight: true,
  presets: [
    '@pandacss/preset-base',
    createPreset({
      accentColor: 'blue',
      borderRadius: 'md',
      grayColor: 'neutral',
    }) as PandaPreset,
  ],
  include: [
    'app/**/*.{ts,tsx,mdx}',
    'components/**/*.{ts,tsx}',
    'content/**/*.{ts,tsx,mdx}',
    '../../packages/components/src/**/*.{ts,tsx}',
  ],
  jsxFramework: 'react',
  outdir: 'styled-system',
})
