import type { RecipeConfig } from '../types'

export const button = {
  className: 'stalk-button',
  description: 'Button styles shared by copied Stalk UI button components.',
  base: {
    alignItems: 'center',
    borderRadius: 'md',
    cursor: 'pointer',
    display: 'inline-flex',
    fontWeight: '600',
    gap: '2',
    justifyContent: 'center',
    outline: 'none',
    transitionDuration: '150ms',
    transitionProperty: 'background-color, border-color, color, box-shadow',
    _disabled: {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    _focusVisible: {
      boxShadow: '0 0 0 3px {colors.accent.subtle}',
    },
  },
  variants: {
    variant: {
      solid: {
        backgroundColor: 'accent.solid',
        color: 'accent.contrast',
        _hover: { backgroundColor: 'accent.emphasis' },
      },
      outline: {
        borderColor: 'border.default',
        borderWidth: '1px',
        color: 'fg.default',
        _hover: { backgroundColor: 'bg.muted' },
      },
      ghost: {
        color: 'fg.default',
        _hover: { backgroundColor: 'bg.muted' },
      },
      subtle: {
        backgroundColor: 'accent.subtle',
        color: 'accent.fg',
        _hover: { backgroundColor: 'accent.muted' },
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
    size: 'md',
    variant: 'solid',
  },
} satisfies RecipeConfig
