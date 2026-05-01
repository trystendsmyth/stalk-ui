import type { RecipeConfig } from '../types'

export const label = {
  className: 'stalk-label',
  description: 'Label styles shared by copied Stalk UI label components.',
  base: {
    color: 'fg.default',
    cursor: 'default',
    fontWeight: 'medium',
    lineHeight: 'tight',
    _disabled: {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
  variants: {
    required: {
      true: {
        _after: {
          color: 'danger.solid',
          content: '" *"',
        },
      },
    },
    size: {
      sm: {
        fontSize: 'xs',
      },
      md: {
        fontSize: 'sm',
      },
      lg: {
        fontSize: 'base',
      },
    },
  },
  defaultVariants: {
    required: false,
    size: 'md',
  },
} satisfies RecipeConfig
