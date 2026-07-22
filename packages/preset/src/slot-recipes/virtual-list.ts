import type { RecipeConfig } from '../types'

export const virtualList = {
  className: 'stalk-virtual-list',
  jsx: ['VirtualList', 'VirtualListRoot', 'VirtualListItem', /^VirtualList\./],
  description:
    'Slot recipe for the windowed VirtualList primitive (scroll root, sized viewport, absolutely-positioned item).',
  slots: ['root', 'viewport', 'item'],
  base: {
    root: {
      overflow: 'auto',
      position: 'relative',
      w: 'full',
    },
    // Sized to the full virtual extent so the native scrollbar reflects the whole
    // backlog; the rendered items are absolutely positioned within it.
    viewport: {
      position: 'relative',
      width: 'full',
    },
    item: {
      insetInlineStart: '0',
      position: 'absolute',
      top: '0',
      width: 'full',
    },
  },
  variants: {
    orientation: {
      vertical: {},
      horizontal: {
        root: {
          overflowX: 'auto',
          overflowY: 'hidden',
        },
        viewport: {
          height: 'full',
        },
        item: {
          height: 'full',
          width: 'auto',
        },
      },
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
} satisfies RecipeConfig
