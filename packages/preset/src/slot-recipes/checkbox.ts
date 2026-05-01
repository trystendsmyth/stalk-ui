import type { RecipeConfig } from '../types'

export const checkbox = {
  className: 'stalk-checkbox',
  description: 'Slot recipe for the Stalk UI checkbox primitive (root + indicator).',
  slots: ['root', 'indicator'],
  base: {
    root: {
      alignItems: 'center',
      backgroundColor: 'bg.default',
      border: 'default',
      borderRadius: 'sm',
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
        backgroundColor: 'accent.solid',
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
        root: { height: '14', width: '14' },
      },
      md: {
        root: { height: 'base', width: 'base' },
      },
      lg: {
        root: { height: '20', width: '20' },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
} satisfies RecipeConfig
