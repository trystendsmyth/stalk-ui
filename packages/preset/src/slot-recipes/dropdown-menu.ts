import type { RecipeConfig } from '../types'

export const dropdownMenu = {
  className: 'stalk-dropdown-menu',
  description: 'Slot recipe for Radix-backed dropdown menus.',
  slots: ['content', 'item', 'label', 'separator', 'shortcut'],
  base: {
    content: {
      minWidth: '12rem',
      overflow: 'hidden',
      backgroundColor: 'bg.default',
      borderColor: 'border.default',
      borderRadius: 'md',
      borderWidth: '1px',
      boxShadow: 'lg',
      color: 'fg.default',
      padding: '1',
      zIndex: 'popover',
    },
    item: {
      alignItems: 'center',
      borderRadius: 'sm',
      cursor: 'default',
      display: 'flex',
      fontSize: 'sm',
      gap: '2',
      minHeight: '8',
      outline: 'none',
      paddingInline: '2',
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
      fontWeight: '600',
      paddingBlock: '1.5',
      paddingInline: '2',
    },
    separator: {
      height: '1px',
      backgroundColor: 'border.default',
      marginBlock: '1',
    },
    shortcut: {
      color: 'fg.muted',
      fontSize: 'xs',
      marginInlineStart: 'auto',
    },
  },
} satisfies RecipeConfig
