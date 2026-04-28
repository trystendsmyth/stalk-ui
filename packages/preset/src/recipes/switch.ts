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
    invalid: false,
    size: 'md',
  },
} satisfies RecipeConfig
