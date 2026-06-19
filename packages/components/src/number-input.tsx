import { ChevronDown, ChevronUp, Minus, Plus } from 'lucide-react'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { cx } from 'styled-system/css'
import { numberInput as numberInputRecipe } from 'styled-system/recipes'

import type { FocusEvent, InputHTMLAttributes, KeyboardEvent, PointerEvent, Ref } from 'react'

export type NumberInputSize = (typeof numberInputRecipe.variantMap.size)[number]
export type NumberInputLayout = (typeof numberInputRecipe.variantMap.layout)[number]

const mergeRefs =
  <T,>(...refs: (Ref<T> | undefined)[]) =>
  (value: T | null) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(value)
      else if (ref != null) (ref as { current: T | null }).current = value
    }
  }

export interface NumberInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'defaultValue' | 'onChange' | 'size' | 'type' | 'value'
> {
  /** Root className. */
  className?: string
  /** Clamp the value into [min, max] on blur. Defaults to true. */
  clampValueOnBlur?: boolean
  /** ISO 4217 currency code; shorthand for an Intl currency format on blur. */
  currency?: string
  /** Accessible label for the decrement control. */
  decrementLabel?: string
  defaultValue?: number
  /** `Intl.NumberFormat` options applied to the displayed value when not editing. */
  formatOptions?: Intl.NumberFormatOptions
  /** Hide the stepper controls. */
  hideStepper?: boolean
  /** Accessible label for the increment control. */
  incrementLabel?: string
  invalid?: boolean
  /** Step applied to PageUp/PageDown. Defaults to `step * 10`. */
  largeStep?: number
  /** `stacked` chevrons on the trailing edge, or `split` minus/plus on each edge. */
  layout?: NumberInputLayout
  /** BCP-47 locale used for display formatting. */
  locale?: string
  max?: number
  min?: number
  /** Called with the parsed numeric value (or null when empty). */
  onValueChange?: (value: number | null) => void
  size?: NumberInputSize
  step?: number
  value?: number | null
}

