'use client'

import { createContext, forwardRef, useContext, useMemo, useState } from 'react'
import { css, cx } from 'styled-system/css'
import { heatmap as heatmapRecipe } from 'styled-system/recipes'

import type { Tone } from './tones'
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

const styles = /* @__PURE__ */ heatmapRecipe()

// Layout mode for the composable HeatMap.* parts. `matrix` (default) keeps the
// native table layout — cells align into fixed columns. `flow` lays each group's
// cells out as a responsive auto-fill grid that wraps to the available width, for
// ragged "device grid" data (e.g. inverters per meter) that isn't a rows×columns
// matrix. Threaded Root → Group/Row via context so every part agrees. Semantic
// table markup and the data-* color engine are unchanged in both modes.
export type HeatMapLayout = 'matrix' | 'flow'
const HeatMapLayoutContext = /* @__PURE__ */ createContext<HeatMapLayout>('matrix')

// `--heatmap-cell-min` (default 76px) sets the smallest cell track; the grid packs
// as many equal columns as fit and wraps the rest.
const flowTableClass = /* @__PURE__ */ css({ display: 'block', borderSpacing: '0' })
const flowGroupClass = /* @__PURE__ */ css({
  display: 'block',
  '&:not(:last-of-type)': { marginBottom: '12' },
})
const flowGroupHeaderRowClass = /* @__PURE__ */ css({ display: 'block' })
const flowRowClass = /* @__PURE__ */ css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(var(--heatmap-cell-min, 76px), 1fr))',
  gap: '6',
})

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

const HeatMapBase = /* @__PURE__ */ forwardRef<HTMLDivElement, HeatMapProps>(function HeatMap(
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

  // When inspectable, the focused cell's value surfaces in a visible readout so a
  // sighted keyboard user can read it (the value is otherwise only in the cell's
  // aria-label / hover title).
  const [inspected, setInspected] = useState<ReactNode>(null)

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
                    onFocus={
                      inspectable
                        ? () => {
                            setInspected(text)
                          }
                        : undefined
                    }
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
      {inspectable ? (
        <output className={styles.readout}>{inspected ?? 'Focus a cell to read its value.'}</output>
      ) : null}
    </div>
  )
})

// ── Composable HeatMap.* — a sectioned, content-bearing data grid ──────────────
// The simple data-driven HeatMap above stays a textless color matrix; these parts
// add in-cell content, per-cell activation, and labeled row groups via composition
// (children / dot notation), with color from a `tone` or the scale path. Importing
// only the simple HeatMap does not pull these in.

interface HeatMapScaleContextValue {
  levelFor: (value: number | null) => { 'data-level'?: number; 'data-tone'?: string } | undefined
}

const HeatMapScaleContext = /* @__PURE__ */ createContext<HeatMapScaleContextValue | null>(null)

export interface UseHeatMapScaleOptions {
  /** Values to auto-compute the domain from (ignored when `domain` is given). */
  values?: readonly (number | null | undefined)[]
  /** Explicit `[min, max]` domain. */
  domain?: [number, number]
  /** Ramp style. */
  scale?: HeatMapScale
  /** Neutral midpoint for `diverging` (default 0). */
  midpoint?: number
}

export interface HeatMapScaleApi {
  /** Bucket a value into the `data-*` attributes the cell recipe maps to a ramp color. */
  levelFor: (value: number | null) => { 'data-level'?: number; 'data-tone'?: string } | undefined
}

/**
 * Headless color engine for composable HeatMaps: pass your value array (or a fixed
 * `domain`) and spread `levelFor(value)` onto `<HeatMap.Cell>`. Computed up front,
 * so no measurement render is needed.
 */
