import type { RecipeConfig } from '../types'

export const command = {
  className: 'stalk-command',
  description:
    'Slot recipe for the cmdk-backed command palette (root, input, list, empty, group, item, separator, shortcut).',
  slots: [
    'root',
    'inputWrapper',
    'input',
    'list',
    'empty',
    'group',
    'item',
    'separator',
    'shortcut',
  ],
  base: {
    root: {
      bgColor: 'bg.default',
      color: 'fg.default',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      rounded: 'md',
      w: 'full',
    },
    inputWrapper: {
      alignItems: 'center',
      borderColor: 'border.muted',
      borderBottomWidth: '1px',
      display: 'flex',
      gap: '8',
      px: '12',
      '& svg': {
        color: 'fg.muted',
        flexShrink: '0',
      },
    },
    input: {
      appearance: 'none',
      bgColor: 'transparent',
      border: 'none',
      color: 'inherit',
      flex: '1 1 auto',
      fontSize: 'sm',
      minH: '40',
      minW: '0',
      outline: 'none',
      _placeholder: { color: 'fg.muted' },
      _disabled: { cursor: 'not-allowed' },
    },
    list: {
      maxH: '320',
      overflowX: 'hidden',
      overflowY: 'auto',
      p: '4',
    },
    empty: {
      color: 'fg.muted',
      fontSize: 'sm',
      py: '24',
      textAlign: 'center',
    },
    // cmdk renders the heading as a `[cmdk-group-heading]` child of the group, so
    // it is styled via a descendant selector rather than its own slot.
    group: {
      overflow: 'hidden',
      '& [cmdk-group-heading]': {
        color: 'fg.muted',
        fontSize: 'xs',
        fontWeight: 'semibold',
        px: '8',
        py: '6',
      },
    },
    item: {
      alignItems: 'center',
      cursor: 'default',
      display: 'flex',
      fontSize: 'sm',
      gap: '8',
      minH: '32',
      outline: 'none',
      pos: 'relative',
      px: '8',
      rounded: 'sm',
      userSelect: 'none',
      '& svg': { flexShrink: '0' },
      '&[data-selected="true"]': {
        bgColor: 'accent.subtle',
        color: 'accent.fg',
      },
      '&[data-disabled="true"]': {
        opacity: 0.5,
        pointerEvents: 'none',
      },
    },
    separator: {
      bgColor: 'border.muted',
      h: 'px',
      mx: '-4',
      my: '4',
    },
    shortcut: {
      color: 'fg.muted',
      fontSize: 'xs',
      ms: 'auto',
    },
  },
} satisfies RecipeConfig
