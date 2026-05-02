import {
  createAccentSemanticTokens,
  createVibrantAccentSemanticTokens,
} from '../tokens/semantic-colors'

const scaleToken = (scale: string, step: number) => `{colors.${scale}.${String(step)}}`
const darkScaleToken = (scale: string, step: number) => `{colors.${scale}Dark.${String(step)}}`

const semanticPair = (light: string, dark: string) => ({
  value: {
    _dark: dark,
    base: light,
  },
})

/**
 * Identity: violet chrome (bg + structural borders), mauve text + hairlines, teal accent.
 * Mauve frees violet to mean "promotional" instead of being load-bearing for body copy;
 * teal keeps CTAs distinct from the surface tint.
 */
export const rainbowTheme = {
  semanticTokens: {
    colors: {
      accent: createAccentSemanticTokens('teal'),
      bg: {
        canvas: semanticPair(scaleToken('violet', 2), darkScaleToken('violet', 2)),
        default: semanticPair(scaleToken('violet', 1), darkScaleToken('violet', 1)),
        muted: semanticPair(scaleToken('violet', 6), darkScaleToken('violet', 6)),
        subtle: semanticPair(scaleToken('violet', 3), darkScaleToken('violet', 3)),
      },
      border: {
        default: semanticPair(scaleToken('violet', 7), darkScaleToken('violet', 7)),
        muted: semanticPair(scaleToken('mauve', 4), darkScaleToken('mauve', 4)),
        strong: semanticPair(scaleToken('violet', 9), darkScaleToken('violet', 9)),
        hover: semanticPair(scaleToken('violet', 8), darkScaleToken('violet', 8)),
        /** Stay blue in rainbow so focus reads as a system signal, not the brand color. */
        focus: semanticPair(scaleToken('blue', 9), darkScaleToken('blue', 9)),
        /** Bright red — the dark-scale step 9 is more vivid than light step 9 in both modes. */
        invalid: semanticPair(darkScaleToken('red', 9), darkScaleToken('red', 9)),
      },
      danger: createVibrantAccentSemanticTokens('red'),
      fg: {
        default: semanticPair(scaleToken('mauve', 12), darkScaleToken('mauve', 12)),
        inverse: semanticPair(scaleToken('mauve', 1), scaleToken('mauve', 12)),
        muted: semanticPair(scaleToken('mauve', 11), darkScaleToken('mauve', 11)),
        subtle: semanticPair(scaleToken('mauve', 10), darkScaleToken('mauve', 10)),
      },
      info: createVibrantAccentSemanticTokens('blue'),
      success: createVibrantAccentSemanticTokens('emerald'),
      warning: createVibrantAccentSemanticTokens('yellow'),
      highlight: createVibrantAccentSemanticTokens('orange'),
    },
  },
}
