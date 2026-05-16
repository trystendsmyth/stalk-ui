import type { RecipeConfig } from '../types'

export const tag = {
  className: 'stalk-tag',
  description: 'Slot recipe for the Tag component (root, label, count, close).',
  slots: ['root', 'label', 'count', 'close'],
  base: {
    root: {
      alignItems: 'center',
      colorPalette: 'accent',
      display: 'inline-flex',
      flexShrink: 0,
      fontWeight: 'medium',
      gap: '4',
      maxW: 'full',
      transitionDuration: 'fast',
      transitionProperty: 'background-color, border-color, color',
      verticalAlign: 'middle',
      whiteSpace: 'nowrap',
    },
    label: {
      alignItems: 'center',
      display: 'inline-flex',
      gap: '4',
      minW: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    count: {
      alignItems: 'center',
      bgColor: 'colorPalette.muted',
      color: 'colorPalette.fg',
      display: 'inline-flex',
      flexShrink: 0,
      fontWeight: 'semibold',
      justifyContent: 'center',
      lineHeight: 1,
      rounded: 'full',
    },
    close: {
      alignItems: 'center',
      appearance: 'none',
      bgColor: 'transparent',
      border: 'none',
      color: 'inherit',
      cursor: 'pointer',
      display: 'inline-flex',
      flexShrink: 0,
      justifyContent: 'center',
      lineHeight: 0,
      m: 0,
      opacity: 0.7,
      p: 0,
      rounded: 'sm',
      transitionDuration: 'fast',
      transitionProperty: 'opacity, background-color',
      _hover: { opacity: 1, bgColor: 'colorPalette.muted' },
      _focusVisible: {
        focusRingWidth: 'base',
        focusRingColor: 'accent.subtle',
        focusRingOffsetWidth: '1',
        focusRingOffsetColor: 'bg.default',
        opacity: 1,
      },
      '& > svg': {
        flexShrink: 0,
        h: '10',
        w: '10',
      },
    },
  },
  variants: {
    size: {
      sm: {
        root: { fontSize: 'xs', minH: '20', px: '6' },
        count: { fontSize: '2xs', h: '14', minW: '14', px: '4' },
        close: { h: '14', w: '14', '& > svg': { h: '8', w: '8' } },
      },
      md: {
        root: { fontSize: 'sm', minH: '24', px: '8' },
        count: { fontSize: '2xs', h: '16', minW: '16', px: '4' },
        close: { h: '16', w: '16', '& > svg': { h: '10', w: '10' } },
      },
      lg: {
        root: { fontSize: 'sm', minH: '28', px: '10' },
        count: { fontSize: 'xs', h: '18', minW: '18', px: '6' },
        close: { h: '18', w: '18', '& > svg': { h: '12', w: '12' } },
      },
    },
    radius: {
      none: { root: { rounded: 'none' } },
      sm: { root: { rounded: 'sm' } },
      md: { root: { rounded: 'md' } },
      lg: { root: { rounded: 'lg' } },
      full: { root: { rounded: 'full' } },
    },
    variant: {
      solid: {
        root: { bgColor: 'colorPalette.solid', color: 'colorPalette.contrast' },
        count: { bgColor: 'colorPalette.contrast/20', color: 'colorPalette.contrast' },
        close: { _hover: { bgColor: 'colorPalette.contrast/15' } },
      },
      subtle: {
        root: { bgColor: 'colorPalette.subtle', color: 'colorPalette.fg' },
        count: { bgColor: 'colorPalette.muted', color: 'colorPalette.fg' },
      },
      outline: {
        root: {
          bgColor: 'transparent',
          border: 'default',
          borderColor: 'colorPalette.muted',
          color: 'colorPalette.fg',
        },
        count: { bgColor: 'colorPalette.subtle', color: 'colorPalette.fg' },
      },
    },
    interactive: {
      true: {
        root: {
          cursor: 'pointer',
          _hover: { bgColor: 'colorPalette.muted' },
          _focusVisible: {
            focusRingWidth: 'base',
            focusRingColor: 'accent.subtle',
            focusRingOffsetWidth: '1',
            focusRingOffsetColor: 'bg.default',
          },
        },
      },
      false: {},
    },
    dot: {
      true: {
        label: {
          _before: {
            content: '""',
            display: 'inline-block',
            flexShrink: 0,
            h: '8',
            w: '8',
            rounded: 'full',
            bgColor: 'colorPalette.solid',
          },
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    dot: false,
    interactive: false,
    radius: 'full',
    size: 'md',
    variant: 'subtle',
  },
} satisfies RecipeConfig
