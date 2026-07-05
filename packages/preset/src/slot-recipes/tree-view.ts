import type { RecipeConfig } from '../types'

export const treeView = {
  className: 'stalk-tree-view',
  description:
    'Slot recipe for TreeView hierarchies (rows with expand chevrons, selection, and nested groups).',
  slots: ['root', 'branch', 'row', 'indicator', 'label', 'group'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2',
      listStyle: 'none',
      m: '0',
      p: '0',
    },
    branch: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2',
      outline: 'none',
      '&:focus-visible > [data-tree-row]': {
        focusRingWidth: 'base',
        focusRingColor: 'accent.muted',
        focusRingOffsetWidth: '0',
      },
    },
    row: {
      alignItems: 'center',
      borderRadius: 'sm',
      color: 'fg.default',
      cursor: 'pointer',
      display: 'flex',
      gap: '6',
      minW: '0',
      px: '6',
      py: '4',
      textStyle: 'bodySm',
      _hover: { bgColor: 'bg.subtle' },
      '[aria-selected="true"] > &': {
        bgColor: 'accent.surface',
        color: 'accent.text',
        fontWeight: 'medium',
      },
      '[aria-disabled="true"] > &': { cursor: 'not-allowed', opacity: 0.5 },
    },
    indicator: {
      alignItems: 'center',
      color: 'fg.subtle',
      display: 'inline-flex',
      flexShrink: 0,
      justifyContent: 'center',
      transitionDuration: 'fast',
      transitionProperty: 'transform',
      '[aria-expanded="true"] > [data-tree-row] > &': { transform: 'rotate(90deg)' },
    },
    label: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    group: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2',
      listStyle: 'none',
      m: '0',
      p: '0',
      ps: '20',
    },
  },
} satisfies RecipeConfig
