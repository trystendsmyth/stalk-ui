import { Check } from 'lucide-react'
import { forwardRef, useRef, useState } from 'react'
import { css } from 'styled-system/css'

import { Input } from './input'

import type { InputAlign, InputFieldProps, InputRootProps, InputSize } from './input'
import type { ChangeEvent, FocusEvent, HTMLInputTypeAttribute, Ref } from 'react'

export type InputFormat = 'email' | 'url' | 'tel'

interface FormatPreset {
  autoComplete: string
  inputMode: 'email' | 'url' | 'tel'
  /** Strip characters that can never be valid for the format as the user types. */
  restrict: (value: string) => string
  /** Tidy the value when the field is committed (blur). */
  normalize: (value: string) => string
  type: HTMLInputTypeAttribute
}

const FORMAT_PRESETS: Record<InputFormat, FormatPreset> = {
  email: {
    autoComplete: 'email',
    inputMode: 'email',
    restrict: (v) => v.replace(/\s/g, ''),
    normalize: (v) => v.trim().toLowerCase(),
    type: 'email',
  },
  tel: {
    autoComplete: 'tel',
    inputMode: 'tel',
    restrict: (v) => v.replace(/[^0-9+()\-.\s]/g, ''),
    normalize: (v) => v.trim().replace(/\s+/g, ' '),
    type: 'tel',
  },
  url: {
    autoComplete: 'url',
    inputMode: 'url',
    restrict: (v) => v.replace(/\s/g, ''),
    normalize: (v) => v.trim(),
    type: 'url',
  },
}

const validIconStyles = css({
  alignItems: 'center',
  color: 'success.solid',
  display: 'inline-flex',
  flexShrink: 0,
  '& > svg': { h: '16', w: '16' },
})

const mergeRefs =
  <T,>(...refs: (Ref<T> | undefined)[]) =>
  (value: T | null) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(value)
      else if (ref != null) (ref as { current: T | null }).current = value
    }
  }

export interface FormatInputProps extends Omit<
  InputFieldProps,
  'defaultValue' | 'type' | 'size' | 'value'
> {
  align?: InputAlign
  /** Root className. */
  className?: string
  defaultValue?: string
  /** Selects the input semantics: type, inputMode, autocomplete, and restriction. */
  format: InputFormat
  /**
   * Reformat the value on every keystroke (format-as-you-type), after the format's
   * character restriction runs. The caret is preserved by distance from the end.
   * e.g. group phone digits: `(v) => v.replace(/(\d{3})(\d)/, '($1) $2')`.
   */
  formatValue?: (value: string) => string
  invalid?: boolean
  /** Called whenever blur validation runs: true (valid), false (invalid), or null (empty). */
  onValidityChange?: (valid: boolean | null) => void
  rootProps?: Omit<InputRootProps, 'children' | 'className' | 'disabled' | 'size'>
  /** Show a success check once the field holds a valid, non-empty value. */
  showValidity?: boolean
  size?: InputSize
  /** Accessible label announced alongside the validity check. */
  validLabel?: string
  value?: string
}

export const FormatInput = /* @__PURE__ */ forwardRef<HTMLInputElement, FormatInputProps>(
  function FormatInput(
    {
      align = 'start',
      className,
      defaultValue,
      disabled = false,
      format,
      formatValue,
      invalid = false,
      onBlur,
      onChange,
      onValidityChange,
      rootProps,
      showValidity = false,
      size = 'md',
      validLabel = 'Valid',
      value,
      ...fieldProps
    },
    ref,
  ) {
    const preset = FORMAT_PRESETS[format]
    const isControlled = value !== undefined
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [internal, setInternal] = useState(defaultValue ?? '')
    const [validity, setValidity] = useState<'idle' | 'valid' | 'invalid'>('idle')
    const displayValue = isControlled ? value : internal

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const input = event.target
      const restricted = preset.restrict(input.value)
      const next = formatValue ? formatValue(restricted) : restricted
      // Preserve the caret by its distance from the end across the reformat.
      const fromEnd = input.value.length - (input.selectionStart ?? input.value.length)
      input.value = next
      const caret = Math.max(0, next.length - fromEnd)
      try {
        input.setSelectionRange(caret, caret)
      } catch {
        // Some states (e.g. number inputs) reject setSelectionRange; ignore.
      }
      if (!isControlled) setInternal(next)
      if (validity !== 'idle') setValidity('idle')
      onChange?.(event)
    }

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      const normalized = preset.normalize(event.target.value)
      const input = inputRef.current
      if (input) input.value = normalized
      if (normalized !== event.target.value) {
        event.target.value = normalized
        if (!isControlled) setInternal(normalized)
        onChange?.(event)
      } else if (!isControlled) {
        setInternal(normalized)
      }

      const next = normalized === '' ? null : (input?.checkValidity() ?? true)
      setValidity(next === null ? 'idle' : next ? 'valid' : 'invalid')
      onValidityChange?.(next)
      onBlur?.(event)
    }

    return (
      <Input.Root
        align={align}
        className={className}
        disabled={disabled}
        invalid={invalid || validity === 'invalid'}
        size={size}
        {...rootProps}
      >
        <Input.Field
          ref={mergeRefs(ref, inputRef)}
          autoComplete={fieldProps.autoComplete ?? preset.autoComplete}
          inputMode={preset.inputMode}
          spellCheck={false}
          type={preset.type}
          value={displayValue}
          onBlur={handleBlur}
          onChange={handleChange}
          {...fieldProps}
        />
        {showValidity && validity === 'valid' ? (
          <Input.Suffix>
            <span aria-label={validLabel} className={validIconStyles} role="img">
              <Check aria-hidden="true" />
            </span>
          </Input.Suffix>
        ) : null}
      </Input.Root>
    )
  },
)
