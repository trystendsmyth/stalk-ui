import type { RecipeConfig } from '../types'

export const table = {
  className: 'stalk-table',
  jsx: [
    'Table',
    'TableRoot',
    'TableHeader',
    'TableBody',
    'TableFooter',
    'TableRow',
    'TableHead',
    'TableCell',
    'TableCaption',
    'TableExpandableRow',
    'TableExpandTrigger',
    /^Table\./,
  ],
  description:
    'Slot recipe for data tables (root, table, header, body, footer, row, head, cell, caption).',
  slots: [
    'root',
    'table',
    'header',
    'body',
    'footer',
    'row',
    'head',
    'cell',
    'caption',
    'expandTrigger',
    'expandedCell',
  ],
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
    // Row-expansion disclosure: a chevron toggle and the detail cell it reveals.
    expandTrigger: {
      alignItems: 'center',
      appearance: 'none',
      bgColor: 'transparent',
      border: 'none',
      borderRadius: 'sm',
      color: 'fg.muted',
      cursor: 'pointer',
      display: 'inline-flex',
      h: '24',
      justifyContent: 'center',
      p: '0',
      transitionDuration: 'fast',
      transitionProperty: 'color, background-color',
      w: '24',
      _hover: { bgColor: 'bg.subtle', color: 'fg.default' },
      _focusVisible: {
        focusRingWidth: 'base',
        focusRingColor: 'accent.subtle',
        focusRingOffsetWidth: '1',
        focusRingOffsetColor: 'bg.default',
      },
      '& > svg': {
        transitionDuration: 'fast',
        transitionProperty: 'transform',
      },
      '&[aria-expanded="true"] > svg': {
        transform: 'rotate(90deg)',
      },
    },
    expandedCell: {
      bgColor: 'bg.subtle',
      px: '12',
      py: '10',
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
    /**
     * Pin the footer to the bottom of the scroll container — the mirror of
     * `stickyHeader`. Same vertical-scroll requirement on `containerProps`. The
     * footer cells carry an opaque bg so scrolled body rows are occluded.
     */
    stickyFooter: {
      true: {
        footer: {
          '& th, & td': {
            position: 'sticky',
            insetBlockEnd: '0',
            zIndex: 2,
            bgColor: 'bg.subtle',
            '&[data-pinned]': {
              zIndex: 3,
            },
          },
        },
      },
    },
  },
  defaultVariants: {
    stickyHeader: false,
    stickyFooter: false,
  },
} satisfies RecipeConfig
