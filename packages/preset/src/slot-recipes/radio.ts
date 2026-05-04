import type { RecipeConfig } from '../types'

export const radio = {
  className: 'stalk-radio',
  description: 'Slot recipe for the Stalk UI radio primitive (root + indicator).',
  slots: ['root', 'indicator'],
  base: {
    root: {
      alignItems: 'center',
      bgColor: 'bg.default',
      border: 'default',
      rounded: 'full',
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
      h: 'full',
      justifyContent: 'center',
      pointerEvents: 'none',
      w: 'full',
      _before: {
        bgColor: 'accent.solid',
        rounded: 'full',
        content: '""',
        display: 'block',
      },
    },
  },
  variants: {
    size: {
      sm: {
        root: { h: '14', w: '14' },
        indicator: { _before: { h: '6', w: '6' } },
      },
      md: {
        root: { h: 'base', w: 'base' },
        indicator: { _before: { h: '8', w: '8' } },
      },
      lg: {
        root: { h: '20', w: '20' },
        indicator: { _before: { h: '10', w: '10' } },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
} satisfies RecipeConfig