export function useHeatMapScale({
  values,
  domain,
  scale = 'sequential',
  midpoint = 0,
}: UseHeatMapScaleOptions): HeatMapScaleApi {
  return useMemo<HeatMapScaleApi>(() => {
    const nums =
      domain === undefined
        ? (values ?? []).filter((value): value is number => typeof value === 'number')
        : null
    const [min, max] = domain ?? [
      nums && nums.length > 0 ? Math.min(...nums) : 0,
      nums && nums.length > 0 ? Math.max(...nums) : 0,
    ]
    return {
      levelFor: (value) =>
        value === null ? undefined : cellTone(value, scale, min, max, midpoint),
    }
  }, [values, domain, scale, midpoint])
}

const groupHeaderRowClass = /* @__PURE__ */ css({
  display: 'inline-flex',
  alignItems: 'center',
  w: 'full',
})

export interface HeatMapRootProps extends Omit<HTMLAttributes<HTMLTableElement>, 'children'> {
  /** Ramp style for cells that resolve color from `value` (default `sequential`). */
  scale?: HeatMapScale
  /** Explicit `[min, max]` domain for value-colored cells (required for auto-color). */
  domain?: [number, number]
  /** Neutral midpoint for `diverging` (default 0). */
  midpoint?: number
  /** Column headers; renders a header row. */
  columns?: readonly ReactNode[]
  /** Cell layout: `matrix` (default, aligned columns) or `flow` (auto-fill wrap). */
  layout?: HeatMapLayout
  children?: ReactNode
}

