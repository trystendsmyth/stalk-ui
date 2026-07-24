import type { RecipeConfig } from '../types'

export const pagination = {
  className: 'stalk-pagination',
  description: 'Slot recipe for pagination navigation. Links reuse the button recipe.',
  jsx: [
    'Pagination',
    'PaginationRoot',
    'PaginationContent',
    'PaginationItem',
    'PaginationLink',
    'PaginationPrevious',
    'PaginationNext',
    'PaginationEllipsis',
    /^Pagination\./,
  ],
  slots: ['root', 'content', 'item', 'ellipsis'],
  base: {
    root: {
      display: 'flex',
      justifyContent: 'center',
      mx: 'auto',
      w: 'full',
    },
    content: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '4',
      listStyle: 'none',
      m: '0',
      p: '0',
    },
    item: {},
    ellipsis: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      h: '36',
      w: '36',
      color: 'fg.muted',
      '& > svg': { h: '16', w: '16' },
    },
  },
} satisfies RecipeConfig
