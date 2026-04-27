import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { input as inputRecipe } from 'styled-system/recipes'

import type { InputHTMLAttributes } from 'react'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  invalid?: boolean
  size?: InputSize
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { 'aria-invalid': ariaInvalid, className, disabled, invalid = false, size = 'md', ...props },
    ref,
  ) => {
    const isInvalid = invalid || ariaInvalid === true || ariaInvalid === 'true'

    return (
      <input
        ref={ref}
        aria-invalid={isInvalid ? true : ariaInvalid}
        className={cx(inputRecipe({ invalid: isInvalid, size }), className)}
        data-invalid={isInvalid ? '' : undefined}
        disabled={disabled}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'
