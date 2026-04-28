import { colorMix, type ColorMixArgs } from '../lib/color-mix'

import type { UtilityConfig } from '@pandacss/types'

export const backgroundAlpha: UtilityConfig = {
  backgroundAlpha: {
    shorthand: ['bga'],
    property: 'backgroundColor',
    className: 'background-alpha',
    values: { type: 'string' },
    transform(value: string, args: ColorMixArgs) {
      const { value: mixed, color } = colorMix(value, args)

      return {
        '--stalk-background-alpha': mixed,
        backgroundColor: `var(--stalk-background-alpha, ${color})`,
      }
    },
  },
}
