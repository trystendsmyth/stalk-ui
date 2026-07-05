'use client'

import { Star } from 'lucide-react'
import { forwardRef, useState } from 'react'
import { cx } from 'styled-system/css'
import { rating as ratingRecipe } from 'styled-system/recipes'

import type { HTMLAttributes, KeyboardEvent } from 'react'

export type RatingSize = (typeof ratingRecipe.variantMap.size)[number]

export interface RatingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current rating (controlled). */
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  /** Number of items (default 5). */
  max?: number
  readOnly?: boolean
  disabled?: boolean
  size?: RatingSize
  /** Accessible name for the radio group. */
  'aria-label'?: string
  /** Accessible per-item label; receives the 1-based value. */
  itemLabel?: (value: number) => string
}

/**
 * Star rating with radio-group semantics: one tab stop, Arrow keys move the
 * value, Space/Enter (or click) select. `readOnly` renders a static read-out.
 */
export const Rating = /* @__PURE__ */ forwardRef<HTMLDivElement, RatingProps>(function Rating(
  {
    className,
    defaultValue = 0,
    disabled = false,
    itemLabel = (value) => `${String(value)} star${value === 1 ? '' : 's'}`,
    max = 5,
    onChange,
    readOnly = false,
    size = 'md',
    value,
    'aria-label': ariaLabel,
    ...props
  },
  ref,
) {
  const styles = ratingRecipe({ size })
  const [internal, setInternal] = useState(defaultValue)
  const current = value ?? internal
  const items = Array.from({ length: max }, (_, index) => index + 1)

  const setValue = (next: number) => {
    if (readOnly || disabled) {
      return
    }
    setInternal(next)
    onChange?.(next)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const delta =
      event.key === 'ArrowRight' || event.key === 'ArrowUp'
        ? 1
        : event.key === 'ArrowLeft' || event.key === 'ArrowDown'
          ? -1
          : 0

    if (delta === 0) {
      return
    }
    event.preventDefault()
    setValue(Math.min(max, Math.max(1, current + delta)))
  }

  return (
    <div
      ref={ref}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      className={cx(styles.root, className)}
      {...props}
    >
      {items.map((item) => {
        const active = item <= current
        const checked = item === current

        return (
          <button
            key={item}
            type="button"
            role="radio"
            aria-checked={checked}
            aria-label={itemLabel(item)}
            className={styles.item}
            data-active={active ? '' : undefined}
            data-readonly={readOnly ? '' : undefined}
            disabled={disabled}
            // Roving tabindex: the checked item is the single tab stop (or the
            // first item when nothing is selected yet).
            tabIndex={readOnly ? -1 : checked || (current === 0 && item === 1) ? 0 : -1}
            onClick={() => {
              setValue(item)
            }}
            onKeyDown={onKeyDown}
          >
            <Star aria-hidden className={styles.icon} data-active={active ? '' : undefined} />
          </button>
        )
      })}
    </div>
  )
})
