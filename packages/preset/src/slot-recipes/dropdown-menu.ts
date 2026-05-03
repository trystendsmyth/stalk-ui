import type { RecipeConfig } from '../types'

const surface = {
  backgroundColor: 'bg.default',
  border: 'default',
  borderRadius: 'md',
  boxShadow: 'lg',
  color: 'fg.default',
  minWidth: '192',
  overflow: 'hidden',
  padding: '4',
  zIndex: 'popover',
} as const

export const dropdownMenu = {
  className: 'stalk-dropdown-menu',
  description: 'Slot recipe for Radix-backed dropdown menus.',
  slots: ['content', 'subContent', 'item', 'itemIndicator', 'label', 'separator', 'shortcut'],
  base: {
    content: surface,
    subContent: surface,
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
      position: 'relative',
      userSelect: 'none',
      _highlighted: {
        backgroundColor: 'accent.subtle',
        color: 'accent.fg',
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
      position: 'absolute',
      top: '0',
      width: '16',
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
  variants: {
    // Reserves space for an indicator (checkbox/radio mark, leading icon) so
    // mixed plain + checkbox/radio items align on a single inline axis.
    inset: {
      true: {
        item: { paddingInlineStart: '28' },
      },
      false: {},
    },
  },
  defaultVariants: {
    inset: false,
  },
} satisfies RecipeConfig
