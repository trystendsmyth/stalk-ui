import type { RecipeConfig } from '../types'

export const editable = {
  className: 'stalk-editable',
  description:
    'Slot recipe for Editable in-place text (preview button that swaps to an input on activation).',
  slots: ['root', 'preview', 'input'],
  base: {
    root: {
      display: 'inline-flex',
      maxW: 'full',
      minW: '0',
    },
    preview: {
      appearance: 'none',
      bgColor: 'transparent',
      border: 'none',
      borderRadius: 'sm',
      color: 'fg.default',
      cursor: 'text',
      font: 'inherit',
      overflow: 'hidden',
      px: '4',
      py: '2',
      textAlign: 'start',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      _hover: { bgColor: 'bg.subtle' },
      '&[data-placeholder]': { color: 'fg.muted' },
      _disabled: { cursor: 'not-allowed', opacity: 0.5 },
    },
    input: {
      appearance: 'none',
      bgColor: 'bg.canvas',
      border: 'default',
      borderColor: 'accent.solid',
      borderRadius: 'sm',
      color: 'fg.default',
      font: 'inherit',
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
