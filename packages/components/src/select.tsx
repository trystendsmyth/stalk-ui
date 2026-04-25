import { forwardRef } from 'react'
import { select as selectRecipe } from 'styled-system/recipes'

import type { SelectHTMLAttributes } from 'react'

export type SelectSize = 'sm' | 'md' | 'lg'

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  invalid?: boolean
  size?: SelectSize
}

const joinClassNames = (...classNames: (string | undefined)[]) =>
  classNames
    .filter((className): className is string => className !== undefined && className.length > 0)
    .join(' ')

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { 'aria-invalid': ariaInvalid, className, disabled, invalid = false, size = 'md', ...props },
    ref,
  ) => {
    const isInvalid = invalid || ariaInvalid === true || ariaInvalid === 'true'

    return (
      <select
        ref={ref}
        aria-invalid={isInvalid ? true : ariaInvalid}
        className={joinClassNames(selectRecipe({ invalid: isInvalid, size }), className)}
        data-invalid={isInvalid ? '' : undefined}
        disabled={disabled}
        {...props}
      />
    )
  },
)

Select.displayName = 'Select'
