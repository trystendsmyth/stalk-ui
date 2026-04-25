import { forwardRef } from 'react'
import { badge as badgeRecipe } from 'styled-system/recipes'

import type { HTMLAttributes } from 'react'

export type BadgeSize = 'sm' | 'md'
export type BadgeVariant = 'solid' | 'subtle' | 'outline'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  size?: BadgeSize
  variant?: BadgeVariant
}

const joinClassNames = (...classNames: (string | undefined)[]) =>
  classNames
    .filter((className): className is string => className !== undefined && className.length > 0)
    .join(' ')

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, size = 'md', variant = 'subtle', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={joinClassNames(badgeRecipe({ size, variant }), className)}
        {...props}
      />
    )
  },
)

Badge.displayName = 'Badge'
