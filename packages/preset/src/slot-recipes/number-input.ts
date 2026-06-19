import type { RecipeConfig } from '../types'

export const numberInput = {
  className: 'stalk-number-input',
  description: 'Slot recipe for NumberInput (root shell, field, stepper, button).',
  slots: ['root', 'field', 'stepper', 'button'],
  base: {
    // Own shell (mirrors `input`) so steppers can sit flush against the edges —
    // `overflow: hidden` clips the flush buttons to the rounded corners.
    root: {
      alignItems: 'stretch',
      bgColor: 'bg.canvas',
      border: 'default',
      color: 'fg.default',
      cursor: 'text',
      display: 'inline-flex',
      overflow: 'hidden',
      rounded: 'md',
      transitionDuration: 'fast',
      transitionProperty: 'background-color, border-color, box-shadow',
      w: 'full',
      _focusWithin: {
        borderColor: 'accent.solid',
        focusRingWidth: 'base',
        focusRingColor: 'accent.muted',
        focusRingOffsetWidth: '2',
        focusRingOffsetColor: 'bg.default',
      },
    },
    field: {
      appearance: 'none',
      bgColor: 'transparent',
      border: 'none',
      color: 'inherit',
      flex: '1 1 auto',
      minW: '0',
      outline: 'none',
      textAlign: 'end',
      w: 'full',
      _disabled: { cursor: 'not-allowed' },
      _placeholder: { color: 'fg.muted' },
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: '0',
      },
    },
    // Stacked layout: a vertical column of up/down buttons.
    stepper: {
      alignSelf: 'stretch',
      borderInlineStartWidth: '1px',
      borderColor: 'border.default',
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
      '& > svg': { h: '14', w: '14' },
    },
  },
  variants: {
    size: {
      sm: {
        root: { minH: '32' },
        field: { px: '12', textStyle: 'bodySm' },
        button: { px: '8' },
      },
      md: {
        root: { minH: '40' },
        field: { px: 'base', textStyle: 'body' },
        button: { px: '10' },
      },
      lg: {
        root: { minH: '48' },
        field: { px: '20', textStyle: 'bodyLg' },
        button: { px: '12' },
      },
    },
    layout: {
      // Vertical chevrons stacked flush against one side of the field.
      stacked: {
        button: { '&:first-of-type': { borderBottomWidth: '1px', borderColor: 'border.default' } },
      },
      // Minus on the leading edge, plus on the trailing edge, value centered.
      split: {
        field: { textAlign: 'center' },
        button: {
          aspectRatio: 'square',
          flex: '0 0 auto',
          '&:first-of-type': { borderInlineEndWidth: '1px', borderColor: 'border.default' },
          '&:last-of-type': { borderInlineStartWidth: '1px', borderColor: 'border.default' },
          '& > svg': { h: '16', w: '16' },
        },
      },
    },
    disabled: {
      true: { root: { cursor: 'not-allowed', opacity: 0.5 } },
    },
    invalid: {
      true: {
        root: {
          borderColor: 'danger.solid',
          _focusWithin: {
            borderColor: 'danger.solid',
            focusRingWidth: 'base',
            focusRingColor: 'danger.muted',
            focusRingOffsetWidth: '2',
            focusRingOffsetColor: 'bg.default',
          },
        },
      },
    },
  },
  defaultVariants: {
    disabled: false,
    invalid: false,
    layout: 'stacked',
    size: 'md',
  },
} satisfies RecipeConfig
