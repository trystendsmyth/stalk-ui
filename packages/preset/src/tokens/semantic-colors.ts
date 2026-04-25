import type { AccentColor, GrayColor, TokenGroup } from '../types'

const scaleToken = (scale: string, step: number) => `{colors.${scale}.${String(step)}}`
const darkScaleToken = (scale: string, step: number) => `{colors.${scale}Dark.${String(step)}}`

const semanticPair = (light: string, dark: string) => ({
  value: {
    base: light,
    _dark: dark,
  },
})

export const createAccentSemanticTokens = (accentColor: AccentColor): TokenGroup => ({
  surface: semanticPair(scaleToken(accentColor, 2), darkScaleToken(accentColor, 2)),
  subtle: semanticPair(scaleToken(accentColor, 3), darkScaleToken(accentColor, 3)),
  muted: semanticPair(scaleToken(accentColor, 4), darkScaleToken(accentColor, 4)),
  solid: semanticPair(scaleToken(accentColor, 9), darkScaleToken(accentColor, 9)),
  emphasis: semanticPair(scaleToken(accentColor, 10), darkScaleToken(accentColor, 10)),
  fg: semanticPair(scaleToken(accentColor, 11), darkScaleToken(accentColor, 11)),
  contrast: semanticPair('#ffffff', '#ffffff'),
})

export const createSemanticColorTokens = (
  accentColor: AccentColor,
  grayColor: GrayColor,
): TokenGroup => ({
  bg: {
    default: semanticPair(scaleToken(grayColor, 1), darkScaleToken(grayColor, 1)),
    subtle: semanticPair(scaleToken(grayColor, 2), darkScaleToken(grayColor, 2)),
    muted: semanticPair(scaleToken(grayColor, 3), darkScaleToken(grayColor, 3)),
    canvas: semanticPair(scaleToken(grayColor, 1), '#0b0d12'),
  },
  fg: {
    default: semanticPair(scaleToken(grayColor, 12), darkScaleToken(grayColor, 12)),
    muted: semanticPair(scaleToken(grayColor, 11), darkScaleToken(grayColor, 11)),
    subtle: semanticPair(scaleToken(grayColor, 10), darkScaleToken(grayColor, 10)),
    inverse: semanticPair('#ffffff', '#111111'),
  },
  border: {
    default: semanticPair(scaleToken(grayColor, 6), darkScaleToken(grayColor, 6)),
    muted: semanticPair(scaleToken(grayColor, 5), darkScaleToken(grayColor, 5)),
    strong: semanticPair(scaleToken(grayColor, 8), darkScaleToken(grayColor, 8)),
  },
  accent: createAccentSemanticTokens(accentColor),
  success: createAccentSemanticTokens('emerald'),
  warning: createAccentSemanticTokens('amber'),
  danger: createAccentSemanticTokens('red'),
  info: createAccentSemanticTokens('blue'),
})
