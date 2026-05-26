import * as ProgressPrimitive from '@radix-ui/react-progress'
import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { progress as progressRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef } from 'react'

export type ProgressSize = (typeof progressRecipe.variantMap.size)[number]

export interface ProgressProps extends ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  size?: ProgressSize
}

export const Progress = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(function Progress({ className, max = 100, size = 'md', value, ...props }, ref) {
  const styles = progressRecipe({ size })
  const resolved = value ?? 0
  const percentage = max > 0 ? (resolved / max) * 100 : 0

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
