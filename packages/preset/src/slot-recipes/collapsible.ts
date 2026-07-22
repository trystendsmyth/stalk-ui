import type { RecipeConfig } from '../types'

export const collapsible = {
  className: 'stalk-collapsible',
  description: 'Slot recipe for Radix-backed collapsible panels.',
  jsx: [
    'Collapsible',
    'CollapsibleRoot',
    'CollapsibleContent',
    'CollapsibleTrigger',
    /^Collapsible\./,
  ],
  slots: ['root', 'trigger', 'content'],
  base: {
    root: {
      display: 'block',
      w: 'full',
    },
    trigger: {
      alignItems: 'center',
      appearance: 'none',
      bgColor: 'transparent',
      border: 'none',
      color: 'fg.default',
      cursor: 'pointer',
      display: 'inline-flex',
      font: 'inherit',
      fontWeight: 'medium',
      gap: '6',
      m: '0',
      outline: 'none',
      p: '0',
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
    },
    content: {
      color: 'fg.muted',
      overflow: 'hidden',
      textStyle: 'bodySm',
      animationDuration: 'normal',
      animationTimingFunction: 'ease-out',
      '&[data-state="open"]': {
        animationName: 'collapsible-down',
      },
      '&[data-state="closed"]': {
        animationName: 'collapsible-up',
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
          p: '16',
          shadow: 'sm',
        },
        content: {
          pt: '12',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'inline',
  },
} satisfies RecipeConfig
