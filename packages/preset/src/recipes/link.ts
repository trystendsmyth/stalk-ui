import type { RecipeConfig } from '../types'

// Anchor styling driven by the active `colorPalette` (set from the component's
// `tone`). The `underline` variant controls decoration so prose links and
// chrome links can share one component. Colour resolves through the palette so
// the focus ring and hover state stay in theme across light/dark.
export const link = {
  className: 'stalk-link',
  description: 'Anchor styles for the Stalk UI Link component.',
  base: {
    color: 'colorPalette.solid',
    colorPalette: 'accent',
    cursor: 'pointer',
    rounded: 'sm',
    textUnderlineOffset: '2px',
    transitionDuration: 'fast',
    transitionProperty: 'color, text-decoration-color',
    _hover: { color: 'colorPalette.emphasis' },
    _focusVisible: {
      focusRingWidth: 'base',
      focusRingColor: 'colorPalette.muted',
      focusRingOffsetWidth: '2',
      focusRingOffsetColor: 'bg.default',
    },
  },
  variants: {
    underline: {
      none: { textDecorationLine: 'none' },
      hover: {
        textDecorationLine: 'none',
        _hover: { textDecorationLine: 'underline' },
        // Monochrome can't tint a link a different hue, so its default links would
        // be indistinguishable from body text — carry a resting underline there.
        '[data-panda-theme=monochrome] &': { textDecorationLine: 'underline' },
      },
      always: { textDecorationLine: 'underline' },
    },
  },
  defaultVariants: {
    underline: 'hover',
  },
} satisfies RecipeConfig
