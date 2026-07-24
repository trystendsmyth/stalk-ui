import type { RecipeConfig } from '../types'

export const dataTable = {
  className: 'stalk-data-table',
  jsx: ['DataTable', 'DataTableAdvanced', /^DataTable\./],
  description:
    'Slot recipe for the TanStack-backed data table wrapper (root, sortable header button, pagination footer).',
  slots: ['root', 'pagination', 'pageInfo', 'sortButton', 'toolbar', 'resizeHandle'],
  base: {
    toolbar: {
      display: 'flex',
      gap: '8',
      justifyContent: 'flex-end',
      pb: '8',
    },
    // Pointer target on the trailing edge of a resizable header cell.
    resizeHandle: {
      bottom: '0',
      cursor: 'col-resize',
      insetInlineEnd: '0',
      pos: 'absolute',
      top: '0',
      touchAction: 'none',
      userSelect: 'none',
      w: '4',
      _hover: { bgColor: 'accent.muted' },
      '&[data-resizing]': { bgColor: 'accent.solid' },
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12',
      w: 'full',
    },
    pagination: {
      alignItems: 'center',
      display: 'flex',
      gap: '12',
      justifyContent: 'flex-end',
    },
    pageInfo: {
      color: 'fg.muted',
      textStyle: 'bodySm',
    },
    sortButton: {
      alignItems: 'center',
      bgColor: 'transparent',
      border: 'none',
      color: 'inherit',
      cursor: 'pointer',
      display: 'inline-flex',
      font: 'inherit',
      fontWeight: 'inherit',
      gap: '4',
      p: '0',
      textAlign: 'start',
      '& svg': { color: 'fg.muted' },
    },
  },
} satisfies RecipeConfig
