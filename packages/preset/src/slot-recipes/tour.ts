import type { RecipeConfig } from '../types'

export const tour = {
  className: 'stalk-tour',
  description:
    'Slot recipe for the Tour guide (spotlight overlay around a target plus a positioned step card).',
  slots: ['spotlight', 'arrow', 'content', 'title', 'description', 'footer', 'counter', 'actions'],
  base: {
    // A transparent box over the target; the huge spread shadow dims everything
    // around it, producing the spotlight without covering the target itself.
    spotlight: {
      borderRadius: 'md',
      boxShadow: '0 0 0 200vmax {colors.black.a8}',
      pointerEvents: 'none',
      pos: 'fixed',
      zIndex: 'modal',
    },
    // Rotated square whose two bordered edges form the pointer; the unbordered
    // half overlaps the card, covering its border segment for a seamless notch.
    arrow: {
      bgColor: 'bg.default',
      borderColor: 'border.default',
      borderStyle: 'solid',
      borderWidth: '1px 0 0 1px',
      h: '12px',
      pointerEvents: 'none',
      pos: 'fixed',
      transform: 'rotate(45deg)',
      w: '12px',
      zIndex: 'modal',
    },
    content: {
      bgColor: 'bg.default',
      border: 'default',
      borderRadius: 'lg',
      boxShadow: 'lg',
      display: 'flex',
      flexDirection: 'column',
      gap: '8',
      p: '16',
      pos: 'fixed',
      // Fixed width (viewport-clamped) so the JS card/arrow geometry is exact.
      w: 'min(320px, calc(100vw - 20px))',
      zIndex: 'modal',
    },
    title: {
      color: 'fg.default',
      fontWeight: 'semibold',
      m: '0',
      textStyle: 'bodyLg',
    },
    description: {
      color: 'fg.muted',
      m: '0',
      textStyle: 'bodySm',
    },
    footer: {
      alignItems: 'center',
      display: 'flex',
      gap: '8',
      justifyContent: 'space-between',
      mt: '4',
    },
    counter: {
      color: 'fg.subtle',
      fontSize: 'xs',
    },
    actions: {
      alignItems: 'center',
      display: 'flex',
      gap: '8',
    },
  },
} satisfies RecipeConfig
