import type { RecipeConfig } from '../types'

export const label = {
  className: 'stalk-label',
  description: 'Label styles shared by copied Stalk UI label components.',
  base: {
    color: 'fg.default',
    cursor: 'default',
    fontWeight: 'medium',
    lineHeight: '1.25',
    _disabled: {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
  variants: {
    required: {
      true: {
        _after: {
          color: 'red.600',
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
        fontSize: 'md',
      },
    },
  },
  defaultVariants: {
    required: false,
    size: 'md',
  },
} satisfies RecipeConfig
