import type { RecipeConfig } from '../types'

export const switchRecipe = {
  className: 'stalk-switch',
  description: 'Switch styles shared by copied Stalk UI switch components.',
  base: {
    position: 'relative',
    width: '9',
    height: '5',
    flexShrink: 0,
    appearance: 'none',
    borderColor: 'transparent',
    borderRadius: 'full',
    borderWidth: '1px',
    backgroundColor: 'border.default',
    cursor: 'pointer',
    outline: 'none',
    transitionDuration: '150ms',
    transitionProperty: 'background-color, border-color, box-shadow',
    _checked: {
      backgroundColor: 'accent.solid',
    },
    _disabled: {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    _focusVisible: {
      boxShadow: '0 0 0 3px {colors.accent.subtle}',
    },
    _invalid: {
      borderColor: 'red.600',
      boxShadow: '0 0 0 3px {colors.red.200}',
    },
  },
  variants: {
    size: {
      sm: {
        width: '8',
        height: '4',
      },
      md: {
        width: '9',
        height: '5',
      },
      lg: {
        width: '11',
        height: '6',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
} satisfies RecipeConfig
