import { X } from 'lucide-react'
import { forwardRef } from 'react'
import { css, cx } from 'styled-system/css'
import { tag as tagRecipe } from 'styled-system/recipes'

import type { Tone } from './tones'
import type { HTMLAttributes, MouseEvent, ReactNode } from 'react'

export type TagSize = (typeof tagRecipe.variantMap.size)[number]
export type TagVariant = (typeof tagRecipe.variantMap.variant)[number]
export type TagRadius = (typeof tagRecipe.variantMap.radius)[number]
export type TagTone = Tone

export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'onClick'> {
  /** Optional leading icon or content rendered before the label. */
  leadingIcon?: ReactNode
  /** Optional trailing content rendered after the label (before the count/close). */
  trailingIcon?: ReactNode
  /** Numeric/text badge rendered after the label (e.g. for resource counts). */
  count?: number | string
  /** Render a small leading dot in the palette's solid color. */
  dot?: boolean
  /** Make the tag focusable/clickable. Adds keyboard activation. */
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void
  /** Show a close button. Called when the user clicks it. */
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void
  /** Accessible label for the close button. */
  closeAriaLabel?: string
  radius?: TagRadius
  size?: TagSize
  /** Selects the semantic color palette. Defaults to `accent`. */
  tone?: TagTone
  variant?: TagVariant
}

export const Tag = /* @__PURE__ */ forwardRef<HTMLSpanElement, TagProps>(function Tag(
  {
    children,
    className,
    closeAriaLabel = 'Remove',
    count,
    dot = false,
    leadingIcon,
    onClick,
    onClose,
    onKeyDown,
    radius = 'full',
    size = 'md',
    tone = 'accent',
    trailingIcon,
    variant = 'subtle',
    ...props
  },
  ref,
) {
  const interactive = onClick !== undefined
  const styles = tagRecipe({ dot, interactive, radius, size, variant })
  const hasCount = count !== undefined && count !== ''

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    onKeyDown?.(event)
    if (!onClick || event.defaultPrevented) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick(event as unknown as MouseEvent<HTMLSpanElement>)
    }
  }

  const interactiveProps = interactive
    ? ({
        role: 'button',
        tabIndex: 0,
        onClick,
        onKeyDown: handleKeyDown,
      } as const)
    : {}

  return (
    <span
      ref={ref}
      className={cx(styles.root, css({ colorPalette: tone }), className)}
      {...interactiveProps}
      {...props}
    >
      <span className={styles.label}>
        {leadingIcon}
        {children}
        {trailingIcon}
      </span>
      {hasCount ? <span className={styles.count}>{count}</span> : null}
      {onClose ? (
        <button
          type="button"
          aria-label={closeAriaLabel}
          className={styles.close}
          onClick={(event) => {
            event.stopPropagation()
            onClose(event)
          }}
        >
          <X aria-hidden="true" />
        </button>
      ) : null}
    </span>
  )
})
