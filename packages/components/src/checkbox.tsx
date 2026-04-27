import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { forwardRef, useId } from 'react'
import { cx } from 'styled-system/css'
import { checkbox as checkboxRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef, ReactNode } from 'react'

export type CheckboxSize = 'sm' | 'md' | 'lg'

export interface CheckboxProps extends Omit<
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  'children'
> {
  description?: ReactNode
  invalid?: boolean
  label?: ReactNode
  size?: CheckboxSize
}

export const Checkbox = forwardRef<ComponentRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
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
    const checkbox = (
      <CheckboxPrimitive.Root
        ref={ref}
        aria-labelledby={labelId}
        aria-describedby={describedBy}
        aria-invalid={isInvalid ? true : ariaInvalid}
        className={cx(checkboxRecipe({ invalid: isInvalid, size }), className)}
        data-invalid={isInvalid ? '' : undefined}
        disabled={disabled}
        id={inputId}
        {...props}
      >
        <CheckboxPrimitive.Indicator aria-hidden="true">✓</CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    )

    if (label === undefined && description === undefined) {
      return checkbox
    }

    return (
      <div className="stalk-checkbox-field">
        {checkbox}
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
