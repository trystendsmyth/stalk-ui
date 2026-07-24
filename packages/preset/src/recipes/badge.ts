import type { RecipeConfig } from '../types'

export const badge = {
  className: 'stalk-badge',
  description: 'Badge styles for compact status and metadata labels.',
  jsx: ['Badge', /^Badge\./],
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
    // Four-step ladder (1.3 rename: old sm→md, old md→lg — the default is
    // unchanged visually). `micro` serves dense-grid micro-chips.
    size: {
      micro: {
        fontSize: '2xs',
        gap: '4',
        minH: '14',
        px: '4',
      },
      sm: {
        fontSize: 'xs',
        gap: '4',
        minH: '18',
        px: '6',
      },
      md: {
        fontSize: 'xs',
        minH: '20',
        px: '8',
      },
      lg: {
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
    size: 'lg',
    variant: 'subtle',
  },
} satisfies RecipeConfig
