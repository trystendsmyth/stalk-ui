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
      borderColor: 'border.default',
      borderRadius: 'lg',
      borderWidth: '1px',
      boxShadow: 'lg',
      color: 'fg.default',
      padding: '6',
      zIndex: 'modal',
    },
    header: {
      display: 'grid',
      gap: '1.5',
      paddingBlockEnd: '4',
    },
    title: {
      fontSize: 'lg',
      fontWeight: '650',
      lineHeight: '1.2',
    },
    description: {
      color: 'fg.muted',
      fontSize: 'sm',
      lineHeight: '1.6',
    },
    footer: {
      alignItems: 'center',
      display: 'flex',
      gap: '3',
      justifyContent: 'flex-end',
      paddingBlockStart: '4',
    },
    close: {
      position: 'absolute',
      insetBlockStart: '4',
      insetInlineEnd: '4',
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
