import { Check } from 'lucide-react'
import { forwardRef, useCallback, useRef, useState } from 'react'
import { css } from 'styled-system/css'

import { Input } from './input'

import type { InputAlign, InputFieldProps, InputRootProps, InputSize } from './input'
import type { HTMLInputTypeAttribute } from 'react'
import type { ChangeEvent, FocusEvent, Ref } from 'react'

export type InputFormat = 'email' | 'url' | 'tel'

interface FormatPreset {
  autoComplete: string
  inputMode: 'email' | 'url' | 'tel'
  type: HTMLInputTypeAttribute
}

// Each format bundles the correct semantic type + on-screen keyboard hint +
// autofill token, so consumers don't have to remember the right trio.
const FORMAT_PRESETS: Record<InputFormat, FormatPreset> = {
  email: { autoComplete: 'email', inputMode: 'email', type: 'email' },
  tel: { autoComplete: 'tel', inputMode: 'tel', type: 'tel' },
  url: { autoComplete: 'url', inputMode: 'url', type: 'url' },
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

export interface FormatInputProps extends Omit<InputFieldProps, 'type' | 'size'> {
  align?: InputAlign
  /** Root className. */
  className?: string
  /** Selects the input semantics: type, inputMode, and autocomplete token. */
  format: InputFormat
  invalid?: boolean
  rootProps?: Omit<InputRootProps, 'children' | 'className' | 'disabled' | 'size'>
  /** Show a success check once the field holds a valid, non-empty value. */
  showValidity?: boolean
  size?: InputSize
  /** Accessible label announced alongside the validity check. */
  validLabel?: string
}

export const FormatInput = /* @__PURE__ */ forwardRef<HTMLInputElement, FormatInputProps>(
  function FormatInput(
    {
      align = 'start',
      className,
      disabled = false,
      format,
      invalid = false,
      onBlur,
      onChange,
      rootProps,
      showValidity = false,
      size = 'md',
      validLabel = 'Valid',
      ...fieldProps
    },
    ref,
  ) {
    const preset = FORMAT_PRESETS[format]
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [valid, setValid] = useState(false)

    const recomputeValidity = useCallback(() => {
      if (!showValidity) return
      const input = inputRef.current
      setValid(input != null && input.value.trim() !== '' && input.checkValidity())
    }, [showValidity])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event)
      recomputeValidity()
    }

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      onBlur?.(event)
      recomputeValidity()
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
        <Input.Field
          ref={mergeRefs(ref, inputRef)}
          autoComplete={fieldProps.autoComplete ?? preset.autoComplete}
          inputMode={preset.inputMode}
          spellCheck={false}
          type={preset.type}
          onBlur={handleBlur}
          onChange={handleChange}
          {...fieldProps}
        />
        {showValidity && valid ? (
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
