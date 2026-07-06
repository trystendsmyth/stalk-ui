import type { RecipeConfig } from '../types'

export const editable = {
  className: 'stalk-editable',
  description:
    'Slot recipe for Editable in-place text (preview button that swaps to an input on activation).',
  slots: ['root', 'ghost', 'preview', 'input'],
  base: {
    // Preview, input, and a hidden ghost of the current text share one grid
    // cell: the ghost sizes the cell, so the preview→input swap (and typing)
    // never shifts the layout.
    root: {
      display: 'inline-grid',
      maxW: 'full',
      minW: '0',
    },
    ghost: {
      gridArea: '1 / 1',
      overflow: 'hidden',
      px: '4',
      py: '2',
      visibility: 'hidden',
      whiteSpace: 'pre',
    },
    preview: {
      appearance: 'none',
      bgColor: 'transparent',
      border: 'none',
      borderRadius: 'sm',
      color: 'fg.default',
      cursor: 'text',
      font: 'inherit',
      gridArea: '1 / 1',
      overflow: 'hidden',
      px: '4',
      py: '2',
      textAlign: 'start',
      textOverflow: 'ellipsis',
      w: 'full',
      whiteSpace: 'nowrap',
      _hover: { bgColor: 'bg.subtle' },
      '&[data-placeholder]': { color: 'fg.muted' },
      _disabled: { cursor: 'not-allowed', opacity: 0.5 },
    },
    // Borderless (the focus ring carries the affordance) so the swapped-in
    // input occupies exactly the preview's box.
    input: {
      appearance: 'none',
      bgColor: 'bg.canvas',
      border: 'none',
      borderRadius: 'sm',
      color: 'fg.default',
      font: 'inherit',
      gridArea: '1 / 1',
      // Kill the browser input's intrinsic minimum (~size=20 chars): as a grid
      // item it would widen the shared cell past the ghost and shift the layout.
      minW: '0',
      outline: 'none',
      px: '4',
      py: '2',
      w: 'full',
      focusRingWidth: 'base',
      focusRingColor: 'accent.muted',
      focusRingOffsetWidth: '0',
    },
  },
} satisfies RecipeConfig
