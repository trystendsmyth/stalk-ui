import type { RecipeConfig } from '../types'

export const datePicker = {
  className: 'stalk-date-picker',
  description:
    'Slot recipe for the Date Picker composition (the field wrapper, the in-field calendar trigger, and the calendar popover surface).',
  slots: ['root', 'trigger', 'content'],
  base: {
    // The field fills the anchor; the calendar trigger sits inside the input as
    // a suffix, so there is no trailing element to leave a gap.
    root: {
      display: 'block',
      w: 'full',
    },
    trigger: {
      alignItems: 'center',
      bgColor: 'transparent',
      border: 'none',
      borderRadius: 'sm',
      boxSize: '24',
      color: 'fg.muted',
      cursor: 'pointer',
      display: 'inline-flex',
      justifyContent: 'center',
      _hover: { bgColor: 'bg.subtle', color: 'fg.default' },
      _disabled: { cursor: 'not-allowed', opacity: 0.5 },
    },
    // The popover surface defaults to a fixed text-width; size it to the
    // Calendar instead and let the Calendar supply its own padding.
    content: {
      p: '0',
      w: 'fit-content',
      maxW: 'calc(100vw - 2rem)',
    },
  },
} satisfies RecipeConfig
