import type { RecipeConfig } from '../types'

export const breadcrumb = {
  className: 'stalk-breadcrumb',
  description: 'Slot recipe for breadcrumb navigation trails.',
  jsx: [
    'Breadcrumb',
    'BreadcrumbRoot',
    'BreadcrumbList',
    'BreadcrumbItem',
    'BreadcrumbLink',
    'BreadcrumbPage',
    'BreadcrumbSeparator',
    'BreadcrumbEllipsis',
    /^Breadcrumb\./,
  ],
  slots: ['root', 'list', 'item', 'link', 'page', 'separator', 'ellipsis'],
  base: {
    root: {
      color: 'fg.muted',
    },
    list: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '6',
      wordBreak: 'break-word',
      textStyle: 'bodySm',
      listStyle: 'none',
      m: '0',
      p: '0',
    },
    item: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6',
    },
    link: {
      color: 'fg.muted',
      rounded: 'sm',
      outline: 'none',
      transitionProperty: 'color',
      transitionDuration: 'fast',
      _hover: { color: 'fg.default' },
      _focusVisible: {
        focusRingWidth: 'base',
        focusRingColor: 'accent.subtle',
        focusRingOffsetWidth: '2',
        focusRingOffsetColor: 'bg.default',
      },
    },
    page: {
      color: 'fg.default',
      fontWeight: 'medium',
    },
    separator: {
      display: 'inline-flex',
      alignItems: 'center',
      color: 'fg.subtle',
      '& > svg': { h: '14', w: '14' },
    },
    ellipsis: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      h: '20',
      w: '20',
      '& > svg': { h: '16', w: '16' },
    },
  },
} satisfies RecipeConfig
