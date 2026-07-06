import { createStyleContext } from '@stalk-ui/utils'
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import { forwardRef, useMemo } from 'react'
import { css, cx } from 'styled-system/css'
import { stat as statRecipe } from 'styled-system/recipes'

import type { HTMLAttributes } from 'react'

export type StatSize = (typeof statRecipe.variantMap.size)[number]
export type StatDeltaDirection = 'up' | 'down' | 'flat'

const { StyleProvider, useSlotStyles, withContext } = /* @__PURE__ */ createStyleContext(
  statRecipe,
  { name: 'Stat' },
)

export interface StatRootProps extends HTMLAttributes<HTMLDivElement> {
  size?: StatSize
}

export const StatRoot = /* @__PURE__ */ forwardRef<HTMLDivElement, StatRootProps>(function StatRoot(
  { className, size = 'md', ...props },
  ref,
) {
  const styles = useMemo(() => statRecipe({ size }), [size])

  return (
    <StyleProvider value={styles}>
      <div ref={ref} className={cx(styles.root, className)} {...props} />
    </StyleProvider>
  )
})

export const StatLabel = /* @__PURE__ */ withContext('p', 'label')
export const StatValue = /* @__PURE__ */ withContext('p', 'value')
export const StatUnit = /* @__PURE__ */ withContext('span', 'unit')
/** Free slot below the read-out — composes naturally with `Sparkline`. */
export const StatTrend = /* @__PURE__ */ withContext('div', 'trend')

const deltaTone: Record<StatDeltaDirection, string> = {
  up: 'success',
  down: 'danger',
  flat: 'neutral',
}

const deltaIcons = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  flat: Minus,
} as const

export interface StatDeltaProps extends HTMLAttributes<HTMLSpanElement> {
  /** Movement since the comparison period; drives tone and arrow. */
  direction?: StatDeltaDirection
}

export const StatDelta = /* @__PURE__ */ forwardRef<HTMLSpanElement, StatDeltaProps>(
  function StatDelta({ children, className, direction = 'flat', ...props }, ref) {
    const styles = useSlotStyles()
    const Icon = deltaIcons[direction]

    return (
      <span
        ref={ref}
        className={cx(styles.delta, css({ colorPalette: deltaTone[direction] }), className)}
        {...props}
      >
        <Icon size={14} aria-hidden />
        {children}
      </span>
    )
  },
)

export const Stat = /* @__PURE__ */ Object.assign(StatRoot, {
  Delta: StatDelta,
  Label: StatLabel,
  Root: StatRoot,
  Trend: StatTrend,
  Unit: StatUnit,
  Value: StatValue,
})
