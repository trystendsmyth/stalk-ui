import type { RecipeConfig } from '../types'

export const button = {
  className: 'stalk-button',
  description: 'Button styles shared by copied Stalk UI button components.',
  jsx: ['Button', 'CopyButton', /^Button\./],
  base: {
    alignItems: 'center',
    colorPalette: 'accent',
    rounded: 'md',
    cursor: 'pointer',
    display: 'inline-flex',
    fontWeight: 'semibold',
    gap: '8',
    justifyContent: 'center',
    outline: 'none',
    pos: 'relative',
    transitionDuration: 'fast',
    transitionProperty: 'background-color, border-color, color, box-shadow',
    // Inline icon children (lucide/svg) inherit color and ignore pointer
    // events; size + icon-only square dimensions travel with the size variant.
    '& > svg': {
      flexShrink: 0,
      pointerEvents: 'none',
    },
    _enabledActive: { transform: 'scale(0.96)' },
    _disabled: {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    // `asChild` strips `disabled` (invalid on <a>), so mirror on aria-disabled.
    '&[aria-disabled="true"]': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    _focusVisible: {
      focusRingWidth: 'base',
      focusRingColor: 'colorPalette.muted',
      focusRingOffsetWidth: '2',
      focusRingOffsetColor: 'bg.default',
    },
  },
  variants: {
    variant: {
      solid: {
        bgColor: 'colorPalette.solid',
        color: 'colorPalette.contrast',
        _enabledHover: { bgColor: 'colorPalette.emphasis' },
      },
      outline: {
        border: 'default',
        borderColor: 'colorPalette.muted',
        color: 'fg.default',
        _enabledHover: {
          bgColor: 'colorPalette.subtle',
          borderColor: 'colorPalette.solid',
        },
      },
      ghost: {
        color: 'fg.default',
        _enabledHover: { bgColor: 'colorPalette.subtle' },
      },
      subtle: {
        bgColor: 'colorPalette.subtle',
        color: 'colorPalette.fg',
        _enabledHover: { bgColor: 'colorPalette.muted' },
      },
    },
    size: {
      sm: {
        minH: '32',
        px: '12',
        textStyle: 'bodySm',
        '& > svg': { h: '14', w: '14' },
        '&:has(> svg:only-child)': { px: '0', w: '32' },
      },
      md: {
        minH: '36',
        px: 'base',
        textStyle: 'body',
        '& > svg': { h: '16', w: '16' },
        '&:has(> svg:only-child)': { px: '0', w: '36' },
      },
      lg: {
        minH: '42',
        px: '20',
        textStyle: 'bodyLg',
        '& > svg': { h: '18', w: '18' },
        '&:has(> svg:only-child)': { px: '0', w: '42' },
      },
    },
    // Stretch to fill the inline container (column-spanning CTAs) — shares the
    // width vocabulary with the other recipes' content-width/full-width knobs.
    fullWidth: {
      true: { w: 'full' },
      false: {},
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'solid',
  },
} satisfies RecipeConfig
