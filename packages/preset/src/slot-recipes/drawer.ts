import type { RecipeConfig } from '../types'

// Match the Sheet's side-panel footprint so the two components read as kin.
const panelWidth = 'min(calc(100vw - 3rem), 24rem)'

export const drawer = {
  className: 'stalk-drawer',
  description:
    'Slot recipe for the Drawer gesture sheet (Vaul-backed: overlay, draggable content with handle, header, footer). Geometry keys off Vaul’s `data-vaul-drawer-direction`, so `Drawer.Root direction` alone switches the edge.',
  slots: ['overlay', 'content', 'handle', 'header', 'title', 'description', 'body', 'footer'],
  base: {
    overlay: {
      bgColor: 'black.a8',
      inset: '0',
      pos: 'fixed',
      zIndex: 'modal',
    },
    // Bottom-edge geometry is the default; the other edges override via
    // Vaul's direction attribute (physical sides, matching its gesture math).
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
      '&[data-vaul-drawer-direction="top"]': {
        borderRadius: '0',
        borderBottomLeftRadius: 'lg',
        borderBottomRightRadius: 'lg',
        bottom: 'auto',
        top: '0',
      },
      '&[data-vaul-drawer-direction="left"]': {
        borderRadius: '0',
        borderTopRightRadius: 'lg',
        borderBottomRightRadius: 'lg',
        bottom: '0',
        insetInlineEnd: 'auto',
        insetInlineStart: 'auto',
        left: '0',
        maxH: 'none',
        top: '0',
        w: panelWidth,
      },
      '&[data-vaul-drawer-direction="right"]': {
        borderRadius: '0',
        borderTopLeftRadius: 'lg',
        borderBottomLeftRadius: 'lg',
        bottom: '0',
        insetInlineEnd: 'auto',
        insetInlineStart: 'auto',
        maxH: 'none',
        right: '0',
        top: '0',
        w: panelWidth,
      },
    },
    handle: {
      bgColor: 'bg.muted',
      borderRadius: 'full',
      flexShrink: 0,
      h: '4',
      mt: '12',
      mx: 'auto',
      w: '40',
      // Top drawer: handle moves to the trailing edge of the column.
      '[data-vaul-drawer-direction="top"] > &': {
        mb: '12',
        mt: '0',
        order: 999,
      },
      // Side drawers: vertical pill centered on the inner edge.
      '[data-vaul-drawer-direction="left"] > &': {
        h: '40',
        m: '0',
        pos: 'absolute',
        right: '8',
        top: '50%',
        transform: 'translateY(-50%)',
        w: '4',
      },
      '[data-vaul-drawer-direction="right"] > &': {
        h: '40',
        left: '8',
        m: '0',
        pos: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        w: '4',
      },
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
