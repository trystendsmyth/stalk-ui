import type { RecipeConfig } from '../types'

export const qrCode = {
  className: 'stalk-qr-code',
  description: 'Recipe for the QR code surface that wraps the generated canvas.',
  jsx: ['QrCode', /^QrCode\./],
  base: {
    display: 'inline-flex',
    // The canvas is a replaced inline element; zero the line box so the wrapper
    // hugs it with no descender gap.
    lineHeight: '0',
  },
} satisfies RecipeConfig
