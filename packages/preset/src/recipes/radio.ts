import type { RecipeConfig } from '../types'

export const radio = {
  className: 'stalk-radio',
  description: 'Radio styles shared by copied Stalk UI radio components.',
  base: {
    width: '4',
    height: '4',
    flexShrink: 0,
    borderColor: 'border.default',
    borderRadius: 'full',
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
      boxShadow: '0 0 0 3px {colors.accent.subtle}',
    },
    _invalid: {
      borderColor: 'danger.solid',
      boxShadow: '0 0 0 3px {colors.danger.subtle}',
    },
  },
  variants: {
    invalid: {
      true: {
        borderColor: 'danger.solid',
        boxShadow: '0 0 0 3px {colors.danger.subtle}',
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
