import { forwardRef } from 'react'
import { input as inputRecipe } from 'styled-system/recipes'

import type { InputHTMLAttributes } from 'react'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  invalid?: boolean
  size?: InputSize
}

const joinClassNames = (...classNames: (string | undefined)[]) =>
  classNames
    .filter((className): className is string => className !== undefined && className.length > 0)
    .join(' ')

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
        className={joinClassNames(inputRecipe({ invalid: isInvalid, size }), className)}
        data-invalid={isInvalid ? '' : undefined}
        disabled={disabled}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'
