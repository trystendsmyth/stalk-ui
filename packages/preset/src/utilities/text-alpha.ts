import { colorMix, type ColorMixArgs } from '../lib/color-mix'

import type { UtilityConfig } from '@pandacss/types'

export const textAlpha: UtilityConfig = {
  textAlpha: {
    shorthand: ['texta'],
    property: 'color',
    className: 'text-alpha',
    values: { type: 'string' },
    transform(value: string, args: ColorMixArgs) {
      const { value: mixed, color } = colorMix(value, args)

      return {
        '--stalk-text-alpha': mixed,
        color: `var(--stalk-text-alpha, ${color})`,
      }
    },
  },
}
