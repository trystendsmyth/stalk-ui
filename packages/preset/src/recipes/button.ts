import type { RecipeConfig } from '../types'

export const button = {
  className: 'stalk-button',
  description: 'Button styles shared by copied Stalk UI button components.',
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
    _active: { transform: 'scale(0.96)' },
    _disabled: {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    // `asChild` strips the `disabled` attribute (it's invalid on <a>), so the
    // disabled styling needs to also fire on `aria-disabled`.
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
        _hover: { bgColor: 'colorPalette.emphasis' },
      },
      outline: {
        border: 'default',
        borderColor: 'colorPalette.muted',
        color: 'fg.default',
        _hover: {
          bgColor: 'colorPalette.subtle',
          borderColor: 'colorPalette.solid',
        },
      },
      ghost: {
        color: 'fg.default',
        _hover: { bgColor: 'colorPalette.subtle' },
      },
      subtle: {
        bgColor: 'colorPalette.subtle',
        color: 'colorPalette.fg',
        _hover: { bgColor: 'colorPalette.muted' },
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
  },
  defaultVariants: {
    size: 'md',
    variant: 'solid',
  },
} satisfies RecipeConfig
