import type { BorderRadius, TokenGroup } from '../types'

const radiusMultipliers = {
  none: 0,
  sm: 0.75,
  md: 1,
  lg: 1.25,
  xl: 1.5,
} as const satisfies Record<BorderRadius, number>

export const createRadiusTokens = (borderRadius: BorderRadius): TokenGroup => {
  const multiplier = radiusMultipliers[borderRadius]

  const px = (value: number) => `${String(value * multiplier)}px`

  return {
    none: { value: '0px' },
    xs: { value: px(2) },
    sm: { value: px(4) },
    md: { value: px(6) },
    lg: { value: px(8) },
    xl: { value: px(12) },
    full: { value: '9999px' },
  }
}
