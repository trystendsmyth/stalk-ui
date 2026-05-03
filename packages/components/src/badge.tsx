import { forwardRef } from 'react'
import { css, cx } from 'styled-system/css'
import { badge as badgeRecipe } from 'styled-system/recipes'

import type { HTMLAttributes } from 'react'

export type BadgeSize = 'sm' | 'md'
export type BadgeVariant = 'solid' | 'subtle' | 'outline'
export type BadgeRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type BadgeTone = 'accent' | 'success' | 'warning' | 'danger' | 'info'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Border radius. Defaults to `full` (pill). */
  radius?: BadgeRadius
  size?: BadgeSize
  /** Selects the semantic color palette used by the badge. Defaults to `accent`. */
  tone?: BadgeTone
  variant?: BadgeVariant
}

export const Badge = /* @__PURE__ */ forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, radius = 'full', size = 'md', tone = 'accent', variant = 'subtle', ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx(badgeRecipe({ radius, size, variant }), css({ colorPalette: tone }), className)}
      {...props}
    />
  )
})
