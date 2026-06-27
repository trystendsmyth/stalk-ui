'use client'

import { forwardRef } from 'react'
import { css, cx } from 'styled-system/css'
import { sparkline as sparklineRecipe } from 'styled-system/recipes'

import type { Tone } from './tones'
import type { SVGProps } from 'react'

const styles = /* @__PURE__ */ sparklineRecipe()

/** Trim coordinate floats for compact, stable path strings. */
const n = (value: number) => value.toFixed(2)

export interface SparklineProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  /** Series of numbers, left → right. Needs at least two points to draw a line. */
  data: number[]
  /** Intrinsic width in px (the SVG still scales to its box). Default `80`. */
  width?: number
  /** Intrinsic height in px. Default `24`. */
  height?: number
  /** Tone for the line / area / point. Default `accent`. */
  tone?: Tone
  /** Fill the area beneath the line. */
  area?: boolean
  /** Mark the final data point. */
  showLastPoint?: boolean
  /** Line thickness in px. Default `1.5`. */
  strokeWidth?: number
  /**
   * Accessible label, e.g. "Revenue, last 30 days". When omitted the sparkline is
   * decorative (`aria-hidden`) — pair it with adjacent text in that case.
   */
  'aria-label'?: string
}

/** Map values to SVG points within `[pad, size-pad]`, flipping Y so up = larger. */
const buildPoints = (data: number[], width: number, height: number, pad: number) => {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1
  const innerW = width - pad * 2
  const innerH = height - pad * 2
  const step = data.length > 1 ? innerW / (data.length - 1) : 0
  return data.map((value, i) => {
    const x = pad + i * step
    const y = pad + innerH - ((value - min) / span) * innerH
    return [x, y] as const
  })
}

export const Sparkline = /* @__PURE__ */ forwardRef<SVGSVGElement, SparklineProps>(
  function Sparkline(
    {
      data,
      width = 80,
      height = 24,
      tone = 'accent',
      area = false,
      showLastPoint = false,
      strokeWidth = 1.5,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) {
    const pad = Math.max(strokeWidth, showLastPoint ? strokeWidth + 1.5 : strokeWidth)
    const points = data.length > 0 ? buildPoints(data, width, height, pad) : []
    const line = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${n(x)} ${n(y)}`).join(' ')
    const last = points.at(-1)
    const first = points.at(0)
    const baseline = n(height - pad)
    const areaPath =
      area && first && last
        ? `${line} L${n(last[0])} ${baseline} L${n(first[0])} ${baseline} Z`
        : undefined

    return (
      <svg
        ref={ref}
        className={cx(css({ colorPalette: tone }), styles.root, className)}
        width={width}
        height={height}
        viewBox={`0 0 ${String(width)} ${String(height)}`}
        preserveAspectRatio="none"
        role={ariaLabel ? 'img' : undefined}
        aria-label={ariaLabel}
        aria-hidden={ariaLabel ? undefined : true}
        {...props}
      >
        {areaPath ? <path className={styles.area} d={areaPath} /> : null}
        {line ? <path className={styles.line} d={line} strokeWidth={strokeWidth} /> : null}
        {showLastPoint && last ? (
          <circle
            className={styles.point}
            cx={last[0]}
            cy={last[1]}
            r={strokeWidth + 0.5}
            strokeWidth={strokeWidth}
          />
        ) : null}
      </svg>
    )
  },
)
