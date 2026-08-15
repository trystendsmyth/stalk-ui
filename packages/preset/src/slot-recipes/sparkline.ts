import type { RecipeConfig } from '../types'

/**
 * Sparkline — a tiny, dependency-free inline-SVG trend (line or zero-anchored
 * bars, no recharts). Color flows through `colorPalette`, so `tone` retints the
 * line/area/bars/point and it inverts with color mode. Geometry is computed in
 * the component; everything color lives here in tokens.
 */
export const sparkline = {
  className: 'stalk-sparkline',
  description:
    'Slot recipe for Sparkline — a compact inline-SVG trend (root, area, line, point, bar).',
  jsx: ['Sparkline', /^Sparkline\./],
  slots: [
    'root',
    'area',
    'line',
    'lineMuted',
    'point',
    'bar',
    'barMuted',
    'referenceLine',
    'referenceBand',
  ],
  base: {
    root: {
      colorPalette: 'accent',
      display: 'inline-block',
      overflow: 'visible',
      verticalAlign: 'middle',
    },
    area: {
      fill: 'colorPalette.solid',
      opacity: 0.15,
      stroke: 'none',
    },
    line: {
      fill: 'none',
      stroke: 'colorPalette.solid',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    // Secondary series: same tone, faded so the primary line stays dominant.
    lineMuted: {
      fill: 'none',
      stroke: 'colorPalette.solid',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      opacity: 0.4,
    },
    point: {
      fill: 'colorPalette.solid',
      stroke: 'bg.default',
    },
    bar: {
      fill: 'colorPalette.solid',
      stroke: 'none',
    },
    // Non-final bars under `highlightLast`: same fade tactic as lineMuted.
    barMuted: {
      fill: 'colorPalette.solid',
      opacity: 0.4,
      stroke: 'none',
    },
    // Reference threshold line (dashed) and band (faint fill).
    referenceLine: {
      fill: 'none',
      stroke: 'border.strong',
      strokeDasharray: '3 2',
    },
    referenceBand: {
      fill: 'fg.muted',
      opacity: 0.12,
      stroke: 'none',
    },
  },
} satisfies RecipeConfig
