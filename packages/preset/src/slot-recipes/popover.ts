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
      alignItems: 'center',
      appearance: 'none',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: 'sm',
      color: 'fg.muted',
      cursor: 'pointer',
      display: 'inline-flex',
      flexShrink: 0,
      font: 'inherit',
      height: '24',
      justifyContent: 'center',
      lineHeight: 1,
      margin: '0',
      padding: '0',
      width: '24',
      _hover: {
        backgroundColor: 'bg.subtle',
        color: 'fg.default',
      },
      _focusVisible: {
        focusRingWidth: 'base',
        focusRingColor: 'accent.subtle',
        focusRingOffsetWidth: '1',
        focusRingOffsetColor: 'bg.default',
      },
      '& > svg': {
        flexShrink: 0,
        height: '14',
        width: '14',
      },
    },
  },
} satisfies RecipeConfig
