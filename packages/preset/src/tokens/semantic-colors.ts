import type { AccentColor, GrayColor, TokenGroup } from '../types'

const scaleToken = (scale: string, step: number) => `{colors.${scale}.${String(step)}}`
const darkScaleToken = (scale: string, step: number) => `{colors.${scale}Dark.${String(step)}}`

const semanticPair = (light: string, dark: string) => ({
  value: {
    base: light,
    _dark: dark,
  },
})

/** 50/50 sRGB mix — derives accent.emphasis as a true intermediate between solid and fg. */
const midStepMix = (a: string, b: string) => `color-mix(in srgb, ${a} 50%, ${b} 50%)`

/**
 * Palettes too bright at step 11 to pair with white text at WCAG AA. For these, `solid`
 * drops to step 10 and `contrast` inverts to gray.12 — the "caution tape" pattern (bright
 * badge, dark text). Radix calls these light-solid accents.
 */
const LIGHT_SOLID_ACCENTS = new Set<AccentColor>(['amber', 'yellow'])

const isLightSolid = (accentColor: AccentColor) => LIGHT_SOLID_ACCENTS.has(accentColor)

const solidStep = (accentColor: AccentColor) => (isLightSolid(accentColor) ? 10 : 11)

const contrastFor = (accentColor: AccentColor) =>
  isLightSolid(accentColor)
    ? semanticPair(scaleToken('gray', 12), scaleToken('gray', 12))
    : semanticPair(scaleToken('gray', 1), scaleToken('gray', 1))

const emphasisFor = (accentColor: AccentColor) =>
  semanticPair(
    midStepMix(scaleToken(accentColor, 11), scaleToken(accentColor, 12)),
    midStepMix(darkScaleToken(accentColor, 11), darkScaleToken(accentColor, 12)),
  )

/** surface/subtle/muted at steps 2/5/7 (not 2/3/4) so stacked tints read as distinct layers. */
export const createAccentSemanticTokens = (accentColor: AccentColor): TokenGroup => {
  const solid = solidStep(accentColor)
  return {
    surface: semanticPair(scaleToken(accentColor, 2), darkScaleToken(accentColor, 2)),
    subtle: semanticPair(scaleToken(accentColor, 5), darkScaleToken(accentColor, 5)),
    muted: semanticPair(scaleToken(accentColor, 7), darkScaleToken(accentColor, 7)),
    solid: semanticPair(scaleToken(accentColor, solid), darkScaleToken(accentColor, solid)),
    emphasis: emphasisFor(accentColor),
    fg: semanticPair(scaleToken(accentColor, 12), darkScaleToken(accentColor, 12)),
    contrast: contrastFor(accentColor),
  }
}

/** Punchier variant: surface/subtle/muted at 3/5/8 instead of the 2/5/7 canonical spread. */
export const createVibrantAccentSemanticTokens = (accentColor: AccentColor): TokenGroup => {
  const solid = solidStep(accentColor)
  return {
    surface: semanticPair(scaleToken(accentColor, 3), darkScaleToken(accentColor, 3)),
    subtle: semanticPair(scaleToken(accentColor, 5), darkScaleToken(accentColor, 5)),
    muted: semanticPair(scaleToken(accentColor, 8), darkScaleToken(accentColor, 8)),
    solid: semanticPair(scaleToken(accentColor, solid), darkScaleToken(accentColor, solid)),
    emphasis: emphasisFor(accentColor),
    fg: semanticPair(scaleToken(accentColor, 12), darkScaleToken(accentColor, 12)),
    contrast: contrastFor(accentColor),
  }
}

/** Step 9 of the accent / red — used by border.focus / border.invalid as decorative non-text rings. */
const accentSolidPair = (accentColor: AccentColor) =>
  semanticPair(scaleToken(accentColor, 9), darkScaleToken(accentColor, 9))

const dangerSolidPair = () => semanticPair(scaleToken('red', 9), darkScaleToken('red', 9))

export const createSemanticColorTokens = (
  accentColor: AccentColor,
  grayColor: GrayColor,
): TokenGroup => ({
  bg: {
    /** Page fill. One step darker than bg.default so elevated surfaces read as raised. */
    canvas: semanticPair(scaleToken(grayColor, 2), darkScaleToken(grayColor, 2)),
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
    muted: semanticPair(scaleToken(grayColor, 4), darkScaleToken(grayColor, 4)),
    default: semanticPair(scaleToken(grayColor, 7), darkScaleToken(grayColor, 7)),
    strong: semanticPair(scaleToken(grayColor, 9), darkScaleToken(grayColor, 9)),
    hover: semanticPair(scaleToken(grayColor, 8), darkScaleToken(grayColor, 8)),
    focus: accentSolidPair(accentColor),
    invalid: dangerSolidPair(),
  },
  accent: createAccentSemanticTokens(accentColor),
  success: createAccentSemanticTokens('emerald'),
  warning: createAccentSemanticTokens('yellow'),
  danger: createAccentSemanticTokens('red'),
  info: createAccentSemanticTokens('blue'),
  /** Brand accent for promotional / new / beta UI — sits next to status colors but isn't a system state. */
  highlight: createAccentSemanticTokens('orange'),
})
