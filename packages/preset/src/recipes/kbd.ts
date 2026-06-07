import type { RecipeConfig } from '../types'

// Keyboard key hint. Reads as a physical key via a raised border-bottom; sized
// in `em` so inline `<Kbd>` keys sit naturally inside a text run.
export const kbd = {
  className: 'stalk-kbd',
  description: 'Keyboard key styles for the Stalk UI Kbd component.',
  base: {
    alignItems: 'center',
    bgColor: 'bg.subtle',
    border: 'default',
    borderColor: 'border.default',
    borderBottomWidth: '2px',
    color: 'fg.muted',
    display: 'inline-flex',
    fontFamily: 'mono',
    fontWeight: 'medium',
    justifyContent: 'center',
    lineHeight: '1',
    rounded: 'sm',
    whiteSpace: 'nowrap',
  },
  variants: {
    size: {
      sm: {
        fontSize: '0.6875em',
        minW: '1.4em',
        paddingInline: '0.35em',
        paddingBlock: '0.2em',
      },
      md: {
        fontSize: '0.8125em',
        minW: '1.6em',
        paddingInline: '0.45em',
        paddingBlock: '0.25em',
      },
      lg: {
        fontSize: '0.9375em',
        minW: '1.8em',
        paddingInline: '0.55em',
        paddingBlock: '0.3em',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
} satisfies RecipeConfig
