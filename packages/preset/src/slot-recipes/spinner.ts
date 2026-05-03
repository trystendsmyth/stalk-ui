import type { RecipeConfig } from '../types'

export const spinner = {
  className: 'stalk-spinner',
  description: 'Slot recipe for the Stalk UI spinner (root wrapper, track ring, indicator arc).',
  slots: ['root', 'track', 'indicator'],
  base: {
    root: {
      alignItems: 'center',
      color: 'currentColor',
      display: 'inline-flex',
      flexShrink: 0,
      justifyContent: 'center',
      lineHeight: 'none',
    },
    track: {
      opacity: 0.2,
    },
    indicator: {
      animation: 'spin',
      transformOrigin: 'center',
      // Honor user motion preferences. Static arc still indicates loading via role+label.
      '@media (prefers-reduced-motion: reduce)': {
        animation: 'none',
      },
    },
  },
  variants: {
    size: {
      sm: {},
      md: {},
      lg: {},
      xl: {},
    },
  },
  defaultVariants: {
    size: 'md',
  },
} satisfies RecipeConfig
