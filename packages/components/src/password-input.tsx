import { Eye, EyeOff } from 'lucide-react'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { css } from 'styled-system/css'

import { Input } from './input'

import type { InputAlign, InputFieldProps, InputRootProps, InputSize } from './input'
import type { Ref } from 'react'

const toggleButtonStyles = css({
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
  _disabled: { color: 'fg.muted', cursor: 'not-allowed', opacity: 0.6 },
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

export interface PasswordInputProps extends Omit<InputFieldProps, 'type' | 'size'> {
  align?: InputAlign
  /** Root className. */
  className?: string
  /** Start the field revealed (uncontrolled). Defaults to hidden. */
  defaultVisible?: boolean
  /** Accessible label for the reveal button while the password is hidden. */
  showPasswordLabel?: string
  /** Accessible label for the reveal button while the password is shown. */
  hidePasswordLabel?: string
  invalid?: boolean
  /** Re-hide the password when the surrounding form submits. Defaults to true. */
  resetOnSubmit?: boolean
  rootProps?: Omit<InputRootProps, 'children' | 'className' | 'disabled' | 'size'>
  size?: InputSize
}

export const PasswordInput = /* @__PURE__ */ forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    {
      align = 'start',
      className,
      defaultVisible = false,
      disabled = false,
      hidePasswordLabel = 'Hide password',
      invalid = false,
      resetOnSubmit = true,
      rootProps,
      showPasswordLabel = 'Show password',
      size = 'md',
      ...fieldProps
    },
    ref,
  ) {
    const [visible, setVisible] = useState(defaultVisible)
    const inputRef = useRef<HTMLInputElement | null>(null)

    // Security affordance: collapse back to hidden once the form is submitted.
    useEffect(() => {
      if (!resetOnSubmit) return
      const form = inputRef.current?.form
      if (!form) return
      const handleSubmit = () => {
        setVisible(false)
      }
      form.addEventListener('submit', handleSubmit)
      return () => {
        form.removeEventListener('submit', handleSubmit)
      }
    }, [resetOnSubmit])

    const toggle = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      const input = inputRef.current
      const selectionStart = input?.selectionStart ?? null
      const selectionEnd = input?.selectionEnd ?? null
      setVisible((prev) => !prev)
      // Only steal focus back to the field for pointer activation (detail > 0);
      // keyboard users (Enter/Space, detail === 0) keep focus on the toggle.
      if (event.detail === 0) return
      requestAnimationFrame(() => {
        if (!input) return
        input.focus()
        if (selectionStart !== null && selectionEnd !== null) {
          try {
            input.setSelectionRange(selectionStart, selectionEnd)
          } catch {
            // type=text always supports selection range; guard defensively.
          }
        }
      })
    }, [])

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
          autoCapitalize="off"
          autoComplete={fieldProps.autoComplete ?? 'current-password'}
          spellCheck={false}
          type={visible ? 'text' : 'password'}
          {...fieldProps}
        />
        <Input.Suffix>
          <button
            aria-label={visible ? hidePasswordLabel : showPasswordLabel}
            aria-pressed={visible}
            className={toggleButtonStyles}
            disabled={disabled}
            onClick={toggle}
            type="button"
          >
            {visible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
          </button>
        </Input.Suffix>
      </Input.Root>
    )
  },
)
