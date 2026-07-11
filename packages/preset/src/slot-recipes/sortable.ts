import type { RecipeConfig } from '../types'

export const sortable = {
  className: 'stalk-sortable',
  description:
    'Slot recipe for the drag-and-drop Sortable primitive (list root, draggable item, drag handle).',
  slots: ['root', 'item', 'handle'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8',
      w: 'full',
    },
    item: {
      alignItems: 'center',
      bgColor: 'bg.default',
      border: 'default',
      color: 'fg.default',
      display: 'flex',
      gap: '8',
      px: '12',
      py: '8',
      rounded: 'md',
      // Let the pointer sensor own the gesture instead of the browser scrolling.
      touchAction: 'none',
      transitionDuration: 'fast',
      transitionProperty: 'box-shadow, opacity',
      '&[data-dragging]': {
        opacity: 0.6,
        shadow: 'md',
      },
    },
    handle: {
      alignItems: 'center',
      appearance: 'none',
      bgColor: 'transparent',
      border: 'none',
      color: 'fg.muted',
      cursor: 'grab',
      display: 'inline-flex',
      flexShrink: 0,
      p: '2',
      rounded: 'sm',
      touchAction: 'none',
      _active: {
        cursor: 'grabbing',
      },
      _focusVisible: {
        focusRingWidth: 'base',
        focusRingColor: 'accent.subtle',
        focusRingOffsetWidth: '1',
        focusRingOffsetColor: 'bg.default',
        outline: 'none',
      },
    },
  },
} satisfies RecipeConfig
