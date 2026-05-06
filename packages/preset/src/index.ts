import { definePreset } from '@pandacss/dev'

import { breakpoints } from './breakpoints'
import { conditions } from './conditions'
import { keyframes } from './keyframes'
import { layerStyles } from './layer-styles'
import * as recipes from './recipes'
import { semanticTokens } from './semantic-tokens'
import * as slotRecipes from './slot-recipes'
import { textStyles } from './text-styles'
import { monochromeTheme, rainbowTheme } from './themes'
import { tokens } from './tokens'
import { utilities } from './utilities'

import type { Preset } from '@pandacss/dev'

const stalkPreset = definePreset({
  name: '@stalk-ui/preset',
  conditions,
  globalCss: {
    /* Resolve through the `sans` token alias so theme overrides
     *  (e.g. `monochrome` → Inter) reach inherited body text, not just components
     *  that opt-in via `fontFamily: 'sans'`. */
    'html, body': {
      fontFamily: 'sans',
    },
    // Reserve the scrollbar gutter so Radix's scroll-lock (Dialog, DropdownMenu,
    // Popover, Select) doesn't shift page content when triggers open.
    html: {
      scrollbarGutter: 'stable',
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
    monochrome: monochromeTheme,
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
    themes: ['monochrome', 'rainbow'],
  },
} as Preset)

export default stalkPreset
