import type { AccentColor, GrayColor, TokenGroup } from '../types'

/**
 * Multi-step data-visualization ramps — sequential (single-hue) and diverging
 * (two-hue with a neutral midpoint). Like every other semantic color these are
 * `{ base, _dark }` pairs over the Radix light/`…Dark` scales, so a ramp inverts
 * with color mode automatically. They reference only scales the preset already
 * ships — no new raw colors — so adding them costs nothing in the palette, and
 * the CSS for a given step is emitted only when a consumer references it.
 *
 * Consumed by the HeatMap primitive and by dependency-free Sparklines; usable by
 * any chart/density surface that needs a perceptual ramp rather than a discrete
 * status tone.
 */

const scaleToken = (scale: string, step: number) => `{colors.${scale}.${String(step)}}`
const darkScaleToken = (scale: string, step: number) => `{colors.${scale}Dark.${String(step)}}`

const semanticPair = (light: string, dark: string) => ({
  value: { base: light, _dark: dark },
})

/** Radix steps walked for a 9-stop sequential ramp: component-bg → border → solid → text. */
const SEQUENTIAL_STEPS = [3, 4, 5, 6, 7, 8, 9, 10, 11] as const

/** Per-side diverging steps (strong → faint), mirrored on each hue toward the midpoint. */
const DIVERGING_STEPS = [11, 9, 7, 5] as const

/**
 * 9-stop single-hue ramp (`scale.sequential.1` … `scale.sequential.9`), faint → strong.
 * Defaults to following the theme accent so it stays on-brand under any theme.
 */
export const createSequentialScaleTokens = (scale: AccentColor | GrayColor): TokenGroup =>
  Object.fromEntries(
    SEQUENTIAL_STEPS.map((step, i) => [
      String(i + 1),
      semanticPair(scaleToken(scale, step), darkScaleToken(scale, step)),
    ]),
  )

/**
 * Two-hue diverging ramp around a configurable midpoint:
 * `scale.diverging.neg.{1..4}` (strong → faint), `scale.diverging.mid`,
 * `scale.diverging.pos.{1..4}` (faint → strong). Use for signed data
 * (over/under, gain/loss) where direction matters. `mid` defaults to a neutral grey
 * (`neutral.6`); pass an accent (e.g. `amber`, `midStep` ~9) for a colored midpoint —
 * a low → mid → high health ramp without a grey middle.
 */
export const createDivergingScaleTokens = (
  neg: AccentColor,
  pos: AccentColor,
  mid: AccentColor | GrayColor = 'neutral',
  midStep = 6,
): TokenGroup => ({
  neg: Object.fromEntries(
    DIVERGING_STEPS.map((step, i) => [
      String(i + 1),
      semanticPair(scaleToken(neg, step), darkScaleToken(neg, step)),
    ]),
  ),
  mid: semanticPair(scaleToken(mid, midStep), darkScaleToken(mid, midStep)),
  pos: Object.fromEntries(
    [...DIVERGING_STEPS]
      .reverse()
      .map((step, i) => [
        String(i + 1),
        semanticPair(scaleToken(pos, step), darkScaleToken(pos, step)),
      ]),
  ),
})

export interface ScaleTokenOptions {
  /** Single-hue ramp source (default: the theme accent). */
  sequential?: AccentColor | GrayColor
  /** `[negative, positive]` hues for the diverging ramp (default: `['red', 'blue']`). */
  diverging?: [AccentColor, AccentColor]
  /** Midpoint hue for the diverging ramp (default: `'neutral'` grey). Pass an accent
   *  (e.g. `'amber'`) for a colored midpoint — a low → mid → high health ramp. */
  divergingMid?: AccentColor | GrayColor
  /** Step for the diverging midpoint (default `6` = neutral; ~`9` for a saturated colored mid). */
  divergingMidStep?: number
  /** Legacy alias for `divergingMid` (a grey midpoint); prefer `divergingMid`. Default: `'neutral'`. */
  gray?: GrayColor
}

/** Build the `scale.*` semantic group (sequential + diverging) from a concise set of options. */
export const createScaleSemanticTokens = ({
  sequential = 'blue',
  diverging = ['red', 'blue'],
  divergingMid,
  divergingMidStep,
  gray = 'neutral',
}: ScaleTokenOptions = {}): TokenGroup => ({
  scale: {
    sequential: createSequentialScaleTokens(sequential),
    diverging: createDivergingScaleTokens(
      diverging[0],
      diverging[1],
      divergingMid ?? gray,
      divergingMidStep ?? 6,
    ),
  },
})
