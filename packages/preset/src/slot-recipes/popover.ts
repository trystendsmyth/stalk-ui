import type { RecipeConfig } from '../types'

export const popover = {
  className: 'stalk-popover',
  description: 'Slot recipe for Radix-backed popovers.',
  slots: ['content', 'arrow', 'close'],
  base: {
    content: {
      width: 'min(calc(100vw - 2rem), 20rem)',
      backgroundColor: 'bg.default',
      borderColor: 'border.default',
      borderRadius: 'md',
      borderWidth: '1px',
      boxShadow: 'lg',
      color: 'fg.default',
      padding: '4',
      zIndex: 'popover',
    },
    arrow: {
      fill: 'bg.default',
    },
    close: {
      position: 'absolute',
      insetBlockStart: '2',
      insetInlineEnd: '2',
    },
  },
} satisfies RecipeConfig
