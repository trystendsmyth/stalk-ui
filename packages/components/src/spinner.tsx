import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { spinner as spinnerRecipe } from 'styled-system/recipes'

import type { HTMLAttributes } from 'react'

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl'

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize
  /** Accessible name announced to assistive tech. Defaults to `"Loading"`. */
  'aria-label'?: string
}

// SVG box + stroke per size variant. CSS sizing stays in the slot recipe; these
// values drive the SVG geometry (viewBox, circle radius, stroke width) and so
// must round-trip through the renderer rather than tokens.
const SPINNER_METRICS: Record<SpinnerSize, { box: number; stroke: number }> = {
  sm: { box: 16, stroke: 1.5 },
  md: { box: 22, stroke: 2.5 },
  lg: { box: 28, stroke: 3.5 },
  xl: { box: 34, stroke: 4.5 },
}

// 40% arc — short enough to read as "in motion", long enough to remain visible
// at small sizes when paused by reduced-motion.
const ARC_FRACTION = 0.4

export const Spinner = /* @__PURE__ */ forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { 'aria-label': ariaLabel = 'Loading', className, size = 'md', ...props },
  ref,
) {
  const styles = spinnerRecipe({ size })
  const { box, stroke } = SPINNER_METRICS[size]
  const radius = (box - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const dashLength = ARC_FRACTION * circumference
  const center = box / 2

  return (
    <span
      ref={ref}
      role="status"
      aria-label={ariaLabel}
      className={cx(styles.root, className)}
      {...props}
    >
      <svg
        aria-hidden="true"
        fill="none"
        height={box}
        viewBox={`0 0 ${String(box)} ${String(box)}`}
        width={box}
      >
        <circle
          className={styles.track}
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={stroke}
        />
        <circle
          className={styles.indicator}
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeDasharray={`${String(dashLength)} ${String(circumference - dashLength)}`}
          strokeLinecap="round"
          strokeWidth={stroke}
        />
      </svg>
    </span>
  )
})
