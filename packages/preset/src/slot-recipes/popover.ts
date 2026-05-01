import type { RecipeConfig } from '../types'

export const popover = {
  className: 'stalk-popover',
  description: 'Slot recipe for Radix-backed popovers.',
  slots: ['content', 'arrow', 'close'],
  base: {
    content: {
      width: 'min(calc(100vw - 2rem), 20rem)',
      backgroundColor: 'bg.default',
      border: 'default',
      borderRadius: 'md',
      boxShadow: 'lg',
      color: 'fg.default',
      padding: 'base',
      zIndex: 'popover',
    },
    arrow: {
      fill: 'bg.default',
    },
    close: {
      position: 'absolute',
      insetBlockStart: '8',
      insetInlineEnd: '8',
      borderRadius: 'sm',
      _focusVisible: {
        focusRingWidth: 'base',
        focusRingColor: 'accent.subtle',
        focusRingOffsetWidth: '1',
        focusRingOffsetColor: 'bg.default',
      },
    },
  },
} satisfies RecipeConfig
