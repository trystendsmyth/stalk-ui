import type { RecipeConfig } from '../types'

export const emptyState = {
  className: 'stalk-empty-state',
  jsx: [
    'EmptyState',
    'EmptyStateRoot',
    'EmptyStateTitle',
    'EmptyStateDescription',
    'EmptyStateActions',
    'EmptyStateIcon',
    /^EmptyState\./,
  ],
  description:
    'Slot recipe for EmptyState placeholders (icon, title, description, actions) shown when a view has no data.',
  slots: ['root', 'icon', 'title', 'description', 'actions'],
  base: {
    root: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: '8',
      justifyContent: 'center',
      px: '24',
      py: '48',
      textAlign: 'center',
    },
    icon: {
      color: 'fg.subtle',
      display: 'inline-flex',
      mb: '4',
      '& > svg': { h: '32', w: '32' },
    },
    title: {
      color: 'fg.default',
      fontWeight: 'semibold',
      m: '0',
      textStyle: 'h5',
    },
    description: {
      color: 'fg.muted',
      m: '0',
      maxW: 'prose',
      textStyle: 'bodySm',
    },
    actions: {
      alignItems: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8',
      justifyContent: 'center',
      mt: '8',
    },
  },
  variants: {
    // `sm` fits inline panels (a filtered-out table body); `md` fills a page section.
    size: {
      sm: {
        root: { gap: '6', px: '16', py: '24' },
        icon: { '& > svg': { h: '24', w: '24' } },
        title: { textStyle: 'bodyLg', fontWeight: 'semibold' },
      },
      md: {},
    },
  },
  defaultVariants: {
    size: 'md',
  },
} satisfies RecipeConfig
