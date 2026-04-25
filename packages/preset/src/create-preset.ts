import {
  badge,
  button,
  checkbox,
  input,
  label,
  radio,
  select,
  switchRecipe,
  textarea,
} from './recipes'
import { card, dialog, dropdownMenu, tooltip } from './slot-recipes'
import {
  createAccentTheme,
  createRadiusTokens,
  createSemanticColorTokens,
  primitiveColorTokens,
} from './tokens'

import type { AccentColor, CreatePresetOptions, GrayColor, StalkPreset } from './types'

const defaultAccentColor = 'blue' satisfies AccentColor
const defaultGrayColor = 'neutral' satisfies GrayColor

export const createPreset = ({
  accentColor = defaultAccentColor,
  grayColor = defaultGrayColor,
  borderRadius = 'md',
  additionalThemes = [],
}: CreatePresetOptions = {}): StalkPreset => {
  const themes = Object.fromEntries(
    additionalThemes
      .filter((themeName) => themeName !== accentColor)
      .map((themeName) => [themeName, createAccentTheme(themeName)]),
  )

  return {
    name: '@stalk-ui/preset',
    theme: {
      tokens: {
        colors: primitiveColorTokens,
        radii: createRadiusTokens(borderRadius),
      },
      semanticTokens: {
        colors: createSemanticColorTokens(accentColor, grayColor),
      },
      recipes: {
        badge,
        button,
        checkbox,
        input,
        label,
        radio,
        select,
        switch: switchRecipe,
        textarea,
      },
      slotRecipes: {
        card,
        dialog,
        dropdownMenu,
        tooltip,
      },
    },
    themes,
  }
}
