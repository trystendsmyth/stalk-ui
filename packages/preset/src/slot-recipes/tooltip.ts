import type { RecipeConfig } from '../types'

export const tooltip = {
  className: 'stalk-tooltip',
  description: 'Slot recipe for Radix-backed tooltips.',
  slots: ['content', 'arrow'],
  base: {
    content: {
      maxWidth: '18rem',
      backgroundColor: 'fg.default',
      borderRadius: 'md',
      color: 'bg.default',
      fontSize: 'xs',
      lineHeight: '1.5',
      paddingBlock: '1.5',
      paddingInline: '2',
      zIndex: 'tooltip',
    },
    arrow: {
      fill: 'fg.default',
    },
  },
} satisfies RecipeConfig
