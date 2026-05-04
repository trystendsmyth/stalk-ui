import type { RecipeConfig } from '../types'

export const select = {
  className: 'stalk-select',
  description: 'Slot recipe for the Stalk UI select primitive.',
  slots: ['trigger', 'content', 'viewport', 'item', 'itemIndicator', 'label', 'separator'],
  base: {
    trigger: {
      alignItems: 'center',
      appearance: 'none',
      bgColor: 'bg.default',
      border: 'default',
      rounded: 'md',
      color: 'fg.default',
      cursor: 'pointer',
      display: 'inline-flex',
      gap: '8',
      justifyContent: 'space-between',
      minW: '0',
      outline: 'none',
      transitionDuration: 'fast',
      transitionProperty: 'background-color, border-color, box-shadow',
      w: 'full',
      _disabled: {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
      _hover: {
        border: 'hover',
      },
      _focusVisible: {
        border: 'focus',
        focusRingWidth: 'base',
        focusRingColor: 'accent.subtle',
        focusRingOffsetWidth: '1',
        focusRingOffsetColor: 'bg.default',
      },
      '&[data-placeholder]': {
        color: 'fg.muted',
      },
      '&[data-invalid], &[aria-invalid="true"]': {
        border: 'invalid',
        focusRingColor: 'danger.subtle',
      },
      '& > svg': {
        color: 'fg.muted',
        flexShrink: 0,
      },
    },
    content: {
      bgColor: 'bg.default',
      border: 'default',
      rounded: 'md',
      shadow: 'lg',
      color: 'fg.default',
      maxH: 'var(--radix-select-content-available-height)',
      minW: 'var(--radix-select-trigger-width)',
      overflow: 'hidden',
      zIndex: 'popover',
    },
    viewport: {
      p: '4',
    },
    item: {
      alignItems: 'center',
      rounded: 'sm',
      cursor: 'default',
      display: 'flex',
      fontSize: 'sm',
      gap: '8',
      minH: '32',
      outline: 'none',
      pe: '8',
      ps: '28',
      pos: 'relative',
      userSelect: 'none',
      _highlighted: {
        bgColor: 'accent.subtle',
        color: 'accent.fg',
      },
      _disabled: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
    },
    itemIndicator: {
      alignItems: 'center',
      display: 'inline-flex',
      insetInlineStart: '6',
      justifyContent: 'center',
      pos: 'absolute',
      top: '0',
      bottom: '0',
      w: '16',
    },
    label: {
      color: 'fg.muted',
      fontSize: 'xs',
      fontWeight: 'semibold',
      py: '6',
      px: '8',
    },
    separator: {
      bgColor: 'border.muted',
      h: 'px',
      my: '4',
    },
  },
  variants: {
    size: {
      sm: {
        trigger: { fontSize: 'sm', minH: '32', px: '12' },
      },
      md: {
        trigger: { fontSize: 'sm', minH: '40', px: 'base' },
      },
      lg: {
        trigger: { fontSize: 'base', minH: '48', px: '20' },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
} satisfies RecipeConfig
