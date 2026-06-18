import type { RecipeConfig } from '../types'

export const numberInput = {
  className: 'stalk-number-input',
  description: 'Slot recipe for the NumberInput stepper column (stepper, button).',
  slots: ['stepper', 'button'],
  base: {
    // A vertical pair of increment/decrement buttons that fills the field height
    // and sits flush against the trailing edge of the input shell.
    stepper: {
      alignSelf: 'stretch',
      borderInlineStartWidth: '1px',
      borderColor: 'border.muted',
      display: 'inline-flex',
      flexDirection: 'column',
      flexShrink: 0,
    },
    button: {
      alignItems: 'center',
      appearance: 'none',
      bgColor: 'transparent',
      border: 'none',
      color: 'fg.muted',
      cursor: 'pointer',
      display: 'inline-flex',
      flex: '1 1 0',
      justifyContent: 'center',
      lineHeight: 0,
      m: 0,
      minH: 0,
      px: '6',
      transitionDuration: 'fast',
      transitionProperty: 'color, background-color',
      _hover: { bgColor: 'bg.muted', color: 'fg.default' },
      _focusVisible: {
        focusRingWidth: 'base',
        focusRingColor: 'accent.muted',
        focusRingOffsetWidth: '-1',
        focusRingOffsetColor: 'bg.canvas',
        zIndex: '1',
      },
      _disabled: { color: 'fg.muted', cursor: 'not-allowed', opacity: 0.4 },
      '&:first-of-type': { borderBlockEndWidth: '1px', borderColor: 'border.muted' },
      '& > svg': { h: '12', w: '12' },
    },
  },
} satisfies RecipeConfig
