import type { RecipeConfig } from '../types'

export const accordion = {
  className: 'stalk-accordion',
  description: 'Slot recipe for Radix-backed accordion layouts.',
  slots: ['root', 'item', 'header', 'trigger', 'content', 'icon'],
  base: {
    root: {
      display: 'block',
      w: 'full',
    },
    item: {
      borderBlockEndWidth: '1px',
      borderBlockEndStyle: 'solid',
      borderColor: 'border.muted',
      '&:last-of-type': {
        borderBlockEndWidth: '0',
      },
    },
    header: {
      display: 'flex',
      m: '0',
      w: 'full',
    },
    trigger: {
      alignItems: 'center',
      appearance: 'none',
      bgColor: 'transparent',
      border: 'none',
      color: 'fg.default',
      cursor: 'pointer',
      display: 'flex',
      flex: '1',
      font: 'inherit',
      fontWeight: 'medium',
      gap: '8',
      justifyContent: 'space-between',
      m: '0',
      outline: 'none',
      py: '16',
      textAlign: 'start',
      transitionDuration: 'fast',
      transitionProperty: 'color',
      w: 'full',
      '&:not(:disabled):hover': {
        color: 'accent.solid',
      },
      _focusVisible: {
        focusRingWidth: 'base',
        focusRingColor: 'accent.subtle',
        focusRingOffsetWidth: '1',
        focusRingOffsetColor: 'bg.default',
        rounded: 'sm',
      },
      _disabled: {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
      '&[data-state="open"] > svg': {
        transform: 'rotate(180deg)',
      },
    },
    icon: {
      color: 'fg.muted',
      flexShrink: 0,
      transitionDuration: 'fast',
      transitionProperty: 'transform',
    },
    content: {
      color: 'fg.muted',
      overflow: 'hidden',
      textStyle: 'bodySm',
      animationDuration: 'normal',
      animationTimingFunction: 'ease-out',
      '&[data-state="open"]': {
        animationName: 'accordion-down',
        pb: '16',
      },
      '&[data-state="closed"]': {
        animationName: 'accordion-up',
      },
      '@media (prefers-reduced-motion: reduce)': {
        animationDuration: '0s',
      },
    },
  },
  variants: {
    variant: {
      inline: {},
      card: {
        root: {
          bgColor: 'bg.subtle',
          border: 'default',
          rounded: 'md',
          overflow: 'hidden',
          shadow: 'sm',
        },
        trigger: {
          bgColor: 'bg.default',
          px: '16',
          _focusVisible: {
            rounded: '0',
          },
        },
        content: {
          px: '16',
          '&[data-state="open"]': {
            borderBlockStartWidth: '1px',
            borderBlockStartStyle: 'solid',
            borderBlockStartColor: 'border.muted',
            pt: '16',
          },
        },
      },
    },
  },
  defaultVariants: {
    variant: 'inline',
  },
} satisfies RecipeConfig
