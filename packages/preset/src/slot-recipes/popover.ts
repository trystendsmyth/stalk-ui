import type { RecipeConfig } from '../types'

export const popover = {
  className: 'stalk-popover',
  description: 'Slot recipe for Radix-backed popovers.',
  slots: ['content', 'arrow', 'close'],
  base: {
    content: {
      w: 'min(calc(100vw - 2rem), 20rem)',
      bgColor: 'bg.default',
      border: 'default',
      rounded: 'md',
      shadow: 'lg',
      color: 'fg.default',
      p: 'base',
      zIndex: 'popover',
    },
    arrow: {
      fill: 'bg.default',
    },
    close: {
      pos: 'absolute',
      insetBlockStart: '8',
      insetInlineEnd: '8',
      alignItems: 'center',
      appearance: 'none',
      bgColor: 'transparent',
      border: 'none',
      rounded: 'sm',
      color: 'fg.muted',
      cursor: 'pointer',
      display: 'inline-flex',
      flexShrink: 0,
      font: 'inherit',
      h: '24',
      justifyContent: 'center',
      lineHeight: 1,
      m: '0',
      p: '0',
      w: '24',
      _hover: {
        bgColor: 'bg.subtle',
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
        h: '14',
        w: '14',
      },
    },
  },
} satisfies RecipeConfig
