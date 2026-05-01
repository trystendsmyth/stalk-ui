import type { RecipeConfig } from '../types'

export const dialog = {
  className: 'stalk-dialog',
  description: 'Slot recipe for Radix-backed dialog layouts.',
  slots: ['overlay', 'content', 'header', 'title', 'description', 'footer', 'close'],
  base: {
    overlay: {
      position: 'fixed',
      inset: '0',
      backgroundColor: 'black.a8',
      zIndex: 'modal',
    },
    content: {
      position: 'fixed',
      insetInlineStart: '50%',
      insetBlockStart: '50%',
      width: 'min(calc(100vw - 2rem), 32rem)',
      maxHeight: 'calc(100vh - 2rem)',
      overflow: 'auto',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'bg.default',
      border: 'default',
      borderRadius: 'lg',
      boxShadow: 'lg',
      color: 'fg.default',
      padding: '24',
      zIndex: 'modal',
    },
    header: {
      display: 'grid',
      gap: '6',
      paddingBlockEnd: 'base',
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
      paddingBlockStart: 'base',
    },
    close: {
      position: 'absolute',
      insetBlockStart: 'base',
      insetInlineEnd: 'base',
      borderRadius: 'sm',
      _focusVisible: {
        focusRingWidth: 'base',
        focusRingColor: 'accent.subtle',
        focusRingOffsetWidth: '1',
        focusRingOffsetColor: 'bg.default',
      },
    },
  },
} satisfies RecipeConfig
