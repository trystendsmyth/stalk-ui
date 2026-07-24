import type { RecipeConfig } from '../types'

export const steps = {
  className: 'stalk-steps',
  jsx: ['Steps', /^Steps\./],
  description:
    'Slot recipe for Steps / Stepper flows (numbered indicators, separators, per-state styling via data-state).',
  slots: ['root', 'item', 'indicator', 'separator', 'content', 'title', 'description'],
  base: {
    root: {
      display: 'flex',
      listStyle: 'none',
      m: '0',
      p: '0',
      // Fill the container so the `flex: 1` items distribute and separators
      // stretch, rather than shrink-wrapping and overlapping their labels.
      w: 'full',
    },
    item: {
      display: 'flex',
      flex: '1',
      gap: '8',
      minW: '0',
      '&:last-of-type': {
        flex: '0 0 auto',
        '& [data-steps-separator]': { display: 'none' },
      },
    },
    indicator: {
      alignItems: 'center',
      bgColor: 'bg.subtle',
      border: 'default',
      borderColor: 'border.default',
      boxSize: '28',
      color: 'fg.muted',
      display: 'inline-flex',
      flexShrink: 0,
      fontSize: 'sm',
      fontWeight: 'semibold',
      justifyContent: 'center',
      rounded: 'full',
      '[data-state="current"] &': {
        bgColor: 'accent.solid',
        borderColor: 'accent.solid',
        color: 'accent.contrast',
      },
      '[data-state="complete"] &': {
        bgColor: 'accent.surface',
        borderColor: 'accent.muted',
        color: 'accent.text',
      },
    },
    separator: {
      bgColor: 'border.muted',
      flex: '1',
      '[data-state="complete"] &': { bgColor: 'accent.muted' },
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2',
      minW: '0',
    },
    title: {
      color: 'fg.default',
      fontWeight: 'medium',
      m: '0',
      textStyle: 'bodySm',
      '[data-state="current"] &': { color: 'accent.text' },
    },
    description: {
      color: 'fg.muted',
      fontSize: 'xs',
      m: '0',
    },
  },
  variants: {
    orientation: {
      horizontal: {
        // Center the indicator, label, and connector on one line so the label
        // sits level with the number and the separator.
        item: { alignItems: 'center' },
        separator: { h: '2' },
      },
      vertical: {
        root: { flexDirection: 'column' },
        item: { pb: '24', '&:last-of-type': { pb: '0' } },
        separator: { minH: '16', w: '2', mx: 'auto' },
        rail: {},
      },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
} satisfies RecipeConfig
