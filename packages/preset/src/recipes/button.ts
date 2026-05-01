import type { RecipeConfig } from '../types'

export const button = {
  className: 'stalk-button',
  description: 'Button styles shared by copied Stalk UI button components.',
  base: {
    alignItems: 'center',
    borderRadius: 'md',
    cursor: 'pointer',
    display: 'inline-flex',
    fontWeight: 'semibold',
    gap: '8',
    justifyContent: 'center',
    outline: 'none',
    transitionDuration: 'fast',
    transitionProperty: 'background-color, border-color, color, box-shadow',
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
  },
  variants: {
    variant: {
      solid: {
        backgroundColor: 'accent.solid',
        color: 'accent.contrast',
        _hover: { backgroundColor: 'accent.emphasis' },
      },
      outline: {
        border: 'default',
        color: 'fg.default',
        _hover: {
          backgroundColor: 'bg.subtle',
          border: 'hover',
        },
      },
      ghost: {
        color: 'fg.default',
        _hover: { backgroundColor: 'bg.subtle' },
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
    size: 'md',
    variant: 'solid',
  },
} satisfies RecipeConfig
