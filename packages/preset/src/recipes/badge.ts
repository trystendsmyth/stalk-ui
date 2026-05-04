import type { RecipeConfig } from '../types'

export const badge = {
  className: 'stalk-badge',
  description: 'Badge styles for compact status and metadata labels.',
  base: {
    alignItems: 'center',
    colorPalette: 'accent',
    display: 'inline-flex',
    fontWeight: 'semibold',
    gap: '6',
    whiteSpace: 'nowrap',
  },
  variants: {
    variant: {
      solid: {
        bgColor: 'colorPalette.solid',
        color: 'colorPalette.contrast',
      },
      subtle: {
        bgColor: 'colorPalette.subtle',
        color: 'colorPalette.fg',
      },
      outline: {
        bgColor: 'transparent',
        border: 'default',
        borderColor: 'colorPalette.muted',
        color: 'colorPalette.fg',
      },
    },
    size: {
      sm: {
        fontSize: 'xs',
        minH: '20',
        px: '8',
      },
      md: {
        fontSize: 'sm',
        minH: '24',
        px: '10',
      },
    },
    radius: {
      none: { rounded: 'none' },
      sm: { rounded: 'sm' },
      md: { rounded: 'md' },
      lg: { rounded: 'lg' },
      full: { rounded: 'full' },
    },
  },
  defaultVariants: {
    radius: 'full',
    size: 'md',
    variant: 'subtle',
  },
} satisfies RecipeConfig
