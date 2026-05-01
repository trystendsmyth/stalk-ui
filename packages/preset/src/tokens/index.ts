import { animationTokens } from './animations'
import { aspectRatioTokens } from './aspect-ratios'
import { blurTokens } from './blurs'
import { borderWidthTokens } from './border-widths'
import { primitiveColorTokens } from './colors'
import { durationTokens } from './durations'
import { easingTokens } from './easings'
import { fontSizeTokens } from './font-sizes'
import { fontWeightTokens } from './font-weights'
import { fontTokens } from './fonts'
import { letterSpacingTokens } from './letter-spacings'
import { lineHeightTokens } from './line-heights'
import { radiusTokens } from './radii'
import { shadowTokens } from './shadows'
import { sizeTokens } from './sizes'
import { spacingTokens } from './spacing'
import { zIndexTokens } from './z-index'

export const tokens = {
  animations: animationTokens,
  aspectRatios: aspectRatioTokens,
  blurs: blurTokens,
  borderWidths: borderWidthTokens,
  colors: primitiveColorTokens,
  durations: durationTokens,
  easings: easingTokens,
  fonts: fontTokens,
  fontSizes: fontSizeTokens,
  fontWeights: fontWeightTokens,
  letterSpacings: letterSpacingTokens,
  lineHeights: lineHeightTokens,
  radii: radiusTokens,
  shadows: shadowTokens,
  sizes: sizeTokens,
  spacing: spacingTokens,
  zIndex: zIndexTokens,
}

export { FONT_SANS_STACK, FONT_MONO_STACK } from './fonts'
