import type { RecipeConfig } from '../types'

export const dialog = {
  className: 'stalk-dialog',
  description: 'Slot recipe for Radix-backed dialog layouts.',
  jsx: [
    'Dialog',
    'DialogRoot',
    'DialogTrigger',
    'DialogPortal',
    'DialogClose',
    'DialogOverlay',
    'DialogContent',
    'DialogHeader',
    'DialogHeaderActions',
    'DialogTitle',
    'DialogDescription',
    'DialogBody',
    'DialogFooter',
    /^Dialog\./,
  ],
  slots: [
    'overlay',
    'content',
    'body',
    'header',
    'headerActions',
    'title',
    'description',
    'footer',
    'close',
  ],
  base: {
    overlay: {
      pos: 'fixed',
      inset: '0',
      bgColor: 'black.a8',
      zIndex: 'modal',
      '&[data-state="open"]': {
        animationName: 'enter',
        animationDuration: 'fast',
        '--enter-opacity': '0',
      },
      '&[data-state="closed"]': {
        animationName: 'exit',
        animationDuration: 'fast',
        animationFillMode: 'forwards',
        '--exit-opacity': '0',
      },
      _motionReduce: { animationName: 'none' },
    },
    content: {
      pos: 'fixed',
      insetInlineStart: '50%',
      insetBlockStart: '50%',
      w: 'min(calc(100vw - 2rem), 32rem)',
      maxH: 'calc(100vh - 2rem)',
      overflow: 'auto',
      // Center via `translate` so the enter/exit keyframes and the drag offset
      // can own `transform` without clobbering the centering.
      translate: '-50% -50%',
      bgColor: 'bg.default',
      border: 'default',
      rounded: 'lg',
      shadow: 'lg',
      color: 'fg.default',
      p: '24',
      zIndex: 'modal',
      // Animates a draggable panel's snap-back; drag suppresses it inline.
      transitionProperty: 'transform',
      transitionDuration: 'fast',
      '&[data-state="open"]': {
        animationName: 'enter',
        animationDuration: 'fast',
        '--enter-opacity': '0',
        '--enter-scale': '0.97',
      },
      '&[data-state="closed"]': {
        animationName: 'exit',
        animationDuration: 'fast',
        animationFillMode: 'forwards',
        '--exit-opacity': '0',
        '--exit-scale': '0.97',
      },
      _motionReduce: { animationName: 'none' },
    },
    // Plain block; an unconditional overflow here would clip child focus rings.
    body: {},
    header: {
      display: 'grid',
      gap: '6',
      pb: 'base',
      pe: '32',
      // With an actions cluster the header becomes a horizontal bar; the
      // actions pin trailing via their own auto margin, so lead children
      // (title, hint, or a stacked column) keep natural widths.
      '&:has(> .stalk-dialog__headerActions)': {
        display: 'flex',
        alignItems: 'center',
        gap: '12',
        pe: '0',
        '& > :first-child': { minW: '0' },
      },
    },
    headerActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '4',
      flexShrink: 0,
      ms: 'auto',
      // An inline close goes back to static from its corner-absolute default.
      '& .stalk-dialog__close': { pos: 'static' },
    },
    title: {
      textStyle: 'h5',
      fontWeight: 'semibold',
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
    // Who owns the padding. `padded` (default): the content pads and regions
    // are text blocks. `banded`: the content is a bare shell and header/body/
    // footer are full-width bands with separators — even spacing, and a
    // draggable header is naturally full-bleed. Stacked title+description in
    // a banded header goes in a wrapper column (the bar's lead child fills).
    layout: {
      padded: {},
      banded: {
        content: {
          p: '0',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          '& > .stalk-dialog__header': {
            display: 'flex',
            alignItems: 'center',
            gap: '12',
            minH: '44',
            ps: '24',
            pe: '56',
            py: '12',
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
            borderBottomColor: 'border.muted',
            '& > :first-child': { minW: '0' },
            '&:has(> .stalk-dialog__headerActions)': { pe: '12' },
          },
          '& > .stalk-dialog__body': {
            flex: '1 1 auto',
            minH: '0',
            overflowY: 'auto',
            px: '24',
            py: '16',
          },
          '& > .stalk-dialog__footer': {
            px: '24',
            py: '12',
            borderTopWidth: '1px',
            borderTopStyle: 'solid',
            borderTopColor: 'border.muted',
          },
        },
      },
    },
    // `outside` scrolls the whole panel; `inside` pins header/footer and the
    // body scrolls (styled via descendant rule — no variant on Dialog.Body).
    scrollBehavior: {
      outside: {},
      inside: {
        content: {
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          '& .stalk-dialog__body': {
            flex: '1 1 auto',
            minH: '0',
            overflowY: 'auto',
          },
        },
      },
    },
  },
  defaultVariants: {
    layout: 'padded',
    scrollBehavior: 'outside',
  },
} satisfies RecipeConfig
