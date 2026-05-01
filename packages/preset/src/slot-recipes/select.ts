import type { RecipeConfig } from '../types'

export const select = {
  className: 'stalk-select',
  description: 'Slot recipe for the Stalk UI select primitive.',
  slots: ['trigger', 'content', 'viewport', 'item', 'itemIndicator', 'label', 'separator'],
  base: {
    trigger: {
      alignItems: 'center',
      appearance: 'none',
      backgroundColor: 'bg.default',
      border: 'default',
      borderRadius: 'md',
      color: 'fg.default',
      cursor: 'pointer',
      display: 'inline-flex',
      gap: '8',
      justifyContent: 'space-between',
      minWidth: '0',
      outline: 'none',
      transitionDuration: 'fast',
      transitionProperty: 'background-color, border-color, box-shadow',
      width: 'full',
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
      backgroundColor: 'bg.default',
      border: 'default',
      borderRadius: 'md',
      boxShadow: 'lg',
      color: 'fg.default',
      maxHeight: 'var(--radix-select-content-available-height)',
      minWidth: 'var(--radix-select-trigger-width)',
      overflow: 'hidden',
      zIndex: 'popover',
    },
    viewport: {
      padding: '4',
    },
    item: {
      alignItems: 'center',
      borderRadius: 'sm',
      cursor: 'default',
      display: 'flex',
      fontSize: 'sm',
      gap: '8',
      minHeight: '32',
      outline: 'none',
      paddingInlineEnd: '8',
      paddingInlineStart: '28',
      position: 'relative',
      userSelect: 'none',
      _highlighted: {
        backgroundColor: 'accent.subtle',
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
      position: 'absolute',
      top: '0',
      bottom: '0',
      width: '16',
    },
    label: {
      color: 'fg.muted',
      fontSize: 'xs',
      fontWeight: 'semibold',
      paddingBlock: '6',
      paddingInline: '8',
    },
    separator: {
      backgroundColor: 'border.muted',
      height: 'px',
      marginBlock: '4',
    },
  },
  variants: {
    size: {
      sm: {
        trigger: { fontSize: 'sm', minHeight: '32', paddingInline: '12' },
      },
      md: {
        trigger: { fontSize: 'sm', minHeight: '40', paddingInline: 'base' },
      },
      lg: {
        trigger: { fontSize: 'base', minHeight: '48', paddingInline: '20' },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
} satisfies RecipeConfig
