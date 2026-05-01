import type { RecipeConfig } from '../types'

export const radio = {
  className: 'stalk-radio',
  description: 'Slot recipe for the Stalk UI radio primitive (root + indicator).',
  slots: ['root', 'indicator'],
  base: {
    root: {
      alignItems: 'center',
      backgroundColor: 'bg.default',
      border: 'default',
      borderRadius: 'full',
      cursor: 'pointer',
      display: 'inline-flex',
      flexShrink: 0,
      justifyContent: 'center',
      outline: 'none',
      transitionDuration: 'fast',
      transitionProperty: 'background-color, border-color, box-shadow',
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
      '&[data-state="checked"]': {
        borderColor: 'accent.solid',
      },
      '&[data-invalid], &[aria-invalid="true"]': {
        border: 'invalid',
        focusRingColor: 'danger.subtle',
      },
    },
    indicator: {
      alignItems: 'center',
      display: 'inline-flex',
      height: 'full',
      justifyContent: 'center',
      pointerEvents: 'none',
      width: 'full',
      _before: {
        backgroundColor: 'accent.solid',
        borderRadius: 'full',
        content: '""',
        display: 'block',
      },
    },
  },
  variants: {
    size: {
      sm: {
        root: { height: '14', width: '14' },
        indicator: { _before: { height: '6', width: '6' } },
      },
      md: {
        root: { height: 'base', width: 'base' },
        indicator: { _before: { height: '8', width: '8' } },
      },
      lg: {
        root: { height: '20', width: '20' },
        indicator: { _before: { height: '10', width: '10' } },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
} satisfies RecipeConfig
