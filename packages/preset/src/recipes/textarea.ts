import type { RecipeConfig } from '../types'

export const textarea = {
  className: 'stalk-textarea',
  description: 'Textarea styles shared by copied Stalk UI textarea components.',
  base: {
    width: '100%',
    minWidth: '0',
    borderColor: 'border.default',
    borderRadius: 'md',
    borderWidth: '1px',
    backgroundColor: 'bg.canvas',
    color: 'fg.default',
    lineHeight: '1.5',
    outline: 'none',
    resize: 'vertical',
    transitionDuration: '150ms',
    transitionProperty: 'background-color, border-color, box-shadow',
    _disabled: {
      cursor: 'not-allowed',
      opacity: 0.5,
      resize: 'none',
    },
    _focusVisible: {
      borderColor: 'accent.solid',
      boxShadow: '0 0 0 3px {colors.accent.subtle}',
    },
    _invalid: {
      borderColor: 'red.600',
      boxShadow: '0 0 0 3px {colors.red.200}',
    },
    _placeholder: {
      color: 'fg.muted',
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
        minHeight: '20',
        paddingBlock: '2',
        paddingInline: '3',
      },
      md: {
        fontSize: 'sm',
        minHeight: '24',
        paddingBlock: '3',
        paddingInline: '4',
      },
      lg: {
        fontSize: 'md',
        minHeight: '32',
        paddingBlock: '4',
        paddingInline: '5',
      },
    },
  },
  defaultVariants: {
    invalid: false,
    size: 'md',
  },
} satisfies RecipeConfig
