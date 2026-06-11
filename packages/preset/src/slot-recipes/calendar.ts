import type { RecipeConfig } from '../types'

// Selected / range / today / outside flags are applied by react-day-picker to
// the day *cell*; we reach the inner button with `& button` so the visual state
// lives on the actual control.
export const calendar = {
  className: 'stalk-calendar',
  description:
    'Slot recipe for the react-day-picker calendar grid (root, nav, month grid, day cells, and selection states).',
  slots: [
    'root',
    'months',
    'month',
    'nav',
    'navButton',
    'monthCaption',
    'captionLabel',
    'monthGrid',
    'weekdays',
    'weekday',
    'week',
    'day',
    'dayButton',
    'today',
    'outside',
    'disabled',
    'hidden',
    'selected',
    'rangeStart',
    'rangeMiddle',
    'rangeEnd',
  ],
  base: {
    root: {
      color: 'fg.default',
      display: 'inline-block',
      p: '12',
    },
    months: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16',
      pos: 'relative',
    },
    month: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16',
    },
    nav: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      pos: 'absolute',
      insetInline: '0',
      top: '0',
      zIndex: '1',
    },
    navButton: {
      alignItems: 'center',
      bgColor: 'transparent',
      border: 'default',
      color: 'fg.default',
      cursor: 'pointer',
      display: 'inline-flex',
      justifyContent: 'center',
      boxSize: '28',
      rounded: 'md',
      _hover: { bgColor: 'bg.subtle' },
      _disabled: { cursor: 'not-allowed', opacity: 0.4 },
    },
    monthCaption: {
      alignItems: 'center',
      display: 'flex',
      h: '28',
      justifyContent: 'center',
    },
    captionLabel: {
      fontWeight: 'semibold',
      textStyle: 'bodySm',
    },
    monthGrid: {
      borderCollapse: 'collapse',
      w: 'full',
    },
    weekdays: {
      display: 'flex',
    },
    weekday: {
      color: 'fg.muted',
      flex: '1',
      fontSize: 'xs',
      fontWeight: 'normal',
      textAlign: 'center',
    },
    week: {
      display: 'flex',
      mt: '4',
    },
    day: {
      flex: '1',
      p: '0',
      textAlign: 'center',
      '& button': {
        bgColor: 'transparent',
        border: 'none',
        color: 'inherit',
        cursor: 'pointer',
        boxSize: '36',
        fontSize: 'sm',
        mx: 'auto',
        rounded: 'md',
        _hover: { bgColor: 'bg.subtle' },
      },
    },
    dayButton: {},
    today: {
      '& button': { fontWeight: 'bold', color: 'accent.fg' },
    },
    outside: {
      '& button': { color: 'fg.muted', opacity: 0.5 },
    },
    disabled: {
      '& button': { opacity: 0.4, pointerEvents: 'none' },
    },
    hidden: {
      visibility: 'hidden',
    },
    selected: {
      '& button': {
        bgColor: 'accent.solid',
        color: 'accent.fg',
        _hover: { bgColor: 'accent.solid' },
      },
    },
    rangeMiddle: {
      '& button': { bgColor: 'accent.subtle', color: 'accent.fg', rounded: 'none' },
    },
    rangeStart: {
      '& button': { bgColor: 'accent.solid', color: 'accent.fg' },
    },
    rangeEnd: {
      '& button': { bgColor: 'accent.solid', color: 'accent.fg' },
    },
  },
} satisfies RecipeConfig