export const NumberInput = /* @__PURE__ */ forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput(
    {
      className,
      clampValueOnBlur = true,
      currency,
      decrementLabel = 'Decrement',
      defaultValue,
      disabled = false,
      formatOptions,
      hideStepper = false,
      incrementLabel = 'Increment',
      invalid = false,
      largeStep,
      layout = 'stacked',
      locale,
      max,
      min,
      onBlur,
      onFocus,
      onKeyDown,
      onValueChange,
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
    const allowNegative = min === undefined || min < 0
    const styles = numberInputRecipe({ disabled, invalid, layout, size })

    const resolvedFormat: Intl.NumberFormatOptions | undefined = currency
      ? { style: 'currency', currency, ...formatOptions }
      : formatOptions

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
      // Strip grouping separators and currency symbols so a formatted display
      // value (e.g. "$1,999.50") round-trips back to a number for stepping and
      // clamping — otherwise the steppers reset to 0 when the field is formatted.
      const cleaned = text.replace(/[^0-9.-]/g, '')
      if (cleaned === '' || cleaned === '-' || cleaned === '.' || cleaned === '-.') return null
      const n = Number(cleaned)
      return Number.isFinite(n) ? n : null
    }

    // Keep only digits, a single dot, and (when allowed) a single leading minus.
    const sanitize = useCallback(
      (raw: string): string => {
        let s = raw.replace(/[^0-9.-]/g, '')
        const negative = allowNegative && s.startsWith('-')
        s = s.replace(/-/g, '')
        const dot = s.indexOf('.')
        if (dot !== -1) s = `${s.slice(0, dot + 1)}${s.slice(dot + 1).replace(/\./g, '')}`
        return negative ? `-${s}` : s
      },
      [allowNegative],
    )

    const rawString = (n: number): string => String(n)
    const formatDisplay = useCallback(
      (n: number): string =>
        resolvedFormat || locale
          ? new Intl.NumberFormat(locale, resolvedFormat).format(n)
          : String(n),
      [locale, resolvedFormat],
    )

    const initial =
      value !== undefined && value !== null
        ? formatDisplay(value)
        : defaultValue !== undefined
          ? formatDisplay(defaultValue)
          : ''
    const [text, setText] = useState(initial)

    // Sync a controlled `value` while the user is not actively editing.
    useEffect(() => {
      if (!isControlled || focusedRef.current) return
      setText(value === null ? '' : formatDisplay(value))
    }, [formatDisplay, isControlled, value])

    const currentNumber = parse(text)

    const commit = useCallback(
      (n: number | null) => {
        if (!isControlled)
          setText(n === null ? '' : focusedRef.current ? rawString(n) : formatDisplay(n))
        onValueChange?.(n)
      },
      [formatDisplay, isControlled, onValueChange],
    )

    const stepBy = (delta: number) => {
      if (disabled) return
      const base = parse(text) ?? clamp(min ?? 0)
      commit(clamp(base + delta))
    }

    const handleChange = (raw: string) => {
      const next = sanitize(raw)
      setText(next)
      onValueChange?.(parse(next))
    }

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      focusedRef.current = true
      onFocus?.(event)
      const n = parse(text)
      if (n !== null) setText(rawString(n))
    }

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      focusedRef.current = false
      onBlur?.(event)
      const n = parse(text)
      if (n === null) {
        if (!isControlled) setText('')
        onValueChange?.(null)
        return
      }
      const next = clampValueOnBlur ? clamp(n) : n
      if (!isControlled) setText(formatDisplay(next))
      onValueChange?.(next)
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event)
      if (event.defaultPrevented) return
      const keyMap: Record<string, number> = {
        ArrowUp: step,
        ArrowDown: -step,
        PageUp: bigStep,
        PageDown: -bigStep,
      }
      const delta = keyMap[event.key]
      if (delta !== undefined) {
        event.preventDefault()
        stepBy(delta)
      } else if (event.key === 'Home' && min !== undefined) {
        event.preventDefault()
        commit(min)
      } else if (event.key === 'End' && max !== undefined) {
        event.preventDefault()
        commit(max)
      }
    }

    const handleShellPointerDown = (event: PointerEvent<HTMLDivElement>) => {
      if ((event.target as HTMLElement).closest('button, input') === null) {
        event.preventDefault()
        if (!disabled) inputRef.current?.focus()
      }
    }

    const incrementDisabled =
      disabled || (max !== undefined && currentNumber !== null && currentNumber >= max)
    const decrementDisabled =
      disabled || (min !== undefined && currentNumber !== null && currentNumber <= min)

    const field = (
      <input
        ref={mergeRefs(ref, inputRef)}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={currentNumber ?? undefined}
        autoComplete="off"
        className={styles.field}
        disabled={disabled}
        inputMode={allowNegative ? 'text' : 'decimal'}
        role="spinbutton"
        type="text"
        value={text}
        onBlur={handleBlur}
        onChange={(event) => {
          handleChange(event.target.value)
        }}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        {...fieldProps}
      />
    )

    return (
      <div
        className={cx(styles.root, className)}
        data-disabled={disabled ? '' : undefined}
        data-invalid={invalid ? '' : undefined}
        onPointerDown={handleShellPointerDown}
      >
        {layout === 'split' && !hideStepper ? (
          <button
            aria-label={decrementLabel}
            className={styles.button}
            disabled={decrementDisabled}
            tabIndex={-1}
            type="button"
            onClick={() => {
              stepBy(-step)
            }}
          >
            <Minus aria-hidden="true" />
          </button>
        ) : null}
        {field}
        {layout === 'split' && !hideStepper ? (
          <button
            aria-label={incrementLabel}
            className={styles.button}
            disabled={incrementDisabled}
            tabIndex={-1}
            type="button"
            onClick={() => {
              stepBy(step)
            }}
          >
            <Plus aria-hidden="true" />
          </button>
        ) : null}
        {layout === 'stacked' && !hideStepper ? (
          <span className={styles.stepper}>
            <button
              aria-label={incrementLabel}
              className={styles.button}
              disabled={incrementDisabled}
              tabIndex={-1}
              type="button"
              onClick={() => {
                stepBy(step)
              }}
            >
              <ChevronUp aria-hidden="true" />
            </button>
            <button
              aria-label={decrementLabel}
              className={styles.button}
              disabled={decrementDisabled}
              tabIndex={-1}
              type="button"
              onClick={() => {
                stepBy(-step)
              }}
            >
              <ChevronDown aria-hidden="true" />
            </button>
          </span>
        ) : null}
      </div>
    )
  },
)
