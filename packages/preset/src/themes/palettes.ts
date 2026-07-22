import { defineTheme } from '../define-theme'

import type { StalkTheme } from '../define-theme'

/**
 * Curated accent/gray palettes (roadmap E3), registered in the preset `themes`
 * map. CSS is opt-in: list in `staticCss.themes`, apply via `data-panda-theme`.
 * Only accent + neutrals re-hue (status colors keep defaults); gray pairings
 * follow the Radix temperature groups.
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
