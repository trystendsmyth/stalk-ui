import { createContext, forwardRef, useContext } from 'react'
import { cx } from 'styled-system/css'
import { chart as chartRecipe } from 'styled-system/recipes'

import type { ComponentType, CSSProperties, HTMLAttributes, ReactNode } from 'react'

const styles = /* @__PURE__ */ chartRecipe()

export interface ChartSeriesConfig {
  color?: string
  icon?: ComponentType
  label?: ReactNode
}

/** Maps each data series key to a label and a color used for the `--color-<key>` variable. */
export type ChartConfig = Record<string, ChartSeriesConfig>

interface ChartContextValue {
  config: ChartConfig
}

const ChartContext = createContext<ChartContextValue | null>(null)

export function useChart(): ChartContextValue {
  const context = useContext(ChartContext)
  if (context === null) {
    throw new Error('useChart must be used within a <ChartContainer>.')
  }
  return context
}

export interface ChartContainerProps extends HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

// Option B: this is a theming contract, not a recharts wrapper. The consumer
// renders their own recharts tree (e.g. a ResponsiveContainer) as `children`;
// recharts is never imported or bundled here. ChartContainer exposes each series
// color as a `--color-<key>` CSS variable so recharts elements can reference it.
export const ChartContainer = /* @__PURE__ */ forwardRef<HTMLDivElement, ChartContainerProps>(
  function ChartContainer({ children, className, config, style, ...props }, ref) {
    const colorVars: Record<string, string> = {}
    for (const [key, series] of Object.entries(config)) {
      if (series.color) {
        colorVars[`--color-${key}`] = series.color
      }
    }
    return (
      <ChartContext.Provider value={{ config }}>
        <div
          ref={ref}
          className={cx(styles.container, className)}
          data-chart=""
          style={{ ...colorVars, ...style }}
          {...props}
        >
          {children}
        </div>
      </ChartContext.Provider>
    )
  },
)

interface TooltipPayloadEntry {
  color?: string
  dataKey?: string | number
  name?: string | number
  value?: number | string
  payload?: Record<string, unknown>
}

export interface ChartTooltipContentProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean
  hideIndicator?: boolean
  hideLabel?: boolean
  label?: ReactNode
  /** recharts passes its hovered points here. */
  payload?: TooltipPayloadEntry[]
}

const seriesKey = (entry: TooltipPayloadEntry): string => String(entry.dataKey ?? entry.name ?? '')

export const ChartTooltipContent = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps
>(function ChartTooltipContent(
  { active, className, hideIndicator = false, hideLabel = false, label, payload, ...props },
  ref,
) {
  const { config } = useChart()
  if (!active || !payload || payload.length === 0) {
    return null
  }
  return (
    <div ref={ref} className={cx(styles.tooltip, className)} {...props}>
      {hideLabel ? null : <div className={styles.tooltipLabel}>{label}</div>}
      {payload.map((entry, index) => {
        const key = seriesKey(entry)
        const series = config[key]
        const color = series?.color ?? entry.color
        return (
          <div key={`${key}-${String(index)}`} className={styles.tooltipRow}>
            {hideIndicator ? null : (
              <span
                className={styles.tooltipIndicator}
                style={{ '--color-indicator': color } as CSSProperties}
              />
            )}
            <span>{series?.label ?? entry.name ?? key}</span>
            <span>{entry.value}</span>
          </div>
        )
      })}
    </div>
  )
})

interface LegendPayloadEntry {
  color?: string
  dataKey?: string | number
  value?: string
}

export interface ChartLegendContentProps extends HTMLAttributes<HTMLDivElement> {
  /** recharts passes its legend entries here. */
  payload?: LegendPayloadEntry[]
}

export const ChartLegendContent = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  ChartLegendContentProps
>(function ChartLegendContent({ className, payload, ...props }, ref) {
  const { config } = useChart()
  if (!payload || payload.length === 0) {
    return null
  }
  return (
    <div ref={ref} className={cx(styles.legend, className)} {...props}>
      {payload.map((entry, index) => {
        const key = String(entry.dataKey ?? entry.value ?? index)
        const series = config[key]
        const color = series?.color ?? entry.color
        return (
          <div key={key}>
            <span
              className={styles.tooltipIndicator}
              style={{ '--color-indicator': color } as CSSProperties}
            />
            <span>{series?.label ?? entry.value ?? key}</span>
          </div>
        )
      })}
    </div>
  )
})

type ChartNamespace = typeof ChartContainer & {
  Container: typeof ChartContainer
  LegendContent: typeof ChartLegendContent
  TooltipContent: typeof ChartTooltipContent
}

export const Chart: ChartNamespace = /* @__PURE__ */ Object.assign(ChartContainer, {
  Container: ChartContainer,
  LegendContent: ChartLegendContent,
  TooltipContent: ChartTooltipContent,
})
