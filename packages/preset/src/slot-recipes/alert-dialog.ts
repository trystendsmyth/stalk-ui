import type { RecipeConfig } from '../types'

// Mirrors the Dialog surface but omits a dismiss affordance: an alert dialog
// interrupts and requires an explicit Action/Cancel choice.
export const alertDialog = {
  className: 'stalk-alert-dialog',
  description: 'Slot recipe for Radix-backed alert dialogs (confirmation prompts).',
  slots: ['overlay', 'content', 'header', 'title', 'description', 'footer'],
  base: {
    overlay: {
      pos: 'fixed',
      inset: '0',
      bgColor: 'black.a8',
      zIndex: 'modal',
    },
    content: {
      pos: 'fixed',
      insetInlineStart: '50%',
      insetBlockStart: '50%',
      w: 'min(calc(100vw - 2rem), 28rem)',
      maxH: 'calc(100vh - 2rem)',
      overflow: 'auto',
      transform: 'translate(-50%, -50%)',
      bgColor: 'bg.default',
      border: 'default',
      rounded: 'lg',
      shadow: 'lg',
      color: 'fg.default',
      p: '24',
      zIndex: 'modal',
    },
    header: {
      display: 'grid',
      gap: '6',
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
      flexWrap: 'wrap',
      gap: '12',
      justifyContent: 'flex-end',
      pt: 'base',
    },
  },
} satisfies RecipeConfig
