import type { RecipeConfig } from '../types'

export const select = {
  className: 'stalk-select',
  description: 'Select styles shared by copied Stalk UI select components.',
  base: {
    width: '100%',
    minWidth: '0',
    appearance: 'none',
    borderColor: 'border.default',
    borderRadius: 'md',
    borderWidth: '1px',
    backgroundColor: 'bg.canvas',
    color: 'fg.default',
    cursor: 'pointer',
    outline: 'none',
    transitionDuration: '150ms',
    transitionProperty: 'background-color, border-color, box-shadow',
    _disabled: {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    _focusVisible: {
      borderColor: 'accent.solid',
      boxShadow: '0 0 0 3px {colors.accent.subtle}',
    },
    _invalid: {
      borderColor: 'red.600',
      boxShadow: '0 0 0 3px {colors.red.200}',
    },
  },
  variants: {
    invalid: {
      true: {
        borderColor: 'red.600',
        boxShadow: '0 0 0 3px {colors.red.200}',
      },
    },
    size: {
      sm: {
        fontSize: 'sm',
        minHeight: '8',
        paddingInline: '3',
      },
      md: {
        fontSize: 'sm',
        minHeight: '10',
        paddingInline: '4',
      },
      lg: {
        fontSize: 'md',
        minHeight: '12',
        paddingInline: '5',
      },
    },
  },
  defaultVariants: {
    invalid: false,
    size: 'md',
  },
} satisfies RecipeConfig
