import type { RecipeConfig } from '../types'

export const drawer = {
  className: 'stalk-drawer',
  description:
    'Slot recipe for the Drawer bottom sheet (Vaul-backed: overlay, draggable content with handle, header, footer).',
  slots: ['overlay', 'content', 'handle', 'header', 'title', 'description', 'body', 'footer'],
  base: {
    overlay: {
      bgColor: 'black.a8',
      inset: '0',
      pos: 'fixed',
      zIndex: 'modal',
    },
    content: {
      bgColor: 'bg.default',
      borderTopLeftRadius: 'lg',
      borderTopRightRadius: 'lg',
      bottom: '0',
      display: 'flex',
      flexDirection: 'column',
      insetInlineEnd: '0',
      insetInlineStart: '0',
      maxH: '96%',
      outline: 'none',
      pos: 'fixed',
      zIndex: 'modal',
    },
    handle: {
      bgColor: 'bg.muted',
      borderRadius: 'full',
      flexShrink: 0,
      h: '4',
      mt: '12',
      mx: 'auto',
      w: '40',
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4',
      p: '16',
      textAlign: 'center',
    },
    title: {
      color: 'fg.default',
      fontWeight: 'semibold',
      m: '0',
      textStyle: 'h5',
    },
    description: {
      color: 'fg.muted',
      m: '0',
      textStyle: 'bodySm',
    },
    body: {
      flex: '1',
      overflowY: 'auto',
      px: '16',
    },
    footer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8',
      p: '16',
    },
  },
} satisfies RecipeConfig
