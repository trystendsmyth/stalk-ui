import type { TokenGroup } from '../types'

/**
 * Pixel-numeric spacing scale. Numeric keys are pixel values at the default
 * 16px root font-size; `base` is the 1rem inflection point. Use this scale
 * for `padding`, `margin`, `gap`, and any spatial property.
 */
export const spacingTokens: TokenGroup = {
  '0': { value: '0rem' },
  px: { value: '0.0625rem' }, // 1px hairline
  '2': { value: '0.125rem' },
  '4': { value: '0.25rem' },
  '6': { value: '0.375rem' },
  '8': { value: '0.5rem' },
  '10': { value: '0.625rem' },
  '12': { value: '0.75rem' },
  '14': { value: '0.875rem' },
  base: { value: '1rem' }, // 16px
  '18': { value: '1.125rem' },
  '20': { value: '1.25rem' },
  '22': { value: '1.375rem' },
  '24': { value: '1.5rem' },
  '28': { value: '1.75rem' },
  '32': { value: '2rem' },
  '36': { value: '2.25rem' },
  '40': { value: '2.5rem' },
  '44': { value: '2.75rem' },
  '48': { value: '3rem' },
  '56': { value: '3.5rem' },
  '64': { value: '4rem' },
  '80': { value: '5rem' },
  '96': { value: '6rem' },
  '112': { value: '7rem' },
  '128': { value: '8rem' },
  '144': { value: '9rem' },
  '160': { value: '10rem' },
  '176': { value: '11rem' },
  '192': { value: '12rem' },
  '208': { value: '13rem' },
  '224': { value: '14rem' },
  '240': { value: '15rem' },
  '256': { value: '16rem' },
  '288': { value: '18rem' },
  '320': { value: '20rem' },
  '384': { value: '24rem' },
}
