import type { RecipeConfig } from '../types'

export const datePicker = {
  className: 'stalk-date-picker',
  description:
    'Slot recipe for the Date Picker composition (the field wrapper, the in-field calendar trigger, and the calendar popover surface).',
  slots: ['root', 'trigger', 'content', 'rangeField', 'rangeValue', 'panel', 'presets', 'preset'],
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
    // Range mode renders a button-shaped field (the typed input is single-date
    // only); it borrows the input recipe's chrome and adds button ergonomics.
    rangeField: {
      alignItems: 'center',
      cursor: 'pointer',
      gap: '8',
      px: '12',
      textAlign: 'start',
    },
    rangeValue: {
      color: 'fg.default',
      flex: '1 1 auto',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      '&[data-placeholder]': { color: 'fg.muted' },
    },
    // Popover body in range mode: preset rail beside the calendar.
    panel: {
      alignItems: 'stretch',
      display: 'flex',
    },
    presets: {
      borderInlineEndWidth: '1px',
      borderInlineEndStyle: 'solid',
      borderInlineEndColor: 'border.muted',
      display: 'flex',
      flexDirection: 'column',
      gap: '2',
      minW: '128',
      p: '8',
    },
    preset: {
      bgColor: 'transparent',
      border: 'none',
      borderRadius: 'sm',
      color: 'fg.default',
      cursor: 'pointer',
      fontSize: 'sm',
      px: '10',
      py: '6',
      textAlign: 'start',
      _hover: { bgColor: 'bg.subtle' },
    },
  },
} satisfies RecipeConfig
