import * as SwitchPrimitive from '@radix-ui/react-switch'
import { forwardRef, useId } from 'react'
import { cx } from 'styled-system/css'
import { switchRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef, ReactNode } from 'react'

export type SwitchSize = 'sm' | 'md' | 'lg'

export interface SwitchProps extends Omit<
  ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
  'children'
> {
  description?: ReactNode
  invalid?: boolean
  label?: ReactNode
  size?: SwitchSize
}

export const Switch = forwardRef<ComponentRef<typeof SwitchPrimitive.Root>, SwitchProps>(
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
    const switchControl = (
      <SwitchPrimitive.Root
        ref={ref}
        aria-describedby={describedBy}
        aria-labelledby={labelId}
        aria-invalid={isInvalid ? true : ariaInvalid}
        className={cx(switchRecipe({ invalid: isInvalid, size }), className)}
        data-invalid={isInvalid ? '' : undefined}
        disabled={disabled}
        id={inputId}
        {...props}
      >
        <SwitchPrimitive.Thumb aria-hidden="true" className="stalk-switch__thumb" />
      </SwitchPrimitive.Root>
    )

    if (label === undefined && description === undefined) {
      return switchControl
    }

    return (
      <div className="stalk-switch-field">
        {switchControl}
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
