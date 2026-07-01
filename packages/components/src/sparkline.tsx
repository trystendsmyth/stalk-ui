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
  /** Primary series of numbers, left → right. Needs at least two points to draw a line. */
  data: number[]
  /** Additional series sharing the same x/y domain, drawn as muted lines. */
  series?: number[][]
  /** Reference threshold: a single value draws a dashed line; `[low, high]` shades a band. */
  reference?: number | [number, number]
  /** Intrinsic width in px (the SVG still scales to its box). Default `80`. */
  width?: number
  /** Intrinsic height in px. Default `24`. */
  height?: number
  /** Tone for the line / area / point. Default `accent`. */
  tone?: Tone
  /** Fill the area beneath the primary line. */
  area?: boolean
  /** Mark the final data point of the primary series. */
  showLastPoint?: boolean
  /** Line thickness in px. Default `1.5`. */
  strokeWidth?: number
  /**
   * Accessible label, e.g. "Revenue, last 30 days". When omitted the sparkline is
   * decorative (`aria-hidden`) — pair it with adjacent text in that case.
   */
  'aria-label'?: string
}

interface Scale {
  xFor: (index: number, length: number) => number
  yFor: (value: number) => number
}

/** Build x/y mappers over a shared `[min, max]` domain, flipping Y so up = larger. */
const buildScale = (
  width: number,
  height: number,
  pad: number,
  min: number,
  max: number,
): Scale => {
  const span = max - min || 1
  const innerW = width - pad * 2
  const innerH = height - pad * 2
  return {
    xFor: (index, length) => pad + (length > 1 ? (innerW / (length - 1)) * index : 0),
    yFor: (value) => pad + innerH - ((value - min) / span) * innerH,
  }
}

const toPoints = (data: number[], scale: Scale) =>
  data.map((value, index) => [scale.xFor(index, data.length), scale.yFor(value)] as const)

const toLine = (points: readonly (readonly [number, number])[]) =>
  points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${n(x)} ${n(y)}`).join(' ')

export const Sparkline = /* @__PURE__ */ forwardRef<SVGSVGElement, SparklineProps>(
  function Sparkline(
    {
      data,
      series,
      reference,
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
    const refValues =
      reference === undefined ? [] : Array.isArray(reference) ? reference : [reference]
    // Shared domain spans every series and the reference so they align vertically.
    const everyValue = [...data, ...(series ?? []).flat(), ...refValues]
    const min = everyValue.length > 0 ? Math.min(...everyValue) : 0
    const max = everyValue.length > 0 ? Math.max(...everyValue) : 0
    const scale = buildScale(width, height, pad, min, max)

    const primary = data.length > 0 ? toPoints(data, scale) : []
    const primaryLine = toLine(primary)
    const first = primary.at(0)
    const last = primary.at(-1)
    const baseline = n(height - pad)
    const areaPath =
      area && first && last
        ? `${primaryLine} L${n(last[0])} ${baseline} L${n(first[0])} ${baseline} Z`
        : undefined

    const refBand = Array.isArray(reference)
      ? {
          y: scale.yFor(Math.max(reference[0], reference[1])),
          height: Math.abs(scale.yFor(reference[0]) - scale.yFor(reference[1])),
        }
      : undefined
    const refLineY = typeof reference === 'number' ? scale.yFor(reference) : undefined

    return (
      <svg
        ref={ref}
        aria-hidden={ariaLabel ? undefined : true}
        aria-label={ariaLabel}
        className={cx(css({ colorPalette: tone }), styles.root, className)}
        height={height}
        preserveAspectRatio="none"
        role={ariaLabel ? 'img' : undefined}
        viewBox={`0 0 ${String(width)} ${String(height)}`}
        width={width}
        {...props}
      >
        {refBand ? (
          <rect
            className={styles.referenceBand}
            height={n(refBand.height)}
            width={n(width - pad * 2)}
            x={n(pad)}
            y={n(refBand.y)}
          />
        ) : null}
        {refLineY !== undefined ? (
          <line
            className={styles.referenceLine}
            strokeWidth={strokeWidth}
            x1={n(pad)}
            x2={n(width - pad)}
            y1={n(refLineY)}
            y2={n(refLineY)}
          />
        ) : null}
        {areaPath ? <path className={styles.area} d={areaPath} /> : null}
        {(series ?? []).map((s, i) =>
          s.length > 0 ? (
            <path
              key={i}
              className={styles.lineMuted}
              d={toLine(toPoints(s, scale))}
              strokeWidth={strokeWidth}
            />
          ) : null,
        )}
        {primaryLine ? (
          <path className={styles.line} d={primaryLine} strokeWidth={strokeWidth} />
        ) : null}
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