export const HeatMapRoot = /* @__PURE__ */ forwardRef<HTMLTableElement, HeatMapRootProps>(
  function HeatMapRoot(
    {
      scale = 'sequential',
      domain,
      midpoint = 0,
      layout = 'matrix',
      columns,
      className,
      children,
      ...props
    },
    ref,
  ) {
    const api = useHeatMapScale({ scale, midpoint, ...(domain ? { domain } : {}) })
    return (
      <HeatMapScaleContext.Provider value={api}>
        <HeatMapLayoutContext.Provider value={layout}>
          <table
            ref={ref}
            className={cx(styles.table, layout === 'flow' && flowTableClass, className)}
            {...props}
          >
            {columns !== undefined && columns.length > 0 ? (
              <thead>
                <tr>
                  <td className={styles.corner} />
                  {columns.map((column, index) => (
                    <th key={index} scope="col" className={styles.columnHeader}>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
            ) : null}
            {children}
          </table>
        </HeatMapLayoutContext.Provider>
      </HeatMapScaleContext.Provider>
    )
  },
)

export interface HeatMapGroupProps extends Omit<
  HTMLAttributes<HTMLTableSectionElement>,
  'children'
> {
  /** Section label rendered in a header row. */
  label?: ReactNode
  /** Optional trailing slot in the section header (e.g. a status chip). */
  aside?: ReactNode
  /** Columns the header spans (default spans the whole grid). */
  headerColSpan?: number
  children?: ReactNode
}

export const HeatMapGroup = /* @__PURE__ */ forwardRef<HTMLTableSectionElement, HeatMapGroupProps>(
  function HeatMapGroup(
    { label, aside, headerColSpan = 1000, className, children, ...props },
    ref,
  ) {
    const layout = useContext(HeatMapLayoutContext)
    const hasHeader = label !== undefined || aside !== undefined
    return (
      <tbody
        ref={ref}
        className={cx(styles.group, layout === 'flow' && flowGroupClass, className)}
        {...props}
      >
        {hasHeader ? (
          <tr className={layout === 'flow' ? flowGroupHeaderRowClass : undefined}>
            <th scope="colgroup" colSpan={headerColSpan} className={styles.groupHeader}>
              <span className={groupHeaderRowClass}>
                {label}
                {aside !== undefined ? <span className={styles.groupAside}>{aside}</span> : null}
              </span>
            </th>
          </tr>
        ) : null}
        {children}
      </tbody>
    )
  },
)

export interface HeatMapRowProps extends Omit<HTMLAttributes<HTMLTableRowElement>, 'children'> {
  /** Row header (rendered as a `<th scope="row">`). */
  header?: ReactNode
  children?: ReactNode
}

export const HeatMapRow = /* @__PURE__ */ forwardRef<HTMLTableRowElement, HeatMapRowProps>(
  function HeatMapRow({ header, className, children, ...props }, ref) {
    const layout = useContext(HeatMapLayoutContext)
    return (
      <tr ref={ref} className={cx(layout === 'flow' && flowRowClass, className)} {...props}>
        {header !== undefined ? (
          <th scope="row" className={styles.rowHeader}>
            {header}
          </th>
        ) : null}
        {children}
      </tr>
    )
  },
)

export interface HeatMapCellProps extends Omit<HTMLAttributes<HTMLTableCellElement>, 'onClick'> {
  /** Value used to resolve color from the Root's scale/domain (or `useHeatMapScale`). */
  value?: number | null
  /** Status tone → a saturated `vivid` fill with legible text. Overrides `value`/`level`. */
  tone?: Tone
  /** Explicit ramp bucket (1–9), bypassing value resolution. */
  level?: number
  /** Render as an inert "no data" cell. */
  empty?: boolean
  /** Per-cell activation. Renders a focusable button; React delegates the handler. */
  onClick?: () => void
  /** Accessible name (visible content is often a poor screen-reader label). */
  label?: string
  children?: ReactNode
}

export const HeatMapCell = /* @__PURE__ */ forwardRef<HTMLTableCellElement, HeatMapCellProps>(
  function HeatMapCell(
    {
      value,
      tone,
      level,
      empty = false,
      onClick,
      label,
      className,
      children,
      title,
      'aria-label': ariaLabelProp,
      ...props
    },
    ref,
  ) {
    const ctx = useContext(HeatMapScaleContext)
    const isEmpty = empty || value === null
    let toneAttrs: { 'data-level'?: number; 'data-tone'?: string } | undefined
    let toneClass: string | undefined
    if (tone !== undefined) {
      toneClass = css({
        colorPalette: tone,
        bgColor: 'colorPalette.vivid',
        color: 'colorPalette.vividContrast',
      })
    } else if (!isEmpty) {
      if (level !== undefined) toneAttrs = { 'data-level': level }
      else if (typeof value === 'number' && ctx) toneAttrs = ctx.levelFor(value)
    }
    const hasContent = children !== undefined
    const content = hasContent ? <span className={styles.cellContent}>{children}</span> : null
    const accessible =
      label ?? (typeof ariaLabelProp === 'string' ? ariaLabelProp : undefined) ?? title
    const interactive = onClick !== undefined
    return (
      <td
        ref={ref}
        aria-label={interactive ? undefined : accessible}
        className={cx(styles.cell, toneClass, className)}
        data-content={hasContent ? '' : undefined}
        data-empty={isEmpty ? '' : undefined}
        title={accessible}
        {...toneAttrs}
        {...props}
      >
        {interactive ? (
          <button
            aria-label={accessible}
            className={styles.cellButton}
            onClick={onClick}
            type="button"
          >
            {content}
          </button>
        ) : (
          content
        )}
      </td>
    )
  },
)

export const HeatMapCellLabel = /* @__PURE__ */ forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(function HeatMapCellLabel({ className, ...props }, ref) {
  return <span ref={ref} className={cx(styles.cellLabel, className)} {...props} />
})

export const HeatMapCellValue = /* @__PURE__ */ forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(function HeatMapCellValue({ className, ...props }, ref) {
  return <span ref={ref} className={cx(styles.cellValue, className)} {...props} />
})

export const HeatMapCellMeta = /* @__PURE__ */ forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(function HeatMapCellMeta({ className, ...props }, ref) {
  return <span ref={ref} className={cx(styles.cellMeta, className)} {...props} />
})

export const HeatMap = /* @__PURE__ */ Object.assign(HeatMapBase, {
  Root: HeatMapRoot,
  Group: HeatMapGroup,
  Row: HeatMapRow,
  Cell: HeatMapCell,
  CellLabel: HeatMapCellLabel,
  CellValue: HeatMapCellValue,
  CellMeta: HeatMapCellMeta,
})
