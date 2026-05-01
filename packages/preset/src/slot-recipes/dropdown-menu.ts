import type { RecipeConfig } from '../types'

export const dropdownMenu = {
  className: 'stalk-dropdown-menu',
  description: 'Slot recipe for Radix-backed dropdown menus.',
  slots: ['content', 'item', 'label', 'separator', 'shortcut'],
  base: {
    content: {
      minWidth: '192',
      overflow: 'hidden',
      backgroundColor: 'bg.default',
      border: 'default',
      borderRadius: 'md',
      boxShadow: 'lg',
      color: 'fg.default',
      padding: '4',
      zIndex: 'popover',
    },
    item: {
      alignItems: 'center',
      borderRadius: 'sm',
      cursor: 'default',
      display: 'flex',
      fontSize: 'sm',
      gap: '8',
      minHeight: '32',
      outline: 'none',
      paddingInline: '8',
      userSelect: 'none',
      _highlighted: {
        backgroundColor: 'accent.subtle',
        color: 'accent.fg',
      },
      _focusVisible: {
        focusRingWidth: 'base',
        focusRingColor: 'accent.subtle',
        focusRingOffsetWidth: '1',
        focusRingOffsetColor: 'bg.default',
      },
      _disabled: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
    },
    label: {
      color: 'fg.muted',
      fontSize: 'xs',
      fontWeight: 'semibold',
      paddingBlock: '6',
      paddingInline: '8',
    },
    separator: {
      height: 'px',
      backgroundColor: 'border.muted',
      marginBlock: '4',
    },
    shortcut: {
      color: 'fg.muted',
      fontSize: 'xs',
      marginInlineStart: 'auto',
    },
  },
} satisfies RecipeConfig
