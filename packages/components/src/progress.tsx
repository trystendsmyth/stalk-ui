import * as ProgressPrimitive from '@radix-ui/react-progress'
import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { progress as progressRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef } from 'react'

export type ProgressSize = (typeof progressRecipe.variantMap.size)[number]
export type ProgressShape = (typeof progressRecipe.variantMap.shape)[number]

// Fixed 100-unit viewBox: stroke geometry is constant and the rendered size is
// pure CSS, so the arc, stroke, and value text scale together.
const CIRCLE_CENTER = 50
const CIRCLE_RADIUS = 42
const CIRCLE_STROKE_WIDTH = 10
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS

const defaultFormatValue = (value: number, max: number) =>
  `${String(Math.round(max > 0 ? (value / max) * 100 : 0))}%`

export interface ProgressProps extends ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  size?: ProgressSize
  /** Geometry: linear track (default) or circular gauge. */
  shape?: ProgressShape
  /** Render the current value in the center of a circular gauge. */
  showValue?: boolean
  /** Format the centered value read-out (default: whole percent). */
  formatValue?: (value: number, max: number) => string
}

export const Progress = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(function Progress(
  {
    className,
    formatValue = defaultFormatValue,
    max = 100,
    shape = 'linear',
    showValue = false,
    size = 'md',
    value,
    ...props
  },
  ref,
) {
  const styles = progressRecipe({ shape, size })
  const resolved = value ?? 0
  const percentage = max > 0 ? (resolved / max) * 100 : 0

  if (shape === 'circular') {
    const offset = CIRCLE_CIRCUMFERENCE * (1 - percentage / 100)

    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cx(styles.root, className)}
        max={max}
        value={value}
        {...props}
      >
        <svg aria-hidden className={styles.circle} viewBox="0 0 100 100">
          <circle
            className={styles.circleTrack}
            cx={CIRCLE_CENTER}
            cy={CIRCLE_CENTER}
            r={CIRCLE_RADIUS}
            strokeWidth={CIRCLE_STROKE_WIDTH}
          />
          <circle
            className={styles.circleRange}
            cx={CIRCLE_CENTER}
            cy={CIRCLE_CENTER}
            r={CIRCLE_RADIUS}
            strokeDasharray={String(CIRCLE_CIRCUMFERENCE)}
            strokeDashoffset={offset}
            strokeWidth={CIRCLE_STROKE_WIDTH}
          />
          {showValue ? (
            <text
              className={styles.valueText}
              dominantBaseline="central"
              textAnchor="middle"
              x={CIRCLE_CENTER}
              y={CIRCLE_CENTER}
            >
              {formatValue(resolved, max)}
            </text>
          ) : null}
        </svg>
      </ProgressPrimitive.Root>
    )
  }

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cx(styles.root, className)}
      max={max}
      value={value}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={styles.indicator}
        style={{ inlineSize: `${String(percentage)}%` }}
      />
    </ProgressPrimitive.Root>
  )
})
