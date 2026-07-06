'use client'

import { forwardRef, useEffect, useRef, useState } from 'react'
import { cx } from 'styled-system/css'
import { editable as editableRecipe } from 'styled-system/recipes'

import type { HTMLAttributes } from 'react'

const styles = /* @__PURE__ */ editableRecipe()

export interface EditableProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onSubmit'
> {
  /** Current text (controlled). */
  value?: string
  defaultValue?: string
  /** Fires when an edit is committed (Enter or blur). */
  onSubmit?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  /** Accessible name for both the preview button and the input. */
  'aria-label'?: string
}

/**
 * Inline edit-in-place text: a button-shaped preview that swaps to a text
 * input on activation. Enter/blur commit (onSubmit), Escape cancels.
 */
export const Editable = /* @__PURE__ */ forwardRef<HTMLDivElement, EditableProps>(function Editable(
  {
    className,
    defaultValue = '',
    disabled = false,
    onSubmit,
    placeholder = 'Enter a value',
    value,
    'aria-label': ariaLabel,
    ...props
  },
  ref,
) {
  const [internal, setInternal] = useState(defaultValue)
  const committed = value ?? internal
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(committed)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [editing])

  const commit = () => {
    setEditing(false)
    setInternal(draft)
    onSubmit?.(draft)
  }

  const cancel = () => {
    setEditing(false)
    setDraft(committed)
  }

  const shown = editing ? draft : committed

  return (
    <div ref={ref} className={cx(styles.root, className)} {...props}>
      {/* Invisible copy of the current text; sizes the shared grid cell so the
          preview→input swap stays put and the input grows with the draft. */}
      <span aria-hidden className={styles.ghost}>
        {shown === '' ? placeholder : shown}
      </span>
      {editing ? (
        <input
          ref={inputRef}
          aria-label={ariaLabel}
          className={styles.input}
          // Minimal intrinsic width: the hidden ghost sizes the shared grid
          // cell, and `w: full` stretches the input to it.
          size={1}
          value={draft}
          onBlur={commit}
          onChange={(event) => {
            setDraft(event.target.value)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              commit()
            } else if (event.key === 'Escape') {
              cancel()
            }
          }}
        />
      ) : (
        <button
          type="button"
          aria-label={ariaLabel}
          className={styles.preview}
          data-placeholder={committed === '' ? '' : undefined}
          disabled={disabled}
          onClick={() => {
            setDraft(committed)
            setEditing(true)
          }}
        >
          {committed === '' ? placeholder : committed}
        </button>
      )}
    </div>
  )
})
