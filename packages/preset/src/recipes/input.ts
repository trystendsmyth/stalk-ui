import type { RecipeConfig } from '../types'

export const input = {
  className: 'stalk-input',
  description: 'Input styles shared by copied Stalk UI input components.',
  base: {
    width: '100%',
    borderColor: 'border.default',
    borderRadius: 'md',
    borderWidth: '1px',
    backgroundColor: 'bg.canvas',
    color: 'fg.default',
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
      borderColor: 'danger.solid',
      boxShadow: '0 0 0 3px {colors.danger.subtle}',
    },
    _placeholder: {
      color: 'fg.muted',
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
