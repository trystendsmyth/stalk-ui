import type { RecipeConfig } from '../types'

const surface = {
  bgColor: 'bg.default',
  border: 'default',
  rounded: 'md',
  shadow: 'lg',
  color: 'fg.default',
  minW: '192',
  overflow: 'hidden',
  p: '4',
  zIndex: 'popover',
} as const

export const contextMenu = {
  className: 'stalk-context-menu',
  description: 'Slot recipe for Radix-backed context menus.',
  slots: ['content', 'subContent', 'item', 'itemIndicator', 'label', 'separator', 'shortcut'],
  base: {
    content: surface,
    subContent: surface,
    item: {
      alignItems: 'center',
      rounded: 'sm',
      cursor: 'default',
      display: 'flex',
      fontSize: 'sm',
      gap: '8',
      minH: '32',
      outline: 'none',
      px: '8',
      pos: 'relative',
      userSelect: 'none',
      _highlighted: {
        bgColor: 'accent.subtle',
        color: 'accent.fg',
      },
      '&[data-state="checked"]': {
        color: 'accent.solid',
        fontWeight: 'medium',
      },
      _disabled: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
    },
    itemIndicator: {
      alignItems: 'center',
      bottom: '0',
      display: 'inline-flex',
      insetInlineStart: '6',
      justifyContent: 'center',
      pointerEvents: 'none',
      pos: 'absolute',
      top: '0',
      w: '16',
    },
    label: {
      color: 'fg.muted',
      fontSize: 'xs',
      fontWeight: 'semibold',
      py: '6',
      px: '8',
    },
    separator: {
      h: 'px',
      bgColor: 'border.muted',
      my: '4',
    },
    shortcut: {
      color: 'fg.muted',
      fontSize: 'xs',
      ms: 'auto',
    },
  },
  variants: {
    inset: {
      true: { item: { ps: '28' } },
      false: {},
    },
  },
  defaultVariants: {
    inset: false,
  },
} satisfies RecipeConfig
