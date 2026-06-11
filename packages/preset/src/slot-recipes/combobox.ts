import type { RecipeConfig } from '../types'

export const combobox = {
  className: 'stalk-combobox',
  description:
    'Slot recipe for the Command-in-Popover combobox (trigger, value, icon, content, item indicator).',
  slots: ['trigger', 'value', 'icon', 'content', 'itemIndicator'],
  base: {
    trigger: {
      alignItems: 'center',
      display: 'inline-flex',
      fontWeight: 'normal',
      gap: '8',
      justifyContent: 'space-between',
      minW: '200',
    },
    value: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    icon: {
      color: 'fg.muted',
      flexShrink: '0',
    },
    // Match the popover surface to the trigger width and let the Command supply
    // its own padding.
    content: {
      p: '0',
      w: 'var(--radix-popover-trigger-width)',
    },
    itemIndicator: {
      color: 'accent.fg',
      marginInlineStart: 'auto',
    },
  },
} satisfies RecipeConfig
