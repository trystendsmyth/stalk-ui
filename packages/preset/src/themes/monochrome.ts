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
 * Identity: slate chrome with a high-contrast monochrome accent (near-black light /
 * near-white dark), inspired by Shadow Panda's grayscale shadcn-style preset. Status
 * colors stay vivid so success/warning/danger/info still read as system signals against
 * the otherwise neutral surface.
 *
 * Note: Stalk's default radii scale already matches Shadow Panda's shadcn-derived
 * rhythm (lg = 0.5rem, md = lg-2px, sm = lg-4px, xl = lg+4px), so monochrome inherits
 * the same corner radii as the neutral baseline.
 */
/** Inter at the front of the stack; consumers must load Inter (e.g. via `next/font` or
 *  `@fontsource-variable/inter`) for the face to apply, otherwise the stack falls
 *  through to the project's `--font-sans` and then system UI. */
const INTER_SANS_STACK =
  '"Inter Variable", "Inter", var(--font-sans, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif)'

export const monochromeTheme = {
  tokens: {
    fonts: {
      sans: { value: INTER_SANS_STACK },
    },
  },
  semanticTokens: {
    colors: {
      /**
       * Hand-rolled because the accent collapses onto the gray scale: `solid` and `fg`
       * sit at step 12 (the inverted-luminance end of each Radix scale) so the accent
       * reads as the maximum-contrast monochrome surface in either color mode. The
       * `contrast` pair flips to step 1 for legible text on that solid swatch.
       */
      accent: {
        surface: semanticPair(scaleToken('slate', 2), darkScaleToken('slate', 2)),
        subtle: semanticPair(scaleToken('slate', 4), darkScaleToken('slate', 4)),
        muted: semanticPair(scaleToken('slate', 6), darkScaleToken('slate', 6)),
        solid: semanticPair(scaleToken('slate', 12), darkScaleToken('slate', 12)),
        emphasis: semanticPair(scaleToken('slate', 11), darkScaleToken('slate', 11)),
        fg: semanticPair(scaleToken('slate', 12), darkScaleToken('slate', 12)),
        contrast: semanticPair(scaleToken('slate', 1), darkScaleToken('slate', 1)),
      },
      bg: {
        canvas: semanticPair(scaleToken('slate', 2), darkScaleToken('slate', 1)),
        default: semanticPair(scaleToken('slate', 1), darkScaleToken('slate', 2)),
        muted: semanticPair(scaleToken('slate', 5), darkScaleToken('slate', 5)),
        subtle: semanticPair(scaleToken('slate', 3), darkScaleToken('slate', 3)),
      },
      border: {
        default: semanticPair(scaleToken('slate', 6), darkScaleToken('slate', 6)),
        muted: semanticPair(scaleToken('slate', 4), darkScaleToken('slate', 4)),
        strong: semanticPair(scaleToken('slate', 8), darkScaleToken('slate', 8)),
        hover: semanticPair(scaleToken('slate', 7), darkScaleToken('slate', 7)),
        /** Monochrome focus: step 9 of slate keeps the focus ring on-theme but visible. */
        focus: semanticPair(scaleToken('slate', 9), darkScaleToken('slate', 9)),
        invalid: semanticPair(darkScaleToken('red', 9), darkScaleToken('red', 9)),
      },
      danger: createVibrantAccentSemanticTokens('red'),
      fg: {
        default: semanticPair(scaleToken('slate', 12), darkScaleToken('slate', 12)),
        inverse: semanticPair(scaleToken('slate', 1), darkScaleToken('slate', 1)),
        muted: semanticPair(scaleToken('slate', 11), darkScaleToken('slate', 11)),
        subtle: semanticPair(scaleToken('slate', 10), darkScaleToken('slate', 10)),
      },
      info: createAccentSemanticTokens('blue'),
      success: createAccentSemanticTokens('emerald'),
      warning: createAccentSemanticTokens('yellow'),
      highlight: createAccentSemanticTokens('orange'),
    },
  },
}
