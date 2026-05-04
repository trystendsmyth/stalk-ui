import type { RecipeConfig } from '../types'

export const tooltip = {
  className: 'stalk-tooltip',
  description: 'Slot recipe for Radix-backed tooltips.',
  slots: ['content', 'arrow'],
  base: {
    content: {
      maxW: '288',
      bgColor: 'fg.default',
      rounded: 'md',
      color: 'bg.default',
      fontSize: 'xs',
      lineHeight: 'normal',
      py: '6',
      px: '8',
      zIndex: 'tooltip',
    },
    arrow: {
      fill: 'fg.default',
    },
  },
} satisfies RecipeConfig
