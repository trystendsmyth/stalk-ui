import type { RecipeConfig } from '../types'

export const progress = {
  className: 'stalk-progress',
  description: 'Slot recipe for the Stalk UI progress bar (root track + indicator).',
  slots: ['root', 'indicator'],
  base: {
    root: {
      bgColor: 'bg.subtle',
      display: 'block',
      overflow: 'hidden',
      pos: 'relative',
      rounded: 'full',
      w: 'full',
    },
    indicator: {
      bgColor: 'accent.solid',
      blockSize: 'full',
      display: 'block',
      transitionDuration: 'normal',
      transitionProperty: 'inline-size',
      transitionTimingFunction: 'ease-out',
    },
  },
  variants: {
    size: {
      sm: { root: { h: '8' } },
      md: { root: { h: '12' } },
      lg: { root: { h: '16' } },
    },
  },
  defaultVariants: {
    size: 'md',
  },
} satisfies RecipeConfig
