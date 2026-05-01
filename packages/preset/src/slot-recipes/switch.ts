import type { RecipeConfig } from '../types'

export const switchRecipe = {
  className: 'stalk-switch',
  description: 'Slot recipe for the Stalk UI switch primitive (root + thumb).',
  slots: ['root', 'thumb'],
  base: {
    root: {
      alignItems: 'center',
      backgroundColor: 'border.default',
      borderRadius: 'full',
      cursor: 'pointer',
      display: 'inline-flex',
      flexShrink: 0,
      outline: 'none',
      padding: '2',
      position: 'relative',
      transitionDuration: 'fast',
      transitionProperty: 'background-color, border-color, box-shadow',
      _hover: {
        backgroundColor: 'border.hover',
      },
      _focusVisible: {
        focusRingWidth: 'base',
        focusRingColor: 'accent.subtle',
        focusRingOffsetWidth: '1',
        focusRingOffsetColor: 'bg.default',
      },
      _disabled: {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
      '&[data-state="checked"]': {
        backgroundColor: 'accent.solid',
      },
      '&[data-invalid], &[aria-invalid="true"]': {
        border: 'invalid',
        focusRingColor: 'danger.subtle',
      },
    },
    thumb: {
      backgroundColor: 'bg.default',
      borderRadius: 'full',
      boxShadow: 'sm',
      display: 'block',
      pointerEvents: 'none',
      transform: 'translateX(0)',
      transitionDuration: 'fast',
      transitionProperty: 'transform',
      transitionTimingFunction: 'ease-out',
      willChange: 'transform',
    },
  },
  variants: {
    size: {
      sm: {
        root: { height: 'base', width: '28' },
        thumb: {
          height: '12',
          width: '12',
          '[data-state="checked"] &': { transform: 'translateX(token(spacing.12))' },
        },
      },
      md: {
        root: { height: '20', width: '36' },
        thumb: {
          height: 'base',
          width: 'base',
          '[data-state="checked"] &': { transform: 'translateX(token(spacing.base))' },
        },
      },
      lg: {
        root: { height: '24', width: '44' },
        thumb: {
          height: '20',
          width: '20',
          '[data-state="checked"] &': { transform: 'translateX(token(spacing.20))' },
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
} satisfies RecipeConfig
