import { createAccentSemanticTokens } from './semantic-colors'

import type { AccentColor, TokenGroup } from '../types'

export const createAccentTheme = (accentColor: AccentColor) => ({
  semanticTokens: {
    colors: {
      accent: createAccentSemanticTokens(accentColor),
    } satisfies TokenGroup,
  },
})

export const blueTheme = createAccentTheme('blue')
export const violetTheme = createAccentTheme('violet')
export const tealTheme = createAccentTheme('teal')
export const emeraldTheme = createAccentTheme('emerald')
export const amberTheme = createAccentTheme('amber')
export const yellowTheme = createAccentTheme('yellow')
export const orangeTheme = createAccentTheme('orange')
export const redTheme = createAccentTheme('red')
