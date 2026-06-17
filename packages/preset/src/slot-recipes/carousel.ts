import type { RecipeConfig } from '../types'

const control = {
  position: 'absolute',
  display: 'inline-flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  blockSize: '32',
  inlineSize: '32',
  rounded: 'full',
  border: 'default',
  bgColor: 'bg.default',
  color: 'fg.default',
  cursor: 'pointer',
  outline: 'none',
  transitionProperty: 'background-color, border-color',
  transitionDuration: 'fast',
  '& > svg': { h: '16', w: '16', pointerEvents: 'none' },
  _hover: { bgColor: 'bg.subtle', borderColor: 'border.hover' },
  _focusVisible: {
    focusRingWidth: 'base',
    focusRingColor: 'accent.subtle',
    focusRingOffsetWidth: '2',
    focusRingOffsetColor: 'bg.default',
  },
  _disabled: { opacity: 0.4, cursor: 'not-allowed' },
} as const

export const carousel = {
  className: 'stalk-carousel',
  description: 'Slot recipe for Embla-backed carousels.',
  slots: ['root', 'viewport', 'content', 'item', 'previous', 'next'],
  base: {
    root: { position: 'relative' },
    viewport: { overflow: 'hidden' },
    content: { display: 'flex' },
    item: { minW: '0', flexShrink: 0, flexGrow: 0, flexBasis: 'full' },
    previous: control,
    next: control,
  },
  variants: {
    orientation: {
      horizontal: {
        content: { marginInlineStart: '-16' },
        item: { paddingInlineStart: '16' },
        // Sit fully outside the viewport (with an 8px gap) so the controls never
        // overlap the slides. The wrapping element must leave room (e.g. px).
        previous: {
          insetInlineEnd: '100%',
          marginInlineEnd: '8',
          top: '50%',
          transform: 'translateY(-50%)',
        },
        next: {
          insetInlineStart: '100%',
          marginInlineStart: '8',
          top: '50%',
          transform: 'translateY(-50%)',
        },
      },
      vertical: {
        // Vertical embla needs a measured viewport height; it inherits from the
        // height the consumer sets on the Carousel root.
        viewport: { blockSize: 'full' },
        content: { flexDirection: 'column', marginBlockStart: '-16' },
        item: { paddingBlockStart: '16' },
        previous: {
          insetBlockEnd: '100%',
          marginBlockEnd: '8',
          insetInlineStart: '50%',
          transform: 'translateX(-50%) rotate(90deg)',
        },
        next: {
          insetBlockStart: '100%',
          marginBlockStart: '8',
          insetInlineStart: '50%',
          transform: 'translateX(-50%) rotate(90deg)',
        },
      },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
} satisfies RecipeConfig
