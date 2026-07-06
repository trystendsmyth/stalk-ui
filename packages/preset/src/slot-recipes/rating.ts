import type { RecipeConfig } from '../types'

export const rating = {
  className: 'stalk-rating',
  description:
    'Slot recipe for the Rating control (radio-group semantics; active items fill with the accent).',
  slots: ['root', 'item', 'icon'],
  base: {
    root: {
      display: 'inline-flex',
      gap: '2',
    },
    item: {
      alignItems: 'center',
      appearance: 'none',
      bgColor: 'transparent',
      border: 'none',
      borderRadius: 'sm',
      color: 'fg.subtle',
      cursor: 'pointer',
      display: 'inline-flex',
      justifyContent: 'center',
      p: '2',
      transitionDuration: 'fast',
      transitionProperty: 'color, transform',
      '&[data-active]': { color: 'warning.vivid' },
      '&[data-readonly]': { cursor: 'default' },
      _disabled: { cursor: 'not-allowed', opacity: 0.5 },
      _focusVisible: {
        focusRingWidth: 'base',
        focusRingColor: 'accent.muted',
        focusRingOffsetWidth: '0',
      },
    },
    icon: {
      display: 'block',
      '&[data-active] , [data-active] &': { fill: 'currentcolor' },
    },
  },
  variants: {
    size: {
      sm: { icon: { boxSize: '14' } },
      md: { icon: { boxSize: '18' } },
      lg: { icon: { boxSize: '24' } },
    },
  },
  defaultVariants: {
    size: 'md',
  },
} satisfies RecipeConfig
