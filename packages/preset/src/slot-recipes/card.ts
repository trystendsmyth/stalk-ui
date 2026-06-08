import type { RecipeConfig } from '../types'

export const card = {
  className: 'stalk-card',
  description:
    'Slot recipe for Card surfaces (root, header, title, description, action, content, footer).',
  slots: ['root', 'header', 'title', 'description', 'action', 'content', 'footer'],
  base: {
    root: {
      bgColor: 'bg.default',
      border: 'default',
      color: 'fg.default',
      display: 'flex',
      flexDirection: 'column',
      gap: '24',
      py: '24',
      rounded: 'lg',
    },
    // Two-column grid keeps an optional <Card.Action> pinned to the inline-end
    // while the title/description stack in the first column. With no action the
    // empty second track collapses, so the layout is correct either way.
    header: {
      alignItems: 'start',
      columnGap: '12',
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      px: '24',
      rowGap: '6',
    },
    title: {
      gridColumn: '1',
      textStyle: 'h5',
      fontWeight: 'semibold',
    },
    description: {
      color: 'fg.muted',
      gridColumn: '1',
      textStyle: 'bodySm',
    },
    action: {
      alignSelf: 'start',
      gridColumnStart: '2',
      gridRow: '1 / -1',
      justifySelf: 'end',
    },
    content: {
      px: '24',
    },
    footer: {
      alignItems: 'center',
      display: 'flex',
      gap: '12',
      px: '24',
    },
  },
  variants: {
    variant: {
      outline: {},
      elevated: {
        root: { shadow: 'md' },
      },
    },
  },
  defaultVariants: {
    variant: 'outline',
  },
} satisfies RecipeConfig
