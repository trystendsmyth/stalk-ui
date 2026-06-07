import type { RecipeConfig } from '../types'

// Block quotation with a logical inline-start rule so it mirrors correctly
// under RTL. The rule colour tracks the active `colorPalette` (from the
// component's `tone`), defaulting to a neutral border.
export const blockquote = {
  className: 'stalk-blockquote',
  description: 'Block quotation styles for the Stalk UI Blockquote component.',
  base: {
    borderInlineStartWidth: '2px',
    borderInlineStartStyle: 'solid',
    borderColor: 'border.default',
    color: 'fg.muted',
    margin: 0,
    paddingInlineStart: '16',
  },
  variants: {
    size: {
      sm: { textStyle: 'bodySm', paddingInlineStart: '12' },
      md: { textStyle: 'body', paddingInlineStart: '16' },
      lg: { textStyle: 'bodyLg', paddingInlineStart: '20' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
} satisfies RecipeConfig
