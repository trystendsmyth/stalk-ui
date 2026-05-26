import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { skeleton as skeletonRecipe } from 'styled-system/recipes'

import type { HTMLAttributes } from 'react'

export type SkeletonRadius = (typeof skeletonRecipe.variantMap.radius)[number]

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  radius?: SkeletonRadius
}

export const Skeleton = /* @__PURE__ */ forwardRef<HTMLSpanElement, SkeletonProps>(
  function Skeleton({ className, radius = 'md', ...props }, ref) {
    return (
      <span
        ref={ref}
        aria-hidden="true"
        data-stalk-skeleton=""
        className={cx(skeletonRecipe({ radius }), className)}
        {...props}
      />
    )
  },
)
