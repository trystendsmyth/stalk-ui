import type { RecipeConfig } from '../types'

export const tooltip = {
  className: 'stalk-tooltip',
  description: 'Slot recipe for Radix-backed tooltips.',
  slots: ['content', 'arrow'],
  base: {
    content: {
      maxWidth: '288',
      backgroundColor: 'fg.default',
      borderRadius: 'md',
      color: 'bg.default',
      fontSize: 'xs',
      lineHeight: 'normal',
      paddingBlock: '6',
      paddingInline: '8',
      zIndex: 'tooltip',
    },
    arrow: {
      fill: 'fg.default',
    },
  },
} satisfies RecipeConfig
