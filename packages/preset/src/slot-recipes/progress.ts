import type { RecipeConfig } from '../types'

export const progress = {
  className: 'stalk-progress',
  jsx: ['Progress', /^Progress\./],
  description:
    'Slot recipe for the Stalk UI progress bar (linear track + indicator, circular gauge).',
  slots: ['root', 'indicator', 'circle', 'circleTrack', 'circleRange', 'valueText'],
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
    // Circular gauge parts. The svg uses a fixed 100-unit viewBox, so stroke
    // widths and the value read-out scale with the rendered size.
    circle: { display: 'block' },
    circleTrack: {
      fill: 'none',
      stroke: 'bg.subtle',
    },
    circleRange: {
      fill: 'none',
      stroke: 'accent.solid',
      strokeLinecap: 'round',
      // Start the arc at 12 o'clock; origin is the viewBox center in user units.
      transform: 'rotate(-90deg)',
      transformOrigin: '50px 50px',
      transitionDuration: 'normal',
      transitionProperty: 'stroke-dashoffset',
      transitionTimingFunction: 'ease-out',
    },
    valueText: {
      fill: 'fg.default',
      // viewBox units (not document px): ~22% of the gauge diameter.
      fontSize: '22px',
      fontWeight: 'semibold',
    },
  },
  variants: {
    shape: {
      linear: {},
      circular: {
        root: {
          bgColor: 'transparent',
          display: 'inline-block',
          overflow: 'visible',
          rounded: 'none',
          w: 'auto',
        },
      },
    },
    size: {
      sm: { root: { h: '8' }, circle: { h: '40', w: '40' } },
      md: { root: { h: '12' }, circle: { h: '64', w: '64' } },
      lg: { root: { h: '16' }, circle: { h: '96', w: '96' } },
    },
  },
  // The linear sizes drive track height; a circular root is sized by its svg.
  compoundVariants: [
    { shape: 'circular', size: 'sm', css: { root: { h: 'auto' } } },
    { shape: 'circular', size: 'md', css: { root: { h: 'auto' } } },
    { shape: 'circular', size: 'lg', css: { root: { h: 'auto' } } },
  ],
  defaultVariants: {
    shape: 'linear',
    size: 'md',
  },
} satisfies RecipeConfig
