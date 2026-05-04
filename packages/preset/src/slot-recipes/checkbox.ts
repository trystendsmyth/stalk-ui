import type { RecipeConfig } from '../types'

export const checkbox = {
  className: 'stalk-checkbox',
  description: 'Slot recipe for the Stalk UI checkbox primitive (root + indicator).',
  slots: ['root', 'indicator'],
  base: {
    root: {
      alignItems: 'center',
      bgColor: 'bg.default',
      border: 'default',
      rounded: 'sm',
      color: 'accent.contrast',
      cursor: 'pointer',
      display: 'inline-flex',
      flexShrink: 0,
      justifyContent: 'center',
      outline: 'none',
      transitionDuration: 'fast',
      transitionProperty: 'background-color, border-color, box-shadow, color',
      _hover: {
        border: 'hover',
      },
      _focusVisible: {
        focusRingWidth: 'base',
        focusRingColor: 'accent.subtle',
        focusRingOffsetWidth: '1',
        focusRingOffsetColor: 'bg.default',
      },
      _disabled: {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
      '&[data-state="checked"], &[data-state="indeterminate"]': {
        bgColor: 'accent.solid',
        borderColor: 'accent.solid',
      },
      '&[data-invalid], &[aria-invalid="true"]': {
        border: 'invalid',
        focusRingColor: 'danger.subtle',
      },
    },
    indicator: {
      alignItems: 'center',
      color: 'currentColor',
      display: 'inline-flex',
      justifyContent: 'center',
      pointerEvents: 'none',
    },
  },
  variants: {
    size: {
      sm: {
        root: { h: '14', w: '14' },
      },
      md: {
        root: { h: 'base', w: 'base' },
      },
      lg: {
        root: { h: '20', w: '20' },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
} satisfies RecipeConfig
