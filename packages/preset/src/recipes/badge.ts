import type { RecipeConfig } from '../types'

export const badge = {
  className: 'stalk-badge',
  description: 'Badge styles for compact status and metadata labels.',
  base: {
    alignItems: 'center',
    borderRadius: 'full',
    display: 'inline-flex',
    fontWeight: '600',
    gap: '1.5',
    whiteSpace: 'nowrap',
  },
  variants: {
    variant: {
      solid: {
        backgroundColor: 'accent.solid',
        color: 'accent.contrast',
      },
      subtle: {
        backgroundColor: 'accent.subtle',
        color: 'accent.fg',
      },
      outline: {
        borderColor: 'border.default',
        borderWidth: '1px',
        color: 'fg.default',
      },
    },
    size: {
      sm: {
        fontSize: 'xs',
        minHeight: '5',
        paddingInline: '2',
      },
      md: {
        fontSize: 'sm',
        minHeight: '6',
        paddingInline: '2.5',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'subtle',
  },
} satisfies RecipeConfig
