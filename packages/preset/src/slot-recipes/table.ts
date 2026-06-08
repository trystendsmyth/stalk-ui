import type { RecipeConfig } from '../types'

export const table = {
  className: 'stalk-table',
  description:
    'Slot recipe for data tables (root, table, header, body, footer, row, head, cell, caption).',
  slots: ['root', 'table', 'header', 'body', 'footer', 'row', 'head', 'cell', 'caption'],
  base: {
    // Scroll container so wide tables stay within their column on narrow viewports.
    root: {
      w: 'full',
      overflowX: 'auto',
    },
    table: {
      w: 'full',
      borderCollapse: 'collapse',
      captionSide: 'bottom',
      color: 'fg.default',
      fontSize: 'sm',
      textAlign: 'start',
    },
    header: {
      '& tr': {
        borderBlockEndWidth: 'xs',
        borderBlockEndStyle: 'solid',
        borderBlockEndColor: 'border.default',
      },
    },
    body: {},
    footer: {
      bgColor: 'bg.subtle',
      fontWeight: 'medium',
      '& tr': {
        borderBlockStartWidth: 'xs',
        borderBlockStartStyle: 'solid',
        borderBlockStartColor: 'border.default',
      },
    },
    row: {
      borderBlockEndWidth: 'xs',
      borderBlockEndStyle: 'solid',
      borderBlockEndColor: 'border.muted',
      transitionProperty: 'background-color',
      transitionDuration: 'fast',
      _hover: {
        bgColor: 'bg.subtle',
      },
      '&[data-state="selected"]': {
        bgColor: 'accent.subtle',
      },
    },
    head: {
      color: 'fg.muted',
      fontWeight: 'medium',
      h: '40',
      px: '12',
      textAlign: 'start',
      verticalAlign: 'middle',
      whiteSpace: 'nowrap',
    },
    cell: {
      px: '12',
      py: '10',
      verticalAlign: 'middle',
    },
    caption: {
      color: 'fg.muted',
      fontSize: 'sm',
      mt: '16',
    },
  },
} satisfies RecipeConfig
