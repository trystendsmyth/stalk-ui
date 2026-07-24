import type { RecipeConfig } from '../types'

export const hoverCard = {
  className: 'stalk-hover-card',
  description: 'Slot recipe for Radix-backed hover cards (hover/focus preview surface).',
  jsx: [
    'HoverCard',
    'HoverCardRoot',
    'HoverCardTrigger',
    'HoverCardPortal',
    'HoverCardContent',
    /^HoverCard\./,
  ],
  slots: ['content', 'arrow'],
  base: {
    content: {
      w: 'min(calc(100vw - 2rem), 18rem)',
      bgColor: 'bg.default',
      border: 'default',
      rounded: 'md',
      shadow: 'lg',
      color: 'fg.default',
      p: 'base',
      zIndex: 'popover',
    },
    arrow: {
      fill: 'bg.default',
    },
  },
} satisfies RecipeConfig
