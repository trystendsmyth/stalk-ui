import type { RecipeConfig } from '../types'

/**
 * HeatMap — a dependency-free matrix of color-coded cells. Built on a real
 * `<table>` so row/column headers give screen readers the full grid for free.
 * Cell color is driven entirely by `data-*` attributes the component sets, so
 * the mapping lives here in tokens (mode-aware via the `scale.*` ramps) and the
 * component source stays color-literal-free.
 */
export const heatmap = {
  className: 'stalk-heatmap',
  description:
    'Slot recipe for HeatMap — a labeled matrix of color-coded cells (root, table, corner, columnHeader, rowHeader, cell, legend).',
  slots: ['root', 'table', 'corner', 'columnHeader', 'rowHeader', 'cell', 'legend', 'caption'],
  base: {
    root: {
      color: 'fg.default',
      display: 'inline-flex',
      flexDirection: 'column',
      gap: '12',
      maxW: 'full',
      overflowX: 'auto',
    },
    table: {
      borderCollapse: 'separate',
      borderSpacing: '2',
      fontSize: 'xs',
    },
    corner: {
      bgColor: 'transparent',
    },
    columnHeader: {
      color: 'fg.muted',
      fontWeight: 'medium',
      px: '4',
      pb: '4',
      textAlign: 'center',
      whiteSpace: 'nowrap',
    },
    rowHeader: {
      color: 'fg.muted',
      fontWeight: 'medium',
      pr: '8',
      textAlign: 'end',
      whiteSpace: 'nowrap',
    },
    cell: {
      borderRadius: 'sm',
      h: '20',
      minW: '20',
      outline: 'none',
      transitionProperty: 'box-shadow, transform',
      transitionDuration: 'fast',
      // Empty / no-data cells read as an inert neutral surface.
      '&[data-empty]': {
        bgColor: 'bg.subtle',
      },
      // Sequential ramp (faint → strong).
      '&[data-level="1"]': { bgColor: 'scale.sequential.1' },
      '&[data-level="2"]': { bgColor: 'scale.sequential.2' },
      '&[data-level="3"]': { bgColor: 'scale.sequential.3' },
      '&[data-level="4"]': { bgColor: 'scale.sequential.4' },
      '&[data-level="5"]': { bgColor: 'scale.sequential.5' },
      '&[data-level="6"]': { bgColor: 'scale.sequential.6' },
      '&[data-level="7"]': { bgColor: 'scale.sequential.7' },
      '&[data-level="8"]': { bgColor: 'scale.sequential.8' },
      '&[data-level="9"]': { bgColor: 'scale.sequential.9' },
      // Diverging ramp around a neutral midpoint.
      '&[data-tone="mid"]': { bgColor: 'scale.diverging.mid' },
      '&[data-tone="neg"][data-level="1"]': { bgColor: 'scale.diverging.neg.4' },
      '&[data-tone="neg"][data-level="2"]': { bgColor: 'scale.diverging.neg.3' },
      '&[data-tone="neg"][data-level="3"]': { bgColor: 'scale.diverging.neg.2' },
      '&[data-tone="neg"][data-level="4"]': { bgColor: 'scale.diverging.neg.1' },
      '&[data-tone="pos"][data-level="1"]': { bgColor: 'scale.diverging.pos.1' },
      '&[data-tone="pos"][data-level="2"]': { bgColor: 'scale.diverging.pos.2' },
      '&[data-tone="pos"][data-level="3"]': { bgColor: 'scale.diverging.pos.3' },
      '&[data-tone="pos"][data-level="4"]': { bgColor: 'scale.diverging.pos.4' },
      // Keyboard focus ring on inspectable cells (component sets tabIndex).
      _focusVisible: {
        focusRingWidth: 'base',
        focusRingColor: 'border.focus',
        focusRingOffsetWidth: '1',
        focusRingOffsetColor: 'bg.default',
      },
    },
    legend: {
      alignItems: 'center',
      color: 'fg.muted',
      display: 'flex',
      fontSize: 'xs',
      gap: '8',
    },
    caption: {
      color: 'fg.muted',
      fontSize: 'sm',
      mt: '4',
      textAlign: 'start',
    },
  },
} satisfies RecipeConfig
