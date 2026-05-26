import type { RecipeConfig } from '../types'

export const slider = {
  className: 'stalk-slider',
  description: 'Slot recipe for the Stalk UI slider (root + track + range + thumb).',
  slots: ['root', 'track', 'range', 'thumb'],
  base: {
    root: {
      alignItems: 'center',
      display: 'flex',
      pos: 'relative',
      touchAction: 'none',
      userSelect: 'none',
      '&[data-orientation="horizontal"]': {
        h: '20',
        w: 'full',
      },
      '&[data-orientation="vertical"]': {
        flexDirection: 'column',
        h: 'full',
        w: '20',
      },
      _disabled: {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
    track: {
      bgColor: 'bg.subtle',
      flexGrow: 1,
      pos: 'relative',
      rounded: 'full',
      '&[data-orientation="horizontal"]': {
        h: '6',
        w: 'full',
      },
      '&[data-orientation="vertical"]': {
        h: 'full',
        w: '6',
      },
    },
    range: {
      bgColor: 'accent.solid',
      pos: 'absolute',
      rounded: 'full',
      '&[data-orientation="horizontal"]': {
        h: 'full',
      },
      '&[data-orientation="vertical"]': {
        w: 'full',
      },
    },
    thumb: {
      bgColor: 'bg.default',
      border: '2px solid',
      borderColor: 'accent.solid',
      cursor: 'pointer',
      display: 'block',
      h: '16',
      rounded: 'full',
      transitionDuration: 'fast',
      transitionProperty: 'border-color, box-shadow, transform',
      w: '16',
      _hover: {
        borderColor: 'accent.fg',
      },
      _focusVisible: {
        focusRingWidth: 'base',
        focusRingColor: 'accent.subtle',
        focusRingOffsetWidth: '1',
        focusRingOffsetColor: 'bg.default',
      },
      _disabled: {
        cursor: 'not-allowed',
      },
    },
  },
} satisfies RecipeConfig
