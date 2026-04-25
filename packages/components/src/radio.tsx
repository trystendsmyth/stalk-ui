import { forwardRef, useId } from 'react'
import { radio as radioRecipe } from 'styled-system/recipes'

import type { InputHTMLAttributes, ReactNode } from 'react'

export type RadioSize = 'sm' | 'md' | 'lg'

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  description?: ReactNode
  invalid?: boolean
  label?: ReactNode
  size?: RadioSize
}

const joinClassNames = (...classNames: (string | undefined)[]) =>
  classNames
    .filter((className): className is string => className !== undefined && className.length > 0)
    .join(' ')

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
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
        className={joinClassNames(radioRecipe({ invalid: isInvalid, size }), className)}
        data-invalid={isInvalid ? '' : undefined}
        disabled={disabled}
        id={inputId}
        type="radio"
        {...props}
      />
    )

    if (label === undefined && description === undefined) {
      return input
    }

    return (
      <div className="stalk-radio-field">
        {input}
        <span className="stalk-radio-field__content">
          {label === undefined ? null : (
            <label htmlFor={inputId} id={labelId}>
              {label}
            </label>
          )}
          {description === undefined ? null : (
            <span className="stalk-radio-field__description" id={descriptionId}>
              {description}
            </span>
          )}
        </span>
      </div>
    )
  },
)

Radio.displayName = 'Radio'
