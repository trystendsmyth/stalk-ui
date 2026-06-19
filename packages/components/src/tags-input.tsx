import { forwardRef, useRef, useState } from 'react'
import { cx } from 'styled-system/css'
import { tagsInput as tagsInputRecipe } from 'styled-system/recipes'

import { Tag } from './tag'

import type { TagRadius, TagSize, TagTone, TagVariant } from './tag'
import type { ChangeEvent, ClipboardEvent, KeyboardEvent, Ref } from 'react'

/** Per-tag visual overrides returned by `getTagProps`. */
export interface TagStyleProps {
  radius?: TagRadius
  tone?: TagTone
  variant?: TagVariant
}

export type TagsInputSize = (typeof tagsInputRecipe.variantMap.size)[number]

const mergeRefs =
  <T,>(...refs: (Ref<T> | undefined)[]) =>
  (value: T | null) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(value)
      else if (ref != null) (ref as { current: T | null }).current = value
    }
  }

const CHIP_SIZE: Record<TagsInputSize, TagSize> = { sm: 'sm', md: 'sm', lg: 'md' }

export interface TagsInputProps {
  /** Accessible name for the entry field. */
  'aria-label'?: string
  /** Id of an element labelling the entry field. */
  'aria-labelledby'?: string
  /** Id of an element describing the entry field. */
  'aria-describedby'?: string
  /** Add the pending entry when the field loses focus. */
  addOnBlur?: boolean
  /** Allow the same value more than once. Defaults to false. */
  allowDuplicates?: boolean
  className?: string
  defaultValue?: string[]
  /**
   * Format/normalize each entry before it becomes a tag (e.g. trim + lowercase an
   * email). Return an empty string to reject the entry. Applied per tag.
   */
  formatTag?: (value: string) => string
  /**
   * Per-tag visual overrides — return a `tone`/`variant`/`radius` for each tag so
   * chips can differ in color and style (e.g. color a label by category).
   */
  getTagProps?: (value: string, index: number) => TagStyleProps
  disabled?: boolean
  id?: string
  invalid?: boolean
  /** Maximum number of tags. Further entries are ignored. */
  max?: number
  /** Submitted with a surrounding form: emits a hidden input per tag. */
  name?: string
  onValueChange?: (tags: string[]) => void
  placeholder?: string
  /** Accessible label for each tag's remove button. */
  removeLabel?: string
  size?: TagsInputSize
  /** Color palette for the chips. Defaults to `accent`. */
  tone?: TagTone
  value?: string[]
}

export const TagsInput = /* @__PURE__ */ forwardRef<HTMLInputElement, TagsInputProps>(
  function TagsInput(
    {
      'aria-describedby': ariaDescribedby,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      addOnBlur = false,
      allowDuplicates = false,
      className,
      defaultValue,
      disabled = false,
      formatTag,
      getTagProps,
      id,
      invalid = false,
      max,
      name,
      onValueChange,
      placeholder,
      removeLabel = 'Remove',
      size = 'md',
      tone = 'accent',
      value,
    },
    ref,
  ) {
    const isControlled = value !== undefined
    const [internal, setInternal] = useState<string[]>(defaultValue ?? [])
    const [draft, setDraft] = useState('')
    const inputRef = useRef<HTMLInputElement | null>(null)
    const tags = isControlled ? value : internal

    const styles = tagsInputRecipe({ disabled, invalid, size })

    const setTags = (next: string[]) => {
      if (!isControlled) setInternal(next)
      onValueChange?.(next)
    }

    const addMany = (raw: string) => {
      const candidates = raw
        .split(/[,\n\t]/)
        .map((entry) => entry.trim())
        .filter(Boolean)
      if (candidates.length === 0) return
      const next = [...tags]
      for (const entry of candidates) {
        if (max !== undefined && next.length >= max) break
        // Format/validate per tag; an empty result rejects the entry.
        const candidate = formatTag ? formatTag(entry) : entry
        if (!candidate) continue
        if (!allowDuplicates && next.includes(candidate)) continue
        next.push(candidate)
      }
      if (next.length !== tags.length) setTags(next)
    }

    const removeAt = (index: number) => {
      setTags(tags.filter((_, i) => i !== index))
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' || event.key === ',') {
        if (draft.trim() !== '') {
          event.preventDefault()
          addMany(draft)
          setDraft('')
        }
        return
      }
      if (event.key === 'Backspace' && draft === '' && tags.length > 0) {
        event.preventDefault()
        removeAt(tags.length - 1)
      }
    }

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
      const text = event.clipboardData.getData('text')
      if (/[,\n\t]/.test(text)) {
        event.preventDefault()
        addMany(`${draft}${text}`)
        setDraft('')
      }
    }

    const handleBlur = () => {
      if (addOnBlur && draft.trim() !== '') {
        addMany(draft)
        setDraft('')
      }
    }

    const focusField = () => {
      if (!disabled) inputRef.current?.focus()
    }

    return (
      <div
        className={cx(styles.root, className)}
        data-disabled={disabled ? '' : undefined}
        data-invalid={invalid ? '' : undefined}
        onPointerDown={(event) => {
          // Clicking the shell (not a chip control) focuses the entry field.
          if ((event.target as HTMLElement).closest('button, input') === null) {
            event.preventDefault()
            focusField()
          }
        }}
      >
        {tags.map((tag, index) => (
          <Tag
            key={`${tag}-${String(index)}`}
            disabled={disabled}
            size={CHIP_SIZE[size]}
            tone={tone}
            {...getTagProps?.(tag, index)}
          >
            <Tag.Label>{tag}</Tag.Label>
            <Tag.Close
              aria-label={`${removeLabel}: ${tag}`}
              onClick={() => {
                removeAt(index)
              }}
            />
          </Tag>
        ))}
        {name
          ? tags.map((tag, index) => (
              <input key={`hidden-${tag}-${String(index)}`} name={name} type="hidden" value={tag} />
            ))
          : null}
        <input
          ref={mergeRefs(ref, inputRef)}
          aria-describedby={ariaDescribedby}
          aria-invalid={invalid ? true : undefined}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          autoComplete="off"
          className={styles.field}
          disabled={disabled}
          id={id}
          placeholder={placeholder}
          type="text"
          value={draft}
          onBlur={handleBlur}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setDraft(event.target.value)
          }}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
        />
      </div>
    )
  },
)
