import { defineTheme } from '../define-theme'

import type { StalkTheme } from '../define-theme'

/**
 * Curated named palettes (roadmap E3): one-option accent/gray pairings built
 * with `defineTheme`, registered in the preset's `themes` map so any of them is
 * one config line away:
 *
 * ```ts
 * // panda.config.ts — generate the CSS for the palettes you use:
 * staticCss: { themes: ['emerald'] }
 * // then apply: <html data-panda-theme="emerald">
 * ```
 *
 * Unlike `monochrome`/`rainbow` (full identities), palettes only re-hue the
 * accent + neutral surface; status colors keep their defaults. Gray pairings
 * follow the Radix temperature groupings: slate for the blue/teal family,
 * mauve for the red/violet family, neutral/gray for the warm and green scales.
 */
export const paletteThemes: Record<string, StalkTheme> = {
  blue: defineTheme({ accent: 'blue', gray: 'slate' }),
  violet: defineTheme({ accent: 'violet', gray: 'mauve' }),
  teal: defineTheme({ accent: 'teal', gray: 'slate' }),
  emerald: defineTheme({ accent: 'emerald', gray: 'neutral' }),
  amber: defineTheme({ accent: 'amber', gray: 'neutral' }),
  yellow: defineTheme({ accent: 'yellow', gray: 'neutral' }),
  orange: defineTheme({ accent: 'orange', gray: 'gray' }),
  red: defineTheme({ accent: 'red', gray: 'mauve' }),
}

export const paletteThemeNames = /* @__PURE__ */ Object.keys(paletteThemes)
