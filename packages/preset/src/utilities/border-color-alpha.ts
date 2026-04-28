import { colorMix, type ColorMixArgs } from '../lib/color-mix'

import type { UtilityConfig } from '@pandacss/types'

export const borderColorAlpha: UtilityConfig = {
  borderColorAlpha: {
    shorthand: ['bca'],
    property: 'borderColor',
    className: 'border-color-alpha',
    values: { type: 'string' },
    transform(value: string, args: ColorMixArgs) {
      const { value: mixed, color } = colorMix(value, args)

      return {
        '--stalk-border-color-alpha': mixed,
        borderColor: `var(--stalk-border-color-alpha, ${color})`,
      }
    },
  },
}
