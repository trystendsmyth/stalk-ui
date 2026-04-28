import type { UtilityConfig } from '@pandacss/types'

const ringWidthValues = {
  0: '0rem',
  1: '0.0625rem',
  2: '0.125rem',
  base: '0.1875rem',
  4: '0.25rem',
} as const

const ringOffsetValues = {
  0: '0rem',
  1: '0.0625rem',
  2: '0.125rem',
  4: '0.25rem',
  8: '0.5rem',
} as const

export const focusRing: UtilityConfig = {
  focusRingWidth: {
    className: 'focus-ring-width',
    values: ringWidthValues,
    transform(value: string) {
      return {
        '--ring-offset-shadow': `var(--ring-inset,) 0 0 0 var(--ring-offset-width, ${ringOffsetValues[0]}) var(--ring-offset-color)`,
        '--ring-shadow': `var(--ring-inset,) 0 0 0 calc(${value} + var(--ring-offset-width, ${ringOffsetValues[0]})) var(--ring-color)`,
        boxShadow: 'var(--ring-offset-shadow),var(--ring-shadow),var(--base-shadow,0 0 #0000)',
      }
    },
  },
  focusRingColor: {
    className: 'focus-ring-color',
    values: 'colors',
    transform(value: string) {
      return {
        '--ring-color': value,
      }
    },
  },
  focusRingOffsetWidth: {
    className: 'focus-ring-offset-width',
    values: ringOffsetValues,
    transform(value: string) {
      return {
        '--ring-offset-width': value,
      }
    },
  },
  focusRingOffsetColor: {
    className: 'focus-ring-offset-color',
    values: 'colors',
    transform(value: string) {
      return {
        '--ring-offset-color': value,
      }
    },
  },
  focusRingInset: {
    className: 'focus-ring-inset',
    values: { type: 'boolean' },
    transform(value: string) {
      return {
        '--ring-inset': value ? 'inset' : '',
      }
    },
  },
}
