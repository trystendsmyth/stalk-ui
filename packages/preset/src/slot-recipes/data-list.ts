import type { RecipeConfig } from '../types'

export const dataList = {
  className: 'stalk-data-list',
  jsx: [
    'DataList',
    'DataListRoot',
    'DataListItem',
    'DataListValue',
    'DataListLabel',
    /^DataList\./,
  ],
  description:
    'Slot recipe for DataList — label/value pairs (root, item, label, value) laid out horizontally or vertically.',
  slots: ['root', 'item', 'label', 'value'],
  base: {
    root: {
      color: 'fg.default',
      display: 'grid',
      m: '0',
    },
    label: {
      color: 'fg.muted',
      fontWeight: 'normal',
    },
    value: {
      color: 'fg.default',
      fontWeight: 'medium',
      m: '0',
    },
  },
  variants: {
    orientation: {
      horizontal: {
        root: {
          alignItems: 'baseline',
          columnGap: '16',
          gridTemplateColumns: 'auto 1fr',
          rowGap: '12',
        },
        item: { display: 'contents' },
      },
      vertical: {
        root: {
          gridTemplateColumns: '1fr',
          rowGap: '16',
        },
        item: {
          display: 'flex',
          flexDirection: 'column',
          gap: '4',
        },
      },
    },
    size: {
      sm: {
        label: { textStyle: 'bodySm' },
        value: { textStyle: 'bodySm' },
      },
      md: {
        label: { textStyle: 'body' },
        value: { textStyle: 'body' },
      },
      lg: {
        label: { textStyle: 'bodyLg' },
        value: { textStyle: 'bodyLg' },
      },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
  },
} satisfies RecipeConfig
