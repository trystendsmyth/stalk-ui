import type { RecipeConfig } from '../types'

export const skeleton = {
  className: 'stalk-skeleton',
  description: 'Skeleton placeholder used while content is loading.',
  base: {
    bgColor: 'bg.subtle',
    display: 'block',
    rounded: 'md',
    animation: 'pulse',
    animationDuration: '1.6s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
    '@media (prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
  variants: {
    radius: {
      none: { rounded: 'none' },
      sm: { rounded: 'sm' },
      md: { rounded: 'md' },
      lg: { rounded: 'lg' },
      full: { rounded: 'full' },
    },
  },
  defaultVariants: {
    radius: 'md',
  },
} satisfies RecipeConfig
