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
      // Frozen columns: opt-in per cell via `data-pinned="start|end"`. Logical
      // inset keeps it correct under RTL. An opaque bg occludes scrolled cells.
      '&[data-pinned="start"]': {
        position: 'sticky',
        insetInlineStart: '0',
        zIndex: 1,
        bgColor: 'bg.default',
      },
      '&[data-pinned="end"]': {
        position: 'sticky',
        insetInlineEnd: '0',
        zIndex: 1,
        bgColor: 'bg.default',
      },
    },
    cell: {
      px: '12',
      py: '10',
      verticalAlign: 'middle',
      '&[data-pinned="start"]': {
        position: 'sticky',
        insetInlineStart: '0',
        zIndex: 1,
        bgColor: 'bg.default',
      },
      '&[data-pinned="end"]': {
        position: 'sticky',
        insetInlineEnd: '0',
        zIndex: 1,
        bgColor: 'bg.default',
      },
    },
    caption: {
      color: 'fg.muted',
      fontSize: 'sm',
      mt: '16',
    },
  },
  variants: {
    /**
     * Pin the header to the top of the scroll container. The consumer supplies
     * the vertical scroll (a max-height + `overflowY` on `Table.Root`'s
     * `containerProps`); this makes the header rows stay put while body rows scroll.
     */
    stickyHeader: {
      true: {
        head: {
          position: 'sticky',
          insetBlockStart: '0',
          zIndex: 2,
          bgColor: 'bg.default',
          // A pinned + sticky header corner cell must stack above both axes.
          '&[data-pinned]': {
            zIndex: 3,
          },
        },
      },
    },
  },
  defaultVariants: {
    stickyHeader: false,
  },
} satisfies RecipeConfig
