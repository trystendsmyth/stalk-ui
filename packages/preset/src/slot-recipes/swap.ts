import type { RecipeConfig } from '../types'

export const swap = {
  className: 'stalk-swap',
  jsx: ['Swap', /^Swap\./],
  description:
    'Slot recipe for Swap (two elements stacked in one grid cell; the active one shows with a fade/rotate/flip transition).',
  slots: ['root', 'indicator'],
  base: {
    root: {
      display: 'inline-grid',
      placeItems: 'center',
      verticalAlign: 'middle',
    },
    indicator: {
      alignItems: 'center',
      display: 'inline-flex',
      gridArea: '1 / 1',
      justifyContent: 'center',
      transitionDuration: 'normal',
      transitionTimingFunction: 'ease-out',
      '&[data-state="closed"]': {
        pointerEvents: 'none',
      },
    },
  },
  variants: {
    effect: {
      fade: {
        indicator: {
          transitionProperty: 'opacity',
          '&[data-state="closed"]': { opacity: 0 },
        },
      },
      rotate: {
        indicator: {
          transitionProperty: 'opacity, transform',
          '&[data-state="closed"]': { opacity: 0, transform: 'rotate(-90deg) scale(0.4)' },
        },
      },
      scale: {
        indicator: {
          transitionProperty: 'opacity, transform',
          '&[data-state="closed"]': { opacity: 0, transform: 'scale(0)' },
        },
      },
      flip: {
        indicator: {
          backfaceVisibility: 'hidden',
          transitionProperty: 'opacity, transform',
          '&[data-state="closed"]': { opacity: 0, transform: 'rotateY(180deg)' },
        },
      },
    },
  },
  defaultVariants: {
    effect: 'fade',
  },
} satisfies RecipeConfig
