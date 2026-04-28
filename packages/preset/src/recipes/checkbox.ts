import type { RecipeConfig } from '../types'

export const checkbox = {
  className: 'stalk-checkbox',
  description: 'Checkbox styles shared by copied Stalk UI checkbox components.',
  base: {
    width: '4',
    height: '4',
    flexShrink: 0,
    borderColor: 'border.default',
    borderRadius: 'sm',
    borderWidth: '1px',
    accentColor: 'accent.solid',
    cursor: 'pointer',
    outline: 'none',
    transitionDuration: '150ms',
    transitionProperty: 'background-color, border-color, box-shadow',
    _disabled: {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    _focusVisible: {
      focusRingWidth: 'base',
      focusRingColor: 'accent.subtle',
      focusRingOffsetWidth: '1',
      focusRingOffsetColor: 'bg.default',
    },
    _invalid: {
      borderColor: 'danger.solid',
      focusRingWidth: 'base',
      focusRingColor: 'danger.subtle',
      focusRingOffsetWidth: '1',
      focusRingOffsetColor: 'bg.default',
    },
  },
  variants: {
    invalid: {
      true: {
        borderColor: 'danger.solid',
        focusRingWidth: 'base',
        focusRingColor: 'danger.subtle',
        focusRingOffsetWidth: '1',
        focusRingOffsetColor: 'bg.default',
      },
    },
    size: {
      sm: {
        width: '3.5',
        height: '3.5',
      },
      md: {
        width: '4',
        height: '4',
      },
      lg: {
        width: '5',
        height: '5',
      },
    },
  },
  defaultVariants: {
    invalid: false,
    size: 'md',
  },
} satisfies RecipeConfig
