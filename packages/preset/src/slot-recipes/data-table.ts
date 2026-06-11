import type { RecipeConfig } from '../types'

export const dataTable = {
  className: 'stalk-data-table',
  description:
    'Slot recipe for the TanStack-backed data table wrapper (root, sortable header button, pagination footer).',
  slots: ['root', 'pagination', 'pageInfo', 'sortButton'],
  base: {
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
