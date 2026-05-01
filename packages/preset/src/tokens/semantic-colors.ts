import type { AccentColor, GrayColor, TokenGroup } from '../types'

const scaleToken = (scale: string, step: number) => `{colors.${scale}.${String(step)}}`
const darkScaleToken = (scale: string, step: number) => `{colors.${scale}Dark.${String(step)}}`

const semanticPair = (light: string, dark: string) => ({
  value: {
    base: light,
    _dark: dark,
  },
})

/** Primitive steps are 1 (lightest) → 12 (darkest). Spread 2–4 → 2,5,7 so tints read as distinct layers; keep solid/emphasis vivid and push fg to 12 for clearer ink. */
export const createAccentSemanticTokens = (accentColor: AccentColor): TokenGroup => ({
  surface: semanticPair(scaleToken(accentColor, 2), darkScaleToken(accentColor, 2)),
  subtle: semanticPair(scaleToken(accentColor, 5), darkScaleToken(accentColor, 5)),
  muted: semanticPair(scaleToken(accentColor, 7), darkScaleToken(accentColor, 7)),
  solid: semanticPair(scaleToken(accentColor, 9), darkScaleToken(accentColor, 9)),
  emphasis: semanticPair(scaleToken(accentColor, 10), darkScaleToken(accentColor, 10)),
  fg: semanticPair(scaleToken(accentColor, 12), darkScaleToken(accentColor, 12)),
  contrast: semanticPair(scaleToken('gray', 1), scaleToken('gray', 1)),
})

/** Punchier variant for themes that want status colors to pop: surfaces and muted layers
 *  carry more saturation, but solid/emphasis stay anchored on the canonical brand step. */
export const createVibrantAccentSemanticTokens = (accentColor: AccentColor): TokenGroup => ({
  surface: semanticPair(scaleToken(accentColor, 3), darkScaleToken(accentColor, 3)),
  subtle: semanticPair(scaleToken(accentColor, 5), darkScaleToken(accentColor, 5)),
  muted: semanticPair(scaleToken(accentColor, 8), darkScaleToken(accentColor, 8)),
  solid: semanticPair(scaleToken(accentColor, 9), darkScaleToken(accentColor, 9)),
  emphasis: semanticPair(scaleToken(accentColor, 10), darkScaleToken(accentColor, 10)),
  fg: semanticPair(scaleToken(accentColor, 12), darkScaleToken(accentColor, 12)),
  contrast: semanticPair(scaleToken('gray', 1), scaleToken('gray', 1)),
})

const accentSolidPair = (accentColor: AccentColor) =>
  semanticPair(scaleToken(accentColor, 9), darkScaleToken(accentColor, 9))

const dangerSolidPair = () => semanticPair(scaleToken('red', 9), darkScaleToken('red', 9))

/** Maps semantic `bg.*` to widely-spaced gray steps so stacked surfaces read clearly in both modes. */
export const createSemanticColorTokens = (
  accentColor: AccentColor,
  grayColor: GrayColor,
): TokenGroup => ({
  bg: {
    /** App-level page fill. Slightly tinted so elevated surfaces (`bg.default`) read as raised. */
    canvas: semanticPair(scaleToken(grayColor, 2), darkScaleToken(grayColor, 2)),
    /** Default elevated surface (cards, dialogs, popovers, inputs). */
    default: semanticPair(scaleToken(grayColor, 1), darkScaleToken(grayColor, 1)),
    subtle: semanticPair(scaleToken(grayColor, 3), darkScaleToken(grayColor, 3)),
    muted: semanticPair(scaleToken(grayColor, 6), darkScaleToken(grayColor, 6)),
  },
  fg: {
    default: semanticPair(scaleToken(grayColor, 12), darkScaleToken(grayColor, 12)),
    muted: semanticPair(scaleToken(grayColor, 11), darkScaleToken(grayColor, 11)),
    subtle: semanticPair(scaleToken(grayColor, 10), darkScaleToken(grayColor, 10)),
    inverse: semanticPair(scaleToken(grayColor, 1), scaleToken(grayColor, 12)),
  },
  border: {
    /** Faintest neutral border, used for hairline dividers and separators. */
    muted: semanticPair(scaleToken(grayColor, 4), darkScaleToken(grayColor, 4)),
    /** Default neutral border for surfaces, controls, and form fields. */
    default: semanticPair(scaleToken(grayColor, 7), darkScaleToken(grayColor, 7)),
    /** Stronger neutral border for emphasized outlines and dividers. */
    strong: semanticPair(scaleToken(grayColor, 9), darkScaleToken(grayColor, 9)),
    /** Neutral border on hover, one step stronger than `border.default`. */
    hover: semanticPair(scaleToken(grayColor, 8), darkScaleToken(grayColor, 8)),
    /** Border for focused interactive elements. Aliases the brand accent. */
    focus: accentSolidPair(accentColor),
    /** Border for invalid/error states. Aliases the danger ramp. */
    invalid: dangerSolidPair(),
  },
  accent: createAccentSemanticTokens(accentColor),
  success: createAccentSemanticTokens('emerald'),
  warning: createAccentSemanticTokens('amber'),
  danger: createAccentSemanticTokens('red'),
  info: createAccentSemanticTokens('blue'),
})
