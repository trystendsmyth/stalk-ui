import type { RecipeConfig } from '../types'

export const otpInput = {
  className: 'stalk-otp-input',
  description:
    'Slot recipe for the OTP / one-time-passcode input (root, group, slot, separator, caret).',
  slots: ['root', 'group', 'slot', 'separator', 'caret'],
  base: {
    root: {
      alignItems: 'center',
      color: 'fg.default',
      display: 'flex',
      gap: '8',
      '&:has(:disabled)': {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
    group: {
      alignItems: 'center',
      display: 'flex',
    },
    // Adjacent slots collapse their shared border via a -1px inline-start margin;
    // the first slot resets that and rounds its leading edge, the last rounds its
    // trailing edge. The active slot lifts above its neighbours so its focus ring
    // is not clipped.
    slot: {
      alignItems: 'center',
      bgColor: 'bg.canvas',
      border: 'default',
      color: 'fg.default',
      display: 'flex',
      justifyContent: 'center',
      marginInlineStart: '-1px',
      position: 'relative',
      transitionDuration: 'fast',
      transitionProperty: 'background-color, border-color, box-shadow',
      _first: {
        marginInlineStart: '0',
        roundedLeft: 'md',
      },
      _last: {
        roundedRight: 'md',
      },
      '&[data-active=true]': {
        borderColor: 'accent.solid',
        focusRingColor: 'accent.muted',
        focusRingWidth: 'base',
        zIndex: '1',
      },
    },
    separator: {
      alignItems: 'center',
      color: 'fg.muted',
      display: 'flex',
    },
    caret: {
      animation: 'pulse',
      bgColor: 'fg.default',
      h: '1em',
      pointerEvents: 'none',
      position: 'absolute',
      w: '1px',
    },
  },
  variants: {
    size: {
      sm: {
        slot: { boxSize: '32', textStyle: 'bodySm' },
      },
      md: {
        slot: { boxSize: '40', textStyle: 'body' },
      },
      lg: {
        slot: { boxSize: '48', textStyle: 'bodyLg' },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
} satisfies RecipeConfig
