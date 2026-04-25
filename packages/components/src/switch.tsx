import { forwardRef, useId } from 'react'
import { switchRecipe } from 'styled-system/recipes'

import type { InputHTMLAttributes, ReactNode } from 'react'

export type SwitchSize = 'sm' | 'md' | 'lg'

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  description?: ReactNode
  invalid?: boolean
  label?: ReactNode
  size?: SwitchSize
}

const joinClassNames = (...classNames: (string | undefined)[]) =>
  classNames
    .filter((className): className is string => className !== undefined && className.length > 0)
    .join(' ')

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      className,
      description,
      disabled,
      invalid = false,
      label,
      size = 'md',
      ...props
    },
    ref,
  ) => {
    const isInvalid = invalid || ariaInvalid === true || ariaInvalid === 'true'
    const generatedId = useId()
    const inputId = props.id ?? generatedId
    const labelId = label === undefined ? undefined : `${inputId}-label`
    const descriptionId = description === undefined ? undefined : `${inputId}-description`
    const describedBy = [ariaDescribedBy, descriptionId].filter(Boolean).join(' ') || undefined
    const input = (
      <input
        ref={ref}
        aria-describedby={describedBy}
        aria-labelledby={labelId}
        className={joinClassNames(switchRecipe({ invalid: isInvalid, size }), className)}
        data-invalid={isInvalid ? '' : undefined}
        disabled={disabled}
        id={inputId}
        role="switch"
        type="checkbox"
        {...props}
      />
    )

    if (label === undefined && description === undefined) {
      return input
    }

    return (
      <div className="stalk-switch-field">
        {input}
        <span className="stalk-switch-field__content">
          {label === undefined ? null : (
            <label htmlFor={inputId} id={labelId}>
              {label}
            </label>
          )}
          {description === undefined ? null : (
            <span className="stalk-switch-field__description" id={descriptionId}>
              {description}
            </span>
          )}
        </span>
      </div>
    )
  },
)

Switch.displayName = 'Switch'
