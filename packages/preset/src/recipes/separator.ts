import type { RecipeConfig } from '../types'

export const separator = {
  className: 'stalk-separator',
  description: 'Thin dividing line between content, horizontal or vertical.',
  base: {
    flexShrink: 0,
    bgColor: 'border.default',
    border: 'none',
  },
  variants: {
    // Logical sizing keeps the rule RTL-safe; `data-orientation` from Radix is
    // mirrored by this variant so styling stays in the recipe layer.
    orientation: {
      horizontal: { blockSize: 'px', inlineSize: 'full' },
      vertical: { inlineSize: 'px', blockSize: 'full', alignSelf: 'stretch' },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
} satisfies RecipeConfig
