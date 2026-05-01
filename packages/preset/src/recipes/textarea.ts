import type { RecipeConfig } from '../types'

export const textarea = {
  className: 'stalk-textarea',
  description: 'Textarea styles shared by copied Stalk UI textarea components.',
  base: {
    width: 'full',
    minWidth: '0',
    border: 'default',
    borderRadius: 'md',
    backgroundColor: 'bg.default',
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
        minHeight: '80',
        paddingBlock: '8',
        paddingInline: '12',
      },
      md: {
        fontSize: 'sm',
        minHeight: '96',
        paddingBlock: '12',
        paddingInline: 'base',
      },
      lg: {
        fontSize: 'base',
        minHeight: '128',
        paddingBlock: 'base',
        paddingInline: '20',
      },
    },
  },
  defaultVariants: {
    invalid: false,
    size: 'md',
  },
} satisfies RecipeConfig
