import type { LayerStyles } from '@pandacss/types'

/**
 * Composite surface presets. Use `layerStyle: 'card'` etc. to apply
 * background + border + radius + shadow in one shot.
 */
export const layerStyles: LayerStyles = {
  card: {
    description: 'Default elevated surface (cards, dialogs, popovers).',
    value: {
      backgroundColor: 'bg.default',
      border: 'default',
      borderRadius: 'lg',
      boxShadow: 'sm',
      color: 'fg.default',
    },
  },
  surfaceMuted: {
    description: 'Tinted inset surface (e.g. code blocks, sidebars).',
    value: {
      backgroundColor: 'bg.subtle',
      borderRadius: 'md',
      color: 'fg.default',
    },
  },
  popover: {
    description: 'Floating surface for menus / popovers.',
    value: {
      backgroundColor: 'bg.default',
      border: 'default',
      borderRadius: 'md',
      boxShadow: 'lg',
      color: 'fg.default',
    },
  },
}
