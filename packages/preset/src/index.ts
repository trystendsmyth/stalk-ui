import { definePreset } from '@pandacss/dev'
import presetBase from '@pandacss/preset-base'

import { breakpoints } from './breakpoints'
import { conditions } from './conditions'
import { keyframes } from './keyframes'
import * as recipes from './recipes'
import { semanticTokens } from './semantic-tokens'
import * as slotRecipes from './slot-recipes'
import { rainbowTheme } from './themes'
import { tokens } from './tokens'
import { utilities } from './utilities'

import type { Preset } from '@pandacss/dev'

const stalkPreset = definePreset({
  name: '@stalk-ui/preset',
  presets: [presetBase],
  conditions,
  utilities,
  theme: {
    breakpoints,
    keyframes,
    recipes,
    semanticTokens,
    slotRecipes,
    tokens,
  },
  themes: {
    rainbow: rainbowTheme,
  },
  staticCss: {
    themes: ['rainbow'],
  },
} as Preset)

export {
  ACCENT_COLORS,
  BACKGROUND_COLORS,
  BORDER_COLORS,
  FOREGROUND_COLORS,
  SEMANTIC_COLOR_TOKENS,
  STATUS_COLORS,
} from './helpers/token-options'

export default stalkPreset
