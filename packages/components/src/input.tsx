import { createContext, forwardRef, useCallback, useContext, useMemo, useRef } from 'react'
import { cx } from 'styled-system/css'
import { input as inputRecipe } from 'styled-system/recipes'

import type {
  ComponentPropsWithoutRef,
  HTMLAttributes,
  InputHTMLAttributes,
  PointerEvent,
  ReactNode,
  RefObject,
} from 'react'

export type InputSize = 'sm' | 'md' | 'lg'
export type InputAlign = 'start' | 'center' | 'end'
export type InputSlotSide = 'start' | 'end'

interface InputRootContextValue {
  align: InputAlign
  disabled: boolean
  inputRef: RefObject<HTMLInputElement | null>
  invalid: boolean
  size: InputSize
  styles: ReturnType<typeof inputRecipe>
}

const InputRootContext = createContext<InputRootContextValue | null>(null)

const useInputRootContext = (consumer: string): InputRootContextValue => {
  const context = useContext(InputRootContext)

  if (context === null) {
    throw new Error(`${consumer} must be rendered inside <Input.Root>.`)
  }

  return context
}

const composeRefs =
  <T,>(...refs: (((value: T | null) => void) | RefObject<T | null> | null | undefined)[]) =>
  (value: T | null) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref !== null && ref !== undefined) {
        ref.current = value
      }
    }
  }

const supportsSelectionRange = (input: HTMLInputElement) => {
  const type = input.type
  return (
    type === 'text' || type === 'search' || type === 'url' || type === 'tel' || type === 'password'
  )
}

export interface InputRootOwnProps {
  align?: InputAlign
  disabled?: boolean
  invalid?: boolean
  size?: InputSize
}

export interface InputRootProps
  extends InputRootOwnProps, Omit<HTMLAttributes<HTMLDivElement>, keyof InputRootOwnProps> {}

export const InputRoot = forwardRef<HTMLDivElement, InputRootProps>(
  (
    {
      'aria-invalid': ariaInvalid,
      align = 'start',
      children,
      className,
      disabled = false,
      invalid: invalidProp = false,
      onPointerDown,
      size = 'md',
      ...props
    },
    ref,
  ) => {
    const isInvalid = invalidProp || ariaInvalid === true || ariaInvalid === 'true'
    const inputRef = useRef<HTMLInputElement | null>(null)
    const styles = useMemo(
      () => inputRecipe({ align, disabled, invalid: isInvalid, size }),
      [align, disabled, isInvalid, size],
    )

    const handlePointerDown = useCallback(
      (event: PointerEvent<HTMLDivElement>) => {
        onPointerDown?.(event)

        if (event.defaultPrevented) {
          return
        }

        const target = event.target as HTMLElement | null

        if (target === null) {
          return
        }

        if (target.closest('input, textarea, select, button, a, [role="button"]') !== null) {
          return
        }

        const input = inputRef.current

        if (input === null || input.disabled) {
          return
        }

        const slot = target.closest<HTMLElement>('[data-stalk-input-slot]')
        const placeAtEnd = slot?.dataset.side !== 'start'
        const cursorPosition = placeAtEnd ? input.value.length : 0

        if (supportsSelectionRange(input)) {
          try {
            input.setSelectionRange(cursorPosition, cursorPosition)
          } catch {
            // Some input types do not support setSelectionRange; fall back to focus only.
          }
        }
        input.focus()
      },
      [onPointerDown],
    )

    const value = useMemo<InputRootContextValue>(
      () => ({
        align,
        disabled,
        inputRef,
        invalid: isInvalid,
        size,
        styles,
      }),
      [align, disabled, isInvalid, size, styles],
    )

    return (
      <InputRootContext.Provider value={value}>
        <div
          ref={ref}
          aria-invalid={isInvalid ? true : ariaInvalid}
          className={cx(styles.root, className)}
          data-disabled={disabled ? '' : undefined}
          data-invalid={isInvalid ? '' : undefined}
          onPointerDown={handlePointerDown}
          {...props}
        >
          {children}
        </div>
      </InputRootContext.Provider>
    )
  },
)

InputRoot.displayName = 'InputRoot'

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ 'aria-invalid': ariaInvalid, className, disabled, invalid, type = 'text', ...props }, ref) => {
    const {
      disabled: contextDisabled,
      inputRef,
      invalid: contextInvalid,
      styles,
    } = useInputRootContext('Input.Field')
    const isDisabled = disabled ?? contextDisabled
    const ariaInvalidIsTrue = ariaInvalid === true || ariaInvalid === 'true'
    const isInvalid = invalid ?? (ariaInvalidIsTrue || contextInvalid)

    return (
      <input
        ref={composeRefs(ref, inputRef)}
        aria-invalid={isInvalid ? true : ariaInvalid}
        className={cx(styles.input, className)}
        data-invalid={isInvalid ? '' : undefined}
        disabled={isDisabled}
        type={type}
        {...props}
      />
    )
  },
)

InputField.displayName = 'InputField'

export interface InputSlotProps extends HTMLAttributes<HTMLDivElement> {
  side?: InputSlotSide
}

export const InputSlot = forwardRef<HTMLDivElement, InputSlotProps>(
  ({ className, side = 'end', ...props }, ref) => {
    const { styles } = useInputRootContext('Input.Slot')

    return (
      <div
        ref={ref}
        className={cx(styles.slot, className)}
        data-side={side}
        data-stalk-input-slot=""
        {...props}
      />
    )
  },
)

InputSlot.displayName = 'InputSlot'

export const InputPrefix = forwardRef<HTMLDivElement, Omit<InputSlotProps, 'side'>>(
  (props, ref) => <InputSlot ref={ref} side="start" {...props} />,
)

InputPrefix.displayName = 'InputPrefix'

export const InputSuffix = forwardRef<HTMLDivElement, Omit<InputSlotProps, 'side'>>(
  (props, ref) => <InputSlot ref={ref} side="end" {...props} />,
)

InputSuffix.displayName = 'InputSuffix'

type RootOnlyProps = Pick<InputRootProps, 'align' | 'className' | 'invalid' | 'size'>

export interface InputProps
  extends
    RootOnlyProps,
    Omit<ComponentPropsWithoutRef<typeof InputField>, keyof RootOnlyProps | 'ref'> {
  endSlot?: ReactNode
  rootProps?: Omit<InputRootProps, keyof RootOnlyProps | 'children' | 'disabled'>
  startSlot?: ReactNode
}

const InputBase = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      align = 'start',
      className,
      disabled = false,
      endSlot,
      invalid = false,
      rootProps,
      size = 'md',
      startSlot,
      ...fieldProps
    },
    ref,
  ) => {
    return (
      <InputRoot
        align={align}
        className={className}
        disabled={disabled}
        invalid={invalid}
        size={size}
        {...rootProps}
      >
        {startSlot === undefined ? null : <InputSlot side="start">{startSlot}</InputSlot>}
        <InputField ref={ref} disabled={disabled} {...fieldProps} />
        {endSlot === undefined ? null : <InputSlot side="end">{endSlot}</InputSlot>}
      </InputRoot>
    )
  },
)

InputBase.displayName = 'Input'

export const Input = Object.assign(InputBase, {
  Field: InputField,
  Prefix: InputPrefix,
  Root: InputRoot,
  Slot: InputSlot,
  Suffix: InputSuffix,
})
