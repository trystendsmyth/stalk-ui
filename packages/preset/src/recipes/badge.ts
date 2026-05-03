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
        backgroundColor: 'colorPalette.solid',
        color: 'colorPalette.contrast',
      },
      subtle: {
        backgroundColor: 'colorPalette.subtle',
        color: 'colorPalette.fg',
      },
      outline: {
        backgroundColor: 'transparent',
        borderColor: 'colorPalette.muted',
        borderStyle: 'solid',
        borderWidth: 'xs',
        color: 'colorPalette.fg',
      },
    },
    size: {
      sm: {
        fontSize: 'xs',
        minHeight: '20',
        paddingInline: '8',
      },
      md: {
        fontSize: 'sm',
        minHeight: '24',
        paddingInline: '10',
      },
    },
    radius: {
      none: { borderRadius: 'none' },
      sm: { borderRadius: 'sm' },
      md: { borderRadius: 'md' },
      lg: { borderRadius: 'lg' },
      full: { borderRadius: 'full' },
    },
  },
  defaultVariants: {
    radius: 'full',
    size: 'md',
    variant: 'subtle',
  },
} satisfies RecipeConfig
