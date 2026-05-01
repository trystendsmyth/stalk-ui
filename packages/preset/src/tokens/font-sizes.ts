import type { TokenGroup } from '../types'

/** Semantic typographic ramp. Exact pixel values at 16px root: 10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60. */
export const fontSizeTokens: TokenGroup = {
  '2xs': { value: '0.625rem' },
  xs: { value: '0.75rem' },
  sm: { value: '0.875rem' },
  base: { value: '1rem' },
  lg: { value: '1.125rem' },
  xl: { value: '1.25rem' },
  '2xl': { value: '1.5rem' },
  '3xl': { value: '1.875rem' },
  '4xl': { value: '2.25rem' },
  '5xl': { value: '3rem' },
  '6xl': { value: '3.75rem' },
}
