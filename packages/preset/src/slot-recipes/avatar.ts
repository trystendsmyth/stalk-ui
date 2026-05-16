import type { RecipeConfig } from '../types'

export const avatar = {
  className: 'stalk-avatar',
  description: 'Slot recipe for the Avatar component (root, image, fallback).',
  slots: ['root', 'image', 'fallback'],
  base: {
    root: {
      alignItems: 'center',
      bgColor: 'accent.solid',
      color: 'accent.contrast',
      display: 'inline-flex',
      flexShrink: 0,
      fontWeight: 'medium',
      justifyContent: 'center',
      overflow: 'hidden',
      pos: 'relative',
      userSelect: 'none',
      verticalAlign: 'middle',
    },
    image: {
      aspectRatio: 'square',
      h: 'full',
      objectFit: 'cover',
      w: 'full',
    },
    fallback: {
      alignItems: 'center',
      display: 'flex',
      h: 'full',
      justifyContent: 'center',
      lineHeight: 1,
      textTransform: 'uppercase',
      w: 'full',
    },
  },
  variants: {
    size: {
      xs: {
        root: { h: '20', w: '20' },
        fallback: { fontSize: '2xs' },
      },
      sm: {
        root: { h: '24', w: '24' },
        fallback: { fontSize: 'xs' },
      },
      md: {
        root: { h: '32', w: '32' },
        fallback: { fontSize: 'sm' },
      },
      lg: {
        root: { h: '40', w: '40' },
        fallback: { fontSize: 'base' },
      },
      xl: {
        root: { h: '48', w: '48' },
        fallback: { fontSize: 'lg' },
      },
      '2xl': {
        root: { h: '64', w: '64' },
        fallback: { fontSize: 'xl' },
      },
    },
    radius: {
      none: { root: { rounded: 'none' } },
      sm: { root: { rounded: 'sm' } },
      md: { root: { rounded: 'md' } },
      lg: { root: { rounded: 'lg' } },
      full: { root: { rounded: 'full' } },
    },
  },
  defaultVariants: {
    radius: 'full',
    size: 'md',
  },
} satisfies RecipeConfig
