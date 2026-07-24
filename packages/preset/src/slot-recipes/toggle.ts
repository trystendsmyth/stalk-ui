import type { RecipeConfig } from '../types'

export const toggle = {
  className: 'stalk-toggle',
  description: 'Slot recipe for the Toggle and ToggleGroup primitives (root, item).',
  jsx: ['Toggle', 'ToggleGroup', 'ToggleGroupItem', /^Toggle\./, /^ToggleGroup\./],
  slots: ['root', 'item'],
  base: {
    root: {
      alignItems: 'center',
      colorPalette: 'accent',
      display: 'inline-flex',
    },
    item: {
      alignItems: 'center',
      appearance: 'none',
      bgColor: 'transparent',
      border: 'default',
      borderColor: 'border.default',
      color: 'fg.muted',
      cursor: 'pointer',
      display: 'inline-flex',
      flexShrink: 0,
      fontWeight: 'medium',
      gap: '6',
      justifyContent: 'center',
      lineHeight: 'normal',
      m: 0,
      outline: 'none',
      pos: 'relative',
      transitionDuration: 'fast',
      transitionProperty: 'background-color, color, border-color, box-shadow',
      _hover: { bgColor: 'bg.subtle', color: 'fg.default' },
      _focusVisible: {
        focusRingWidth: 'base',
        focusRingColor: 'accent.subtle',
        focusRingOffsetWidth: '1',
        focusRingOffsetColor: 'bg.default',
        zIndex: '1',
      },
      _disabled: {
        cursor: 'not-allowed',
        opacity: 0.5,
        _hover: { bgColor: 'transparent', color: 'fg.muted' },
      },
      '&[data-state="on"]': {
        bgColor: 'colorPalette.subtle',
        borderColor: 'colorPalette.muted',
        color: 'colorPalette.fg',
      },
    },
  },
  variants: {
    size: {
      sm: { item: { fontSize: 'xs', h: '24', px: '8', '& > svg': { h: '12', w: '12' } } },
      md: { item: { fontSize: 'sm', h: '32', px: '10', '& > svg': { h: '14', w: '14' } } },
      lg: { item: { fontSize: 'sm', h: '40', px: '12', '& > svg': { h: '16', w: '16' } } },
    },
    variant: {
      outline: {
        item: {
          borderColor: 'border.default',
          '&[data-state="on"]': {
            bgColor: 'colorPalette.subtle',
            borderColor: 'colorPalette.muted',
            color: 'colorPalette.fg',
          },
        },
      },
      ghost: {
        item: {
          borderColor: 'transparent',
          '&[data-state="on"]': {
            bgColor: 'colorPalette.subtle',
            borderColor: 'transparent',
            color: 'colorPalette.fg',
          },
        },
      },
      solid: {
        item: {
          borderColor: 'transparent',
          '&[data-state="on"]': {
            bgColor: 'colorPalette.solid',
            borderColor: 'colorPalette.solid',
            color: 'colorPalette.contrast',
          },
          _hover: { bgColor: 'bg.subtle', color: 'fg.default' },
        },
      },
    },
    radius: {
      none: { item: { rounded: 'none' } },
      sm: { item: { rounded: 'sm' } },
      md: { item: { rounded: 'md' } },
      lg: { item: { rounded: 'lg' } },
      full: { item: { rounded: 'full' } },
    },
    attached: {
      true: {
        root: { gap: '0' },
        item: {
          rounded: 'none',
          '&:not(:first-of-type)': { marginInlineStart: '-1px' },
          '&:first-of-type': { roundedLeft: 'md' },
          '&:last-of-type': { roundedRight: 'md' },
          '&:only-of-type': { rounded: 'md' },
          '&:focus-visible, &[data-state="on"]': { zIndex: '1' },
        },
      },
      false: { root: { gap: '4' } },
    },
  },
  defaultVariants: {
    attached: false,
    radius: 'md',
    size: 'md',
    variant: 'outline',
  },
} satisfies RecipeConfig
