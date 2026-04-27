import { createAccentSemanticTokens } from '../tokens/semantic-colors'

const scaleToken = (scale: string, step: number) => `{colors.${scale}.${String(step)}}`
const darkScaleToken = (scale: string, step: number) => `{colors.${scale}Dark.${String(step)}}`

const semanticPair = (light: string, dark: string) => ({
  value: {
    _dark: dark,
    base: light,
  },
})

export const rainbowTheme = {
  semanticTokens: {
    colors: {
      accent: createAccentSemanticTokens('violet'),
      bg: {
        canvas: semanticPair(scaleToken('violet', 1), darkScaleToken('violet', 1)),
        default: semanticPair(scaleToken('violet', 1), darkScaleToken('violet', 1)),
        muted: semanticPair(scaleToken('violet', 3), darkScaleToken('violet', 3)),
        subtle: semanticPair(scaleToken('violet', 2), darkScaleToken('violet', 2)),
      },
      border: {
        default: semanticPair(scaleToken('violet', 6), darkScaleToken('violet', 6)),
        muted: semanticPair(scaleToken('violet', 5), darkScaleToken('violet', 5)),
        strong: semanticPair(scaleToken('violet', 8), darkScaleToken('violet', 8)),
      },
      danger: createAccentSemanticTokens('red'),
      fg: {
        default: semanticPair(scaleToken('violet', 12), darkScaleToken('violet', 12)),
        inverse: semanticPair('#ffffff', '#111111'),
        muted: semanticPair(scaleToken('violet', 11), darkScaleToken('violet', 11)),
        subtle: semanticPair(scaleToken('violet', 10), darkScaleToken('violet', 10)),
      },
      info: createAccentSemanticTokens('blue'),
      success: createAccentSemanticTokens('emerald'),
      warning: createAccentSemanticTokens('amber'),
    },
  },
}
