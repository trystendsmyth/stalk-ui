import type { RecipeConfig } from '../types'

export const button = {
  className: 'stalk-button',
  description: 'Button styles shared by copied Stalk UI button components.',
  base: {
    alignItems: 'center',
    borderRadius: 'md',
    cursor: 'pointer',
    display: 'inline-flex',
    fontWeight: 'semibold',
    gap: '8',
    justifyContent: 'center',
    outline: 'none',
    position: 'relative',
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
      focusRingColor: 'accent.muted',
      focusRingOffsetWidth: '2',
      focusRingOffsetColor: 'bg.default',
    },
  },
  variants: {
    variant: {
      solid: {
        backgroundColor: 'accent.solid',
        color: 'accent.contrast',
        _hover: { backgroundColor: 'accent.emphasis' },
      },
      outline: {
        border: 'default',
        color: 'fg.default',
        _hover: {
          backgroundColor: 'bg.subtle',
          border: 'hover',
        },
      },
      ghost: {
        color: 'fg.default',
        _hover: { backgroundColor: 'bg.subtle' },
      },
      subtle: {
        backgroundColor: 'accent.subtle',
        color: 'accent.fg',
        _hover: { backgroundColor: 'accent.muted' },
      },
    },
    size: {
      sm: {
        minHeight: '32',
        paddingInline: '12',
        textStyle: 'bodySm',
        '& > svg': { height: '14', width: '14' },
        '&:has(> svg:only-child)': { paddingInline: '0', width: '32' },
      },
      md: {
        minHeight: '36',
        paddingInline: 'base',
        textStyle: 'body',
        '& > svg': { height: '16', width: '16' },
        '&:has(> svg:only-child)': { paddingInline: '0', width: '36' },
      },
      lg: {
        minHeight: '42',
        paddingInline: '20',
        textStyle: 'bodyLg',
        '& > svg': { height: '18', width: '18' },
        '&:has(> svg:only-child)': { paddingInline: '0', width: '42' },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'solid',
  },
} satisfies RecipeConfig
