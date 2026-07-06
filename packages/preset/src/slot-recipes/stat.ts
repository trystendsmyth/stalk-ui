import type { RecipeConfig } from '../types'

export const stat = {
  className: 'stalk-stat',
  description:
    'Slot recipe for Stat / KPI read-outs (label, value, unit, toned delta, trend slot).',
  slots: ['root', 'label', 'value', 'unit', 'delta', 'trend'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4',
      minW: '0',
    },
    label: {
      color: 'fg.muted',
      fontWeight: 'medium',
      m: '0',
      textStyle: 'bodySm',
    },
    value: {
      alignItems: 'baseline',
      color: 'fg.default',
      display: 'flex',
      fontWeight: 'semibold',
      gap: '4',
      lineHeight: 'tight',
      m: '0',
      textStyle: 'h3',
    },
    unit: {
      color: 'fg.muted',
      fontSize: 'sm',
      fontWeight: 'normal',
    },
    // Toned via `colorPalette` from the delta direction (success/danger/neutral).
    delta: {
      alignItems: 'center',
      color: 'colorPalette.text',
      display: 'inline-flex',
      fontSize: 'sm',
      fontWeight: 'medium',
      gap: '4',
    },
    // Free slot for a Sparkline or other inline visualization.
    trend: {
      mt: '4',
    },
  },
  variants: {
    size: {
      sm: { value: { textStyle: 'h5' } },
      md: {},
      lg: { value: { textStyle: 'h2' } },
    },
  },
  defaultVariants: {
    size: 'md',
  },
} satisfies RecipeConfig
