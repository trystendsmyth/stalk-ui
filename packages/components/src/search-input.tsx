import { Search, X } from 'lucide-react'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { css } from 'styled-system/css'

import { Input } from './input'

import type { InputAlign, InputFieldProps, InputRootProps, InputSize } from './input'
import type { ChangeEvent, KeyboardEvent, Ref } from 'react'

const clearButtonStyles = css({
  alignItems: 'center',
  appearance: 'none',
  bgColor: 'transparent',
  border: 'none',
  borderRadius: 'sm',
  color: 'fg.muted',
  cursor: 'pointer',
  display: 'inline-flex',
  flexShrink: 0,
  justifyContent: 'center',
  m: 0,
  p: '2',
  transitionDuration: 'fast',
  transitionProperty: 'color, background-color',
  _hover: { color: 'fg.default' },
  _focusVisible: {
    focusRingWidth: 'base',
    focusRingColor: 'accent.muted',
    focusRingOffsetWidth: '1',
    focusRingOffsetColor: 'bg.canvas',
  },
  '& > svg': { h: '16', w: '16' },
})

const iconStyles = css({ color: 'fg.muted', '& > svg': { display: 'block', h: '16', w: '16' } })

const mergeRefs =
  <T,>(...refs: (Ref<T> | undefined)[]) =>
  (value: T | null) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(value)
      else if (ref != null) (ref as { current: T | null }).current = value
    }
  }

export interface SearchInputProps extends Omit<InputFieldProps, 'type' | 'size'> {
  align?: InputAlign
  /** Root className. */
  className?: string
  /** Accessible label for the clear button. */
  clearLabel?: string
  /** Debounce (ms) applied to `onValueChange`. Defaults to 0 (no debounce). */
  debounce?: number
  invalid?: boolean
  /** Called with the current query string (debounced when `debounce` > 0). */
  onValueChange?: (value: string) => void
  rootProps?: Omit<InputRootProps, 'children' | 'className' | 'disabled' | 'size'>
  size?: InputSize
}

export const SearchInput = /* @__PURE__ */ forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    {
      align = 'start',
      className,
      clearLabel = 'Clear search',
      debounce = 0,
      defaultValue,
      disabled = false,
      invalid = false,
      onChange,
      onKeyDown,
      onValueChange,
      rootProps,
      size = 'md',
      value,
      ...fieldProps
    },
    ref,
  ) {
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = useState(() => String(defaultValue ?? ''))
    const currentValue = isControlled ? String(value) : internalValue
    const inputRef = useRef<HTMLInputElement | null>(null)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(
      () => () => {
        if (debounceRef.current) clearTimeout(debounceRef.current)
      },
      [],
    )

    const emitValueChange = useCallback(
      (next: string) => {
        if (!onValueChange) return
        if (debounce > 0) {
          if (debounceRef.current) clearTimeout(debounceRef.current)
          debounceRef.current = setTimeout(() => {
            onValueChange(next)
          }, debounce)
        } else {
          onValueChange(next)
        }
      },
      [debounce, onValueChange],
    )

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalValue(event.target.value)
      onChange?.(event)
      emitValueChange(event.target.value)
    }

    const clear = () => {
      if (!isControlled) setInternalValue('')
      emitValueChange('')
      const input = inputRef.current
      if (input) {
        input.value = ''
        input.focus()
      }
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event)
      if (event.defaultPrevented) return
      if (event.key === 'Escape' && currentValue !== '') {
        event.preventDefault()
        clear()
      }
    }

    return (
      <Input.Root
        align={align}
        className={className}
        disabled={disabled}
        invalid={invalid}
        size={size}
        {...rootProps}
      >
        <Input.Prefix>
          <span aria-hidden="true" className={iconStyles}>
            <Search />
          </span>
        </Input.Prefix>
        <Input.Field
          ref={mergeRefs(ref, inputRef)}
          autoComplete={fieldProps.autoComplete ?? 'off'}
          role="searchbox"
          type="search"
          {...(isControlled ? { value } : { defaultValue })}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          {...fieldProps}
        />
        {currentValue !== '' ? (
          <Input.Suffix>
            <button
              aria-label={clearLabel}
              className={clearButtonStyles}
              disabled={disabled}
              onClick={clear}
              type="button"
            >
              <X aria-hidden="true" />
            </button>
          </Input.Suffix>
        ) : null}
      </Input.Root>
    )
  },
)
