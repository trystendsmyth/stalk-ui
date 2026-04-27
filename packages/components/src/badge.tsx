import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { badge as badgeRecipe } from 'styled-system/recipes'

import type { HTMLAttributes } from 'react'

export type BadgeSize = 'sm' | 'md'
export type BadgeVariant = 'solid' | 'subtle' | 'outline'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  size?: BadgeSize
  variant?: BadgeVariant
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, size = 'md', variant = 'subtle', ...props }, ref) => {
    return <span ref={ref} className={cx(badgeRecipe({ size, variant }), className)} {...props} />
  },
)

Badge.displayName = 'Badge'
