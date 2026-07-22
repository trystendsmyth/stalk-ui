import type { RecipeConfig } from '../types'

export const scrollArea = {
  className: 'stalk-scroll-area',
  description: 'Slot recipe for Radix-backed custom scroll areas.',
  jsx: [
    'ScrollArea',
    'ScrollAreaViewport',
    'ScrollAreaThumb',
    'ScrollAreaScrollbar',
    'ScrollAreaCorner',
    'ScrollAreaRoot',
    /^ScrollArea\./,
  ],
  slots: ['root', 'viewport', 'scrollbar', 'thumb', 'corner'],
  base: {
    root: {
      position: 'relative',
      overflow: 'hidden',
    },
    viewport: {
      blockSize: 'full',
      inlineSize: 'full',
      rounded: 'inherit',
    },
    scrollbar: {
      display: 'flex',
      userSelect: 'none',
      touchAction: 'none',
      bgColor: 'transparent',
      p: '2',
      transitionProperty: 'background-color',
      transitionDuration: 'fast',
      _hover: { bgColor: 'bg.subtle' },
      '&[data-orientation="vertical"]': { inlineSize: '10px' },
      '&[data-orientation="horizontal"]': { flexDirection: 'column', blockSize: '10px' },
    },
    thumb: {
      position: 'relative',
      flex: '1',
      bgColor: 'border.default',
      rounded: 'full',
      _hover: { bgColor: 'border.hover' },
      // 44px minimum pointer target, centered over the thumb (Radix guidance).
      '&::before': {
        content: '""',
        position: 'absolute',
        insetBlockStart: '50%',
        insetInlineStart: '50%',
        transform: 'translate(-50%, -50%)',
        inlineSize: 'full',
        blockSize: 'full',
        minInlineSize: '44px',
        minBlockSize: '44px',
      },
    },
    corner: {
      bgColor: 'transparent',
    },
  },
} satisfies RecipeConfig
