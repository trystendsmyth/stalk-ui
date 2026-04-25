import { forwardRef, useId } from 'react'
import { checkbox as checkboxRecipe } from 'styled-system/recipes'

import type { InputHTMLAttributes, ReactNode } from 'react'

export type CheckboxSize = 'sm' | 'md' | 'lg'

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> {
  description?: ReactNode
  invalid?: boolean
  label?: ReactNode
  size?: CheckboxSize
}

const joinClassNames = (...classNames: (string | undefined)[]) =>
  classNames
    .filter((className): className is string => className !== undefined && className.length > 0)
    .join(' ')

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
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
        aria-labelledby={labelId}
        aria-describedby={describedBy}
        aria-invalid={isInvalid ? true : ariaInvalid}
        className={joinClassNames(checkboxRecipe({ invalid: isInvalid, size }), className)}
        data-invalid={isInvalid ? '' : undefined}
        disabled={disabled}
        id={inputId}
        type="checkbox"
        {...props}
      />
    )

    if (label === undefined && description === undefined) {
      return input
    }

    return (
      <div className="stalk-checkbox-field">
        {input}
        <span className="stalk-checkbox-field__content">
          {label === undefined ? null : (
            <label htmlFor={inputId} id={labelId}>
              {label}
            </label>
          )}
          {description === undefined ? null : (
            <span className="stalk-checkbox-field__description" id={descriptionId}>
              {description}
            </span>
          )}
        </span>
      </div>
    )
  },
)

Checkbox.displayName = 'Checkbox'
