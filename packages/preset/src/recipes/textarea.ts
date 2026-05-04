import type { RecipeConfig } from '../types'

export const textarea = {
  className: 'stalk-textarea',
  description: 'Textarea styles shared by copied Stalk UI textarea components.',
  base: {
    w: 'full',
    minW: '0',
    border: 'default',
    rounded: 'md',
    bgColor: 'bg.default',
    color: 'fg.default',
    lineHeight: 'normal',
    outline: 'none',
    resize: 'vertical',
    transitionDuration: 'fast',
    transitionProperty: 'background-color, border-color, box-shadow',
    _disabled: {
      cursor: 'not-allowed',
      opacity: 0.5,
      resize: 'none',
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
        minH: '80',
        py: '8',
        px: '12',
      },
      md: {
        fontSize: 'sm',
        minH: '96',
        py: '12',
        px: 'base',
      },
      lg: {
        fontSize: 'base',
        minH: '128',
        py: 'base',
        px: '20',
      },
    },
  },
  defaultVariants: {
    invalid: false,
    size: 'md',
  },
} satisfies RecipeConfig
