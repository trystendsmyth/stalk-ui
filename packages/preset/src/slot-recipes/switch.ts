import type { RecipeConfig } from '../types'

export const switchRecipe = {
  className: 'stalk-switch',
  description: 'Slot recipe for the Stalk UI switch primitive (root + thumb).',
  slots: ['root', 'thumb'],
  base: {
    root: {
      alignItems: 'center',
      bgColor: 'border.default',
      rounded: 'full',
      cursor: 'pointer',
      display: 'inline-flex',
      flexShrink: 0,
      outline: 'none',
      p: '2',
      pos: 'relative',
      transitionDuration: 'fast',
      transitionProperty: 'background-color, border-color, box-shadow',
      _hover: {
        bgColor: 'border.hover',
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
        bgColor: 'accent.solid',
      },
      '&[data-invalid], &[aria-invalid="true"]': {
        border: 'invalid',
        focusRingColor: 'danger.subtle',
      },
    },
    thumb: {
      bgColor: 'bg.default',
      rounded: 'full',
      shadow: 'sm',
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
        root: { h: 'base', w: '28' },
        thumb: {
          h: '12',
          w: '12',
          '[data-state="checked"] &': { transform: 'translateX(token(spacing.12))' },
        },
      },
      md: {
        root: { h: '20', w: '36' },
        thumb: {
          h: 'base',
          w: 'base',
          '[data-state="checked"] &': { transform: 'translateX(token(spacing.base))' },
        },
      },
      lg: {
        root: { h: '24', w: '44' },
        thumb: {
          h: '20',
          w: '20',
          '[data-state="checked"] &': { transform: 'translateX(token(spacing.20))' },
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
} satisfies RecipeConfig
