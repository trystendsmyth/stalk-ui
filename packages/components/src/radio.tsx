import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { forwardRef, useId } from 'react'
import { cx } from 'styled-system/css'
import { radio as radioRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef, ReactNode } from 'react'

export type RadioSize = 'sm' | 'md' | 'lg'

export const RadioRoot = RadioGroupPrimitive.Root

export interface RadioProps extends Omit<
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
  'children'
> {
  description?: ReactNode
  invalid?: boolean
  label?: ReactNode
  size?: RadioSize
}

export type RadioItemProps = RadioProps

export const RadioItem = forwardRef<ComponentRef<typeof RadioGroupPrimitive.Item>, RadioItemProps>(
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
    const item = (
      <RadioGroupPrimitive.Item
        ref={ref}
        aria-describedby={describedBy}
        aria-labelledby={labelId}
        aria-invalid={isInvalid ? true : ariaInvalid}
        className={cx(radioRecipe({ invalid: isInvalid, size }), className)}
        data-invalid={isInvalid ? '' : undefined}
        disabled={disabled}
        id={inputId}
        {...props}
      >
        <RadioGroupPrimitive.Indicator aria-hidden="true" className="stalk-radio__indicator" />
      </RadioGroupPrimitive.Item>
    )

    if (label === undefined && description === undefined) {
      return item
    }

    return (
      <div className="stalk-radio-field">
        {item}
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

RadioItem.displayName = 'RadioItem'

export const Radio = Object.assign(RadioRoot, {
  Item: RadioItem,
  Root: RadioRoot,
})
