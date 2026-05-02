import { definePreset } from '@pandacss/dev'

import { breakpoints } from './breakpoints'
import { conditions } from './conditions'
import { keyframes } from './keyframes'
import { layerStyles } from './layer-styles'
import * as recipes from './recipes'
import { semanticTokens } from './semantic-tokens'
import * as slotRecipes from './slot-recipes'
import { textStyles } from './text-styles'
import { rainbowTheme } from './themes'
import { FONT_SANS_STACK, tokens } from './tokens'
import { utilities } from './utilities'

import type { Preset } from '@pandacss/dev'

const stalkPreset = definePreset({
  name: '@stalk-ui/preset',
  conditions,
  globalCss: {
    'html, body': {
      fontFamily: FONT_SANS_STACK,
    },
  },
  utilities,
  theme: {
    breakpoints,
    keyframes,
    layerStyles,
    recipes,
    semanticTokens,
    slotRecipes,
    textStyles,
    tokens,
  },
  themes: {
    rainbow: rainbowTheme,
  },
  staticCss: {
    css: [
      {
        properties: {
          colorPalette: ['accent', 'success', 'warning', 'danger', 'info', 'highlight'],
        },
      },
    ],
    recipes: '*',
    themes: ['rainbow'],
  },
} as Preset)

export {
  ACCENT_COLORS,
  BACKGROUND_COLORS,
  BORDER_COLORS,
  FOREGROUND_COLORS,
  HIGHLIGHT_COLORS,
  SEMANTIC_COLOR_TOKENS,
  STATUS_COLORS,
} from './helpers/token-options'

export default stalkPreset
