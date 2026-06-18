import { ChevronDown, ChevronUp } from 'lucide-react'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { cx } from 'styled-system/css'
import { numberInput as numberInputRecipe } from 'styled-system/recipes'

import { Input } from './input'

import type { InputAlign, InputFieldProps, InputRootProps, InputSize } from './input'
import type { ChangeEvent, FocusEvent, KeyboardEvent, Ref } from 'react'

const styles = /* @__PURE__ */ numberInputRecipe()

const mergeRefs =
  <T,>(...refs: (Ref<T> | undefined)[]) =>
  (value: T | null) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(value)
      else if (ref != null) (ref as { current: T | null }).current = value
    }
  }

export interface NumberInputProps extends Omit<
  InputFieldProps,
  'defaultValue' | 'size' | 'type' | 'value'
> {
  align?: InputAlign
  /** Root className. */
  className?: string
  /** Clamp the value into [min, max] on blur. Defaults to true. */
  clampValueOnBlur?: boolean
  /** Accessible label for the decrement stepper. */
  decrementLabel?: string
  defaultValue?: number
  /** Hide the increment/decrement steppers. */
  hideStepper?: boolean
  /** Accessible label for the increment stepper. */
  incrementLabel?: string
  invalid?: boolean
  /** Step applied to PageUp/PageDown. Defaults to `step * 10`. */
  largeStep?: number
  /** BCP-47 locale used for display formatting. */
  locale?: string
  max?: number
  min?: number
  /** Called with the parsed numeric value (or null when empty/invalid). */
  onValueChange?: (value: number | null) => void
  /** `Intl.NumberFormat` options applied to the displayed value on blur. */
  formatOptions?: Intl.NumberFormatOptions
  rootProps?: Omit<InputRootProps, 'children' | 'className' | 'disabled' | 'size'>
  size?: InputSize
  step?: number
  value?: number | null
}

export const NumberInput = /* @__PURE__ */ forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput(
    {
      align = 'end',
      className,
      clampValueOnBlur = true,
      decrementLabel = 'Decrement',
      defaultValue,
      disabled = false,
      formatOptions,
      hideStepper = false,
      incrementLabel = 'Increment',
      invalid = false,
      largeStep,
      locale,
      max,
      min,
      onBlur,
      onChange,
      onKeyDown,
      onValueChange,
      rootProps,
      size = 'md',
      step = 1,
      value,
      ...fieldProps
    },
    ref,
  ) {
    const isControlled = value !== undefined
    const inputRef = useRef<HTMLInputElement | null>(null)
    const focusedRef = useRef(false)
    const bigStep = largeStep ?? step * 10

    const clamp = useCallback(
      (n: number) => {
        let next = n
        if (min !== undefined) next = Math.max(min, next)
        if (max !== undefined) next = Math.min(max, next)
        return next
      },
      [max, min],
    )

    const parse = (text: string): number | null => {
      const cleaned = text.replace(/[^0-9.eE+-]/g, '')
      if (cleaned.trim() === '') return null
      const n = Number(cleaned)
      return Number.isFinite(n) ? n : null
    }

    const formatDisplay = useCallback(
      (n: number | null): string => {
        if (n === null) return ''
        if (formatOptions || locale) return new Intl.NumberFormat(locale, formatOptions).format(n)
        return String(n)
      },
      [formatOptions, locale],
    )

    const initialText =
      value !== undefined && value !== null
        ? formatDisplay(value)
        : defaultValue !== undefined
          ? formatDisplay(defaultValue)
          : ''
    const [text, setText] = useState(initialText)

    // Keep the field in sync with a controlled `value`, but never while the user
    // is actively typing (that would clobber transient input like "1." or "-").
    useEffect(() => {
      if (!isControlled || focusedRef.current) return
      // `isControlled` narrows `value` to `number | null` here (aliased condition).
      setText(value === null ? '' : formatDisplay(value))
    }, [formatDisplay, isControlled, value])

    const currentNumber = parse(text)

    const commit = useCallback(
      (n: number | null, display: string) => {
        if (!isControlled) setText(display)
        onValueChange?.(n)
      },
      [isControlled, onValueChange],
    )

    const stepBy = useCallback(
      (delta: number) => {
        if (disabled) return
        const base = parse(text) ?? clamp(min ?? 0)
        const next = clamp(base + delta)
        commit(next, formatDisplay(next))
        // Reflect immediately for controlled consumers that echo the value back.
        if (isControlled) setText(formatDisplay(next))
        inputRef.current?.focus()
      },
      [clamp, commit, disabled, formatDisplay, isControlled, min, text],
    )

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const raw = event.target.value
      setText(raw)
      onChange?.(event)
      onValueChange?.(parse(raw))
    }

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      focusedRef.current = false
      onBlur?.(event)
      const n = parse(text)
      if (n === null) {
        if (!isControlled) setText('')
        return
      }
      const next = clampValueOnBlur ? clamp(n) : n
      commit(next, formatDisplay(next))
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event)
      if (event.defaultPrevented) return
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault()
          stepBy(step)
          break
        case 'ArrowDown':
          event.preventDefault()
          stepBy(-step)
          break
        case 'PageUp':
          event.preventDefault()
          stepBy(bigStep)
          break
        case 'PageDown':
          event.preventDefault()
          stepBy(-bigStep)
          break
        case 'Home':
          if (min !== undefined) {
            event.preventDefault()
            commit(min, formatDisplay(min))
            if (isControlled) setText(formatDisplay(min))
          }
          break
        case 'End':
          if (max !== undefined) {
            event.preventDefault()
            commit(max, formatDisplay(max))
            if (isControlled) setText(formatDisplay(max))
          }
          break
        default:
          break
      }
    }

    const incrementDisabled =
      disabled || (max !== undefined && currentNumber !== null && currentNumber >= max)
    const decrementDisabled =
      disabled || (min !== undefined && currentNumber !== null && currentNumber <= min)

    return (
      <Input.Root
        align={align}
        className={className}
        disabled={disabled}
        invalid={invalid}
        size={size}
        {...rootProps}
      >
        <Input.Field
          ref={mergeRefs(ref, inputRef)}
          aria-valuemax={max}
          aria-valuemin={min}
          aria-valuenow={currentNumber ?? undefined}
          autoComplete="off"
          inputMode="decimal"
          role="spinbutton"
          type="text"
          value={text}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={() => {
            focusedRef.current = true
          }}
          onKeyDown={handleKeyDown}
          {...fieldProps}
        />
        {hideStepper ? null : (
          <Input.Suffix>
            <span className={cx(styles.stepper)}>
              <button
                aria-label={incrementLabel}
                className={styles.button}
                disabled={incrementDisabled}
                onClick={() => {
                  stepBy(step)
                }}
                tabIndex={-1}
                type="button"
              >
                <ChevronUp aria-hidden="true" />
              </button>
              <button
                aria-label={decrementLabel}
                className={styles.button}
                disabled={decrementDisabled}
                onClick={() => {
                  stepBy(-step)
                }}
                tabIndex={-1}
                type="button"
              >
                <ChevronDown aria-hidden="true" />
              </button>
            </span>
          </Input.Suffix>
        )}
      </Input.Root>
    )
  },
)
