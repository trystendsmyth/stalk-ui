import type { TokenGroup } from '../types'

/**
 * Two complementary line-height families:
 * - Pixel-based (`2xs`–`6xl`) match the `fontSizes` ramp for tight typographic rhythm.
 * - Multiplier-based (`none`–`loose`) for free-form prose where exact alignment isn't required.
 */
export const lineHeightTokens: TokenGroup = {
  '2xs': { value: '0.875rem' }, // 14
  xs: { value: '1rem' }, // 16
  sm: { value: '1.25rem' }, // 20
  base: { value: '1.5rem' }, // 24
  lg: { value: '1.75rem' }, // 28
  xl: { value: '1.75rem' }, // 28
  '2xl': { value: '2rem' }, // 32
  '3xl': { value: '2.25rem' }, // 36
  '4xl': { value: '2.5rem' }, // 40
  '5xl': { value: '3.25rem' }, // 52
  '6xl': { value: '4rem' }, // 64
  none: { value: '1' },
  tight: { value: '1.25' },
  normal: { value: '1.5' },
  relaxed: { value: '1.625' },
  loose: { value: '2' },
}
