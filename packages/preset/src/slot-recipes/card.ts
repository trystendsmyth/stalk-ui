import type { RecipeConfig } from '../types'

export const card = {
  className: 'stalk-card',
  description: 'Slot recipe for composed card layouts.',
  slots: ['root', 'header', 'title', 'description', 'content', 'footer'],
  base: {
    root: {
      backgroundColor: 'bg.default',
      borderColor: 'border.default',
      borderRadius: 'lg',
      borderWidth: '1px',
      color: 'fg.default',
      overflow: 'hidden',
    },
    header: {
      display: 'grid',
      gap: '1.5',
      padding: '6',
    },
    title: {
      fontSize: 'lg',
      fontWeight: '650',
      lineHeight: '1.2',
    },
    description: {
      color: 'fg.muted',
      fontSize: 'sm',
      lineHeight: '1.6',
    },
    content: {
      paddingInline: '6',
      paddingBlockEnd: '6',
    },
    footer: {
      alignItems: 'center',
      display: 'flex',
      gap: '3',
      padding: '6',
      paddingBlockStart: '0',
    },
  },
} satisfies RecipeConfig
