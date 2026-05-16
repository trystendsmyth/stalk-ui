import type { RecipeConfig } from '../types'

export const alert = {
  className: 'stalk-alert',
  description:
    'Slot recipe for inline Alert messages (root, icon, body, title, description, actions, close).',
  slots: ['root', 'icon', 'body', 'title', 'description', 'actions', 'close'],
  base: {
    root: {
      alignItems: 'flex-start',
      border: 'default',
      colorPalette: 'info',
      color: 'fg.default',
      display: 'flex',
      rounded: 'md',
      w: 'full',
    },
    icon: {
      alignItems: 'center',
      color: 'colorPalette.fg',
      display: 'flex',
      flexShrink: 0,
      justifyContent: 'center',
      '& > svg': { h: 'full', w: 'full' },
    },
    body: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      gap: '4',
      minW: 0,
    },
    title: {
      color: 'fg.default',
      fontWeight: 'semibold',
      lineHeight: 'tight',
      m: 0,
    },
    description: {
      color: 'fg.muted',
      lineHeight: 'normal',
      m: 0,
      '& a': {
        color: 'colorPalette.fg',
        textDecoration: 'underline',
        textUnderlineOffset: '2',
      },
    },
    actions: {
      alignItems: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8',
      mt: '8',
    },
    close: {
      alignItems: 'center',
      appearance: 'none',
      bgColor: 'transparent',
      border: 'none',
      color: 'fg.muted',
      cursor: 'pointer',
      display: 'inline-flex',
      flexShrink: 0,
      justifyContent: 'center',
      lineHeight: 0,
      m: 0,
      ml: 'auto',
      p: 0,
      rounded: 'sm',
      transitionDuration: 'fast',
      transitionProperty: 'background-color, color',
      _hover: { bgColor: 'colorPalette.subtle', color: 'fg.default' },
      _focusVisible: {
        focusRingWidth: 'base',
        focusRingColor: 'accent.subtle',
        focusRingOffsetWidth: '1',
        focusRingOffsetColor: 'bg.default',
      },
      '& > svg': { flexShrink: 0 },
    },
  },
  variants: {
    size: {
      sm: {
        root: { gap: '8', p: '10' },
        icon: { h: '16', w: '16', mt: '2' },
        title: { fontSize: 'sm' },
        description: { fontSize: 'xs' },
        close: { h: '20', w: '20', '& > svg': { h: '12', w: '12' } },
      },
      md: {
        root: { gap: '12', p: '12' },
        icon: { h: '20', w: '20', mt: '2' },
        title: { fontSize: 'sm' },
        description: { fontSize: 'sm' },
        close: { h: '24', w: '24', '& > svg': { h: '14', w: '14' } },
      },
      lg: {
        root: { gap: '12', p: '16' },
        icon: { h: '24', w: '24', mt: '2' },
        title: { fontSize: 'base' },
        description: { fontSize: 'sm' },
        close: { h: '28', w: '28', '& > svg': { h: '16', w: '16' } },
      },
    },
    variant: {
      subtle: {
        root: {
          bgColor: 'colorPalette.subtle',
          borderColor: 'colorPalette.muted',
        },
      },
      solid: {
        root: {
          bgColor: 'colorPalette.solid',
          borderColor: 'colorPalette.solid',
          color: 'colorPalette.contrast',
        },
        icon: { color: 'colorPalette.contrast' },
        title: { color: 'colorPalette.contrast' },
        description: { color: 'colorPalette.contrast', opacity: 0.85 },
        close: {
          color: 'colorPalette.contrast',
          _hover: { bgColor: 'colorPalette.contrast/15', color: 'colorPalette.contrast' },
        },
      },
      outline: {
        root: {
          bgColor: 'bg.default',
          borderColor: 'colorPalette.muted',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'subtle',
  },
} satisfies RecipeConfig
