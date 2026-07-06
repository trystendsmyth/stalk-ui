import { forwardRef } from 'react'
import { css, cx } from 'styled-system/css'
import { badge as badgeRecipe } from 'styled-system/recipes'

import type { Tone } from './tones'
import type { HTMLAttributes } from 'react'

export type BadgeSize = (typeof badgeRecipe.variantMap.size)[number]
export type BadgeVariant = (typeof badgeRecipe.variantMap.variant)[number]
export type BadgeRadius = (typeof badgeRecipe.variantMap.radius)[number]
/** Status tones plus `neutral` — a grey "informational, not a status" state. */
export type BadgeTone = Tone | 'neutral'

/** Tone options for the Badge, including the badge-specific `neutral`. */
export const BADGE_TONES = ['accent', 'success', 'warning', 'danger', 'info', 'neutral'] as const

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Border radius. Defaults to `full` (pill). */
  radius?: BadgeRadius
  /** Size ladder `micro | sm | md | lg`; defaults to `lg` (the pre-1.3 `md`). */
  size?: BadgeSize
  /** Selects the semantic color palette used by the badge. Defaults to `accent`. */
  tone?: BadgeTone
  variant?: BadgeVariant
}

export const Badge = /* @__PURE__ */ forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, radius = 'full', size = 'lg', tone = 'accent', variant = 'subtle', ...props },
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
