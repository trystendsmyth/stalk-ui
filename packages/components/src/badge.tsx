import { forwardRef } from 'react'
import { css, cx } from 'styled-system/css'
import { badge as badgeRecipe } from 'styled-system/recipes'

import type { HTMLAttributes } from 'react'

export type BadgeSize = 'sm' | 'md'
export type BadgeVariant = 'solid' | 'subtle' | 'outline'
export type BadgeTone = 'accent' | 'success' | 'warning' | 'danger' | 'info'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  size?: BadgeSize
  variant?: BadgeVariant
  /** Selects the semantic color palette used by the badge. Defaults to `accent`. */
  tone?: BadgeTone
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, size = 'md', tone = 'accent', variant = 'subtle', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cx(badgeRecipe({ size, variant }), css({ colorPalette: tone }), className)}
        {...props}
      />
    )
  },
)

Badge.displayName = 'Badge'
