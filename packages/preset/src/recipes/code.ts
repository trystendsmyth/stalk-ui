import type { RecipeConfig } from '../types'

// Inline monospace code. Sized in `em` so it tracks the surrounding text run
// rather than locking to an absolute step. Neutral by design — code spans read
// as code, not as a status, so there is no `tone` knob.
export const code = {
  className: 'stalk-code',
  description: 'Inline monospace code styles for the Stalk UI Code component.',
  base: {
    fontFamily: 'mono',
    fontSize: '0.875em',
    // Long tokens (URLs, hashes) wrap instead of overflowing their container.
    whiteSpace: 'break-spaces',
    overflowWrap: 'anywhere',
    paddingInline: '0.4em',
    paddingBlock: '0.1em',
    rounded: 'sm',
  },
  variants: {
    variant: {
      soft: {
        bgColor: 'bg.muted',
        color: 'fg.default',
      },
      outline: {
        border: 'default',
        borderColor: 'border.muted',
        color: 'fg.default',
      },
      ghost: {
        color: 'fg.default',
        paddingInline: 0,
      },
    },
  },
  defaultVariants: {
    variant: 'soft',
  },
} satisfies RecipeConfig
