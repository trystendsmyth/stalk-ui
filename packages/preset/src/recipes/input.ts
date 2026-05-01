import type { RecipeConfig } from '../types'

export const input = {
  className: 'stalk-input',
  description: 'Input styles shared by copied Stalk UI input components.',
  base: {
    width: 'full',
    border: 'default',
    borderRadius: 'md',
    backgroundColor: 'bg.default',
    color: 'fg.default',
    outline: 'none',
    transitionDuration: 'fast',
    transitionProperty: 'background-color, border-color, box-shadow',
    _disabled: {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    _hover: {
      border: 'hover',
    },
    _focusVisible: {
      border: 'focus',
      focusRingWidth: 'base',
      focusRingColor: 'accent.subtle',
      focusRingOffsetWidth: '1',
      focusRingOffsetColor: 'bg.default',
    },
    _invalid: {
      border: 'invalid',
      focusRingWidth: 'base',
      focusRingColor: 'danger.subtle',
      focusRingOffsetWidth: '1',
      focusRingOffsetColor: 'bg.default',
    },
    _placeholder: {
      color: 'fg.muted',
    },
  },
  variants: {
    invalid: {
      true: {
        border: 'invalid',
        focusRingWidth: 'base',
        focusRingColor: 'danger.subtle',
        focusRingOffsetWidth: '1',
        focusRingOffsetColor: 'bg.default',
      },
    },
    size: {
      sm: {
        fontSize: 'sm',
        minHeight: '32',
        paddingInline: '12',
      },
      md: {
        fontSize: 'sm',
        minHeight: '40',
        paddingInline: 'base',
      },
      lg: {
        fontSize: 'base',
        minHeight: '48',
        paddingInline: '20',
      },
    },
  },
  defaultVariants: {
    invalid: false,
    size: 'md',
  },
} satisfies RecipeConfig
