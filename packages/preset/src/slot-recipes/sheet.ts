import type { RecipeConfig } from '../types'

const panelWidth = 'min(calc(100vw - 3rem), 24rem)'
const panelHeight = 'min(calc(100vh - 3rem), 24rem)'

export const sheet = {
  className: 'stalk-sheet',
  description: 'Slot recipe for edge-anchored Sheet panels backed by Radix Dialog.',
  slots: ['overlay', 'content', 'header', 'title', 'description', 'footer', 'close'],
  base: {
    overlay: {
      pos: 'fixed',
      inset: '0',
      bgColor: 'black.a8',
      zIndex: 'modal',
      animationDuration: 'fast',
      animationTimingFunction: 'ease-out',
      '&[data-state="open"]': { animationName: 'fade-in' },
      '&[data-state="closed"]': { animationName: 'fade-out' },
      '@media (prefers-reduced-motion: reduce)': { animationDuration: '0s' },
    },
    content: {
      pos: 'fixed',
      zIndex: 'modal',
      display: 'flex',
      flexDirection: 'column',
      gap: '16',
      bgColor: 'bg.default',
      color: 'fg.default',
      shadow: 'lg',
      p: '24',
      animationDuration: 'normal',
      animationTimingFunction: 'ease-out',
      '@media (prefers-reduced-motion: reduce)': { animationDuration: '0s' },
    },
    header: {
      display: 'grid',
      gap: '6',
      pe: '32',
    },
    title: {
      textStyle: 'h5',
    },
    description: {
      color: 'fg.muted',
      textStyle: 'bodySm',
    },
    footer: {
      alignItems: 'center',
      display: 'flex',
      gap: '12',
      justifyContent: 'flex-end',
      mt: 'auto',
      pt: 'base',
    },
    close: {
      pos: 'absolute',
      insetBlockStart: '12',
      insetInlineEnd: '12',
      alignItems: 'center',
      appearance: 'none',
      bgColor: 'transparent',
      border: 'none',
      rounded: 'sm',
      color: 'fg.muted',
      cursor: 'pointer',
      display: 'inline-flex',
      flexShrink: 0,
      font: 'inherit',
      h: '28',
      justifyContent: 'center',
      lineHeight: 1,
      m: '0',
      p: '0',
      w: '28',
      _hover: {
        bgColor: 'bg.subtle',
        color: 'fg.default',
      },
      _focusVisible: {
        focusRingWidth: 'base',
        focusRingColor: 'accent.subtle',
        focusRingOffsetWidth: '1',
        focusRingOffsetColor: 'bg.default',
      },
      '& > svg': {
        flexShrink: 0,
        h: '16',
        w: '16',
      },
    },
  },
  variants: {
    // Physical side names match the offscreen slide origin so the animation
    // direction stays consistent in both LTR and RTL.
    side: {
      top: {
        content: {
          insetBlockStart: '0',
          insetInline: '0',
          w: 'full',
          maxH: panelHeight,
          borderBlockEndWidth: 'xs',
          borderBlockEndStyle: 'solid',
          borderBlockEndColor: 'border.default',
          '&[data-state="open"]': { animationName: 'slide-in-from-top' },
          '&[data-state="closed"]': { animationName: 'slide-out-to-top' },
        },
      },
      bottom: {
        content: {
          insetBlockEnd: '0',
          insetInline: '0',
          w: 'full',
          maxH: panelHeight,
          borderBlockStartWidth: 'xs',
          borderBlockStartStyle: 'solid',
          borderBlockStartColor: 'border.default',
          '&[data-state="open"]': { animationName: 'slide-in-from-bottom' },
          '&[data-state="closed"]': { animationName: 'slide-out-to-bottom' },
        },
      },
      left: {
        content: {
          top: '0',
          bottom: '0',
          left: '0',
          h: 'full',
          w: panelWidth,
          borderInlineEndWidth: 'xs',
          borderInlineEndStyle: 'solid',
          borderInlineEndColor: 'border.default',
          '&[data-state="open"]': { animationName: 'slide-in-from-left' },
          '&[data-state="closed"]': { animationName: 'slide-out-to-left' },
        },
      },
      right: {
        content: {
          top: '0',
          bottom: '0',
          right: '0',
          h: 'full',
          w: panelWidth,
          borderInlineStartWidth: 'xs',
          borderInlineStartStyle: 'solid',
          borderInlineStartColor: 'border.default',
          '&[data-state="open"]': { animationName: 'slide-in-from-right' },
          '&[data-state="closed"]': { animationName: 'slide-out-to-right' },
        },
      },
    },
  },
  defaultVariants: {
    side: 'right',
  },
} satisfies RecipeConfig
