'use client'

import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { heatmap as heatmapRecipe } from 'styled-system/recipes'

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

const styles = /* @__PURE__ */ heatmapRecipe()

/** Inline swatch size — geometry only (no color), so it stays out of the token audit. */
const SWATCH_STYLE: CSSProperties = { height: '0.75rem', minWidth: '0.75rem', width: '0.75rem' }

export type HeatMapScale = 'sequential' | 'diverging'

export interface HeatMapCell {
  /** Numeric value; `null` renders an inert "no data" cell. */
  value: number | null
  /** Override the accessible / tooltip text for this cell. */
  label?: ReactNode
}

type CellInput = HeatMapCell | number | null | undefined

export interface HeatMapProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Row keys, top → bottom. */
  rows: readonly string[]
  /** Column keys, left → right. */
  columns: readonly string[]
  /** Resolve the cell at `(row, column)`. Return `null` (or `{ value: null }`) for no data. */
  cell: (row: string, column: string) => CellInput
  /** Ramp style: single-hue `sequential` (default) or signed `diverging`. */
  scale?: HeatMapScale
  /** `[min, max]` value domain. Auto-computed from the data when omitted. */
  domain?: [number, number]
  /** Value treated as the neutral midpoint for `diverging` scales (default `0`). */
  midpoint?: number
  /** Accessible name for the grid. Required for a meaningful screen-reader experience. */
  'aria-label'?: string
  /** Caption rendered beneath the grid. */
  caption?: ReactNode
  /** Make cells keyboard-focusable so the grid can be inspected cell by cell. */
  inspectable?: boolean
  /** Format a value for its cell title / accessible label. */
  formatValue?: (value: number, row: string, column: string) => string
  /** Accessible text for empty / no-data cells. */
  emptyLabel?: string
  /** Render a min → max ramp legend below the grid. */
  legend?: boolean
}

const SEQUENTIAL_STOPS = [1, 3, 5, 7, 9] as const
const DIVERGING_STOPS = [
  { tone: 'neg', level: 4 },
  { tone: 'neg', level: 2 },
  { tone: 'mid' },
  { tone: 'pos', level: 2 },
  { tone: 'pos', level: 4 },
] as const

const normalizeCell = (input: CellInput): HeatMapCell => {
  if (input === null || input === undefined) return { value: null }
  if (typeof input === 'number') return { value: input }
  return input
}

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n))

/** Bucket a value into the `data-*` attributes the recipe maps to a ramp color. */
const cellTone = (
  value: number,
  scale: HeatMapScale,
  min: number,
  max: number,
  midpoint: number,
): { 'data-level'?: number; 'data-tone'?: string } => {
  if (scale === 'diverging') {
    if (value === midpoint || (min === max && max === midpoint)) return { 'data-tone': 'mid' }
    if (value < midpoint) {
      const span = midpoint - min || 1
      const level = clamp(Math.ceil(((midpoint - value) / span) * 4), 1, 4)
      return { 'data-tone': 'neg', 'data-level': level }
    }
    const span = max - midpoint || 1
    const level = clamp(Math.ceil(((value - midpoint) / span) * 4), 1, 4)
    return { 'data-tone': 'pos', 'data-level': level }
  }
  if (min === max) return { 'data-level': 5 }
  const level = clamp(Math.ceil(((value - min) / (max - min)) * 9), 1, 9)
  return { 'data-level': level }
}

export const HeatMap = /* @__PURE__ */ forwardRef<HTMLDivElement, HeatMapProps>(function HeatMap(
  {
    rows,
    columns,
    cell,
    scale = 'sequential',
    domain,
    midpoint = 0,
    caption,
    inspectable = false,
    formatValue = (value) => String(value),
    emptyLabel = 'No data',
    legend = false,
    className,
    'aria-label': ariaLabel,
    ...props
  },
  ref,
) {
  // Resolve the grid once, then derive the domain from real values when not given.
  const matrix = rows.map((row) => ({
    row,
    cells: columns.map((column) => ({ column, data: normalizeCell(cell(row, column)) })),
  }))
  const values = matrix
    .flatMap(({ cells }) => cells)
    .reduce<number[]>((acc, { data }) => {
      if (data.value !== null) acc.push(data.value)
      return acc
    }, [])
  const [min, max] = domain ?? [
    values.length > 0 ? Math.min(...values) : 0,
    values.length > 0 ? Math.max(...values) : 0,
  ]

  return (
    <div ref={ref} className={cx(styles.root, className)} {...props}>
      <table className={styles.table} aria-label={ariaLabel}>
        <thead>
          <tr>
            <td className={styles.corner} />
            {columns.map((column) => (
              <th key={column} scope="col" className={styles.columnHeader}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map(({ row, cells }) => (
            <tr key={row}>
              <th scope="row" className={styles.rowHeader}>
                {row}
              </th>
              {cells.map(({ column, data }) => {
                const { value, label } = data
                const empty = value === null
                const text =
                  label ??
                  (empty
                    ? `${row}, ${column}: ${emptyLabel}`
                    : `${row}, ${column}: ${formatValue(value, row, column)}`)
                const accessible = typeof text === 'string' ? text : undefined
                const tone = empty ? undefined : cellTone(value, scale, min, max, midpoint)
                return (
                  <td
                    key={column}
                    className={styles.cell}
                    aria-label={accessible}
                    title={accessible}
                    data-empty={empty ? '' : undefined}
                    tabIndex={inspectable ? 0 : undefined}
                    {...tone}
                  />
                )
              })}
            </tr>
          ))}
        </tbody>
        {caption ? <caption className={styles.caption}>{caption}</caption> : null}
      </table>
      {legend ? (
        <div className={styles.legend} aria-hidden>
          <span>{scale === 'diverging' ? 'Low' : 'Less'}</span>
          {scale === 'diverging'
            ? DIVERGING_STOPS.map((stop, i) => (
                <span
                  key={i}
                  className={styles.cell}
                  style={SWATCH_STYLE}
                  data-tone={stop.tone}
                  data-level={'level' in stop ? stop.level : undefined}
                />
              ))
            : SEQUENTIAL_STOPS.map((level) => (
                <span key={level} className={styles.cell} style={SWATCH_STYLE} data-level={level} />
              ))}
          <span>{scale === 'diverging' ? 'High' : 'More'}</span>
        </div>
      ) : null}
    </div>
  )
})
