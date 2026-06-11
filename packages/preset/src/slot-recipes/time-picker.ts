import type { RecipeConfig } from '../types'

export const timePicker = {
  className: 'stalk-time-picker',
  description: 'Slot recipe for the Select-based time picker (root row and the field separator).',
  slots: ['root', 'separator'],
  base: {
    root: {
      alignItems: 'center',
      display: 'inline-flex',
      gap: '4',
    },
    separator: {
      color: 'fg.muted',
    },
  },
} satisfies RecipeConfig
