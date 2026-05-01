import type { TokenGroup } from '../types'

const stroke = (width: string, color: string) => ({
  value: `{borderWidths.${width}} solid {colors.border.${color}}`,
})

export const createSemanticBorderTokens = (): TokenGroup => ({
  default: stroke('xs', 'default'),
  muted: stroke('xs', 'muted'),
  strong: stroke('xs', 'strong'),
  hover: stroke('xs', 'hover'),
  focus: stroke('md', 'focus'),
  invalid: stroke('xs', 'invalid'),
  transparent: { value: '{borderWidths.xs} solid transparent' },
})
