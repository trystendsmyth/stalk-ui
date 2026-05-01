import type { TextStyles } from '@pandacss/types'

/**
 * Composite typography tokens. Reach for these from recipes (`textStyle: 'h2'`,
 * `textStyle: 'body'`) so font-size, line-height, weight, and tracking stay in sync.
 *
 * Heading scale: h6=16, h5=18, h4=20, h3=24, h2=30, h1=36 (clean ~1.2 ratio).
 * `display` and `displayLg` cover hero treatments above h1.
 */
export const textStyles: TextStyles = {
  displayLg: {
    description: 'Hero / marketing display, larger than h1.',
    value: {
      fontSize: '6xl',
      lineHeight: '6xl',
      fontWeight: 'semibold',
      letterSpacing: 'tighter',
    },
  },
  display: {
    description: 'Hero / marketing display, between h1 and displayLg.',
    value: {
      fontSize: '5xl',
      lineHeight: '5xl',
      fontWeight: 'semibold',
      letterSpacing: 'tighter',
    },
  },
  h1: {
    description: 'Page heading.',
    value: {
      fontSize: '4xl',
      lineHeight: '4xl',
      fontWeight: 'semibold',
      letterSpacing: 'tight',
    },
  },
  h2: {
    description: 'Section heading.',
    value: {
      fontSize: '3xl',
      lineHeight: '3xl',
      fontWeight: 'semibold',
      letterSpacing: 'tight',
    },
  },
  h3: {
    description: 'Subsection heading.',
    value: {
      fontSize: '2xl',
      lineHeight: '2xl',
      fontWeight: 'semibold',
      letterSpacing: 'normal',
    },
  },
  h4: {
    description: 'Group heading.',
    value: {
      fontSize: 'xl',
      lineHeight: 'xl',
      fontWeight: 'semibold',
      letterSpacing: 'normal',
    },
  },
  h5: {
    description: 'Card / dialog title.',
    value: {
      fontSize: 'lg',
      lineHeight: 'lg',
      fontWeight: 'semibold',
      letterSpacing: 'normal',
    },
  },
  h6: {
    description: 'Inline heading / overline.',
    value: {
      fontSize: 'base',
      lineHeight: 'base',
      fontWeight: 'semibold',
      letterSpacing: 'normal',
    },
  },
  bodyLg: {
    description: 'Lead paragraph.',
    value: {
      fontSize: 'lg',
      lineHeight: 'lg',
      fontWeight: 'regular',
      letterSpacing: 'normal',
    },
  },
  body: {
    description: 'Default body copy.',
    value: {
      fontSize: 'base',
      lineHeight: 'base',
      fontWeight: 'regular',
      letterSpacing: 'normal',
    },
  },
  bodySm: {
    description: 'Compact body copy.',
    value: {
      fontSize: 'sm',
      lineHeight: 'sm',
      fontWeight: 'regular',
      letterSpacing: 'normal',
    },
  },
  caption: {
    description: 'Helper / hint text.',
    value: {
      fontSize: 'xs',
      lineHeight: 'xs',
      fontWeight: 'regular',
      letterSpacing: 'normal',
    },
  },
  micro: {
    description: 'Smallest legible label (badges, footnotes).',
    value: {
      fontSize: '2xs',
      lineHeight: '2xs',
      fontWeight: 'medium',
      letterSpacing: 'wide',
    },
  },
  code: {
    description: 'Inline / block monospace code.',
    value: {
      fontFamily: 'mono',
      fontSize: 'sm',
      lineHeight: 'sm',
      fontWeight: 'regular',
      letterSpacing: 'normal',
    },
  },
}
