import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { swap as swapRecipe } from 'styled-system/recipes'

import type { HTMLAttributes, ReactNode } from 'react'

export type SwapEffect = 'fade' | 'rotate' | 'flip' | 'scale'

export interface SwapProps extends HTMLAttributes<HTMLSpanElement> {
  /** Show the `on` content; `false` shows `off`. */
  swap: boolean
  on: ReactNode
  off: ReactNode
  /** Transition between the two: crossfade (default), rotate, flip, or scale. */
  effect?: SwapEffect
}

/**
 * Swaps between two elements (icons, labels) stacked in one grid cell, with a
 * CSS transition. Purely presentational — pair it with the control that owns
 * the state (a Toggle, Button, or Switch), which also carries the accessible
 * name; the inactive side is hidden from assistive tech.
 */
export const Swap = /* @__PURE__ */ forwardRef<HTMLSpanElement, SwapProps>(function Swap(
  { className, effect = 'fade', off, on, swap, ...props },
  ref,
) {
  const styles = swapRecipe({ effect })

  return (
    <span
      ref={ref}
      className={cx(styles.root, className)}
      data-swap={swap ? 'on' : 'off'}
      {...props}
    >
      <span
        aria-hidden={swap ? undefined : true}
        className={styles.indicator}
        data-state={swap ? 'open' : 'closed'}
      >
        {on}
      </span>
      <span
        aria-hidden={swap ? true : undefined}
        className={styles.indicator}
        data-state={swap ? 'closed' : 'open'}
      >
        {off}
      </span>
    </span>
  )
})
