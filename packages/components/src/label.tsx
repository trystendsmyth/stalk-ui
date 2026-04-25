import { forwardRef } from 'react'
import { label as labelRecipe } from 'styled-system/recipes'

import type { LabelHTMLAttributes } from 'react'

export type LabelSize = 'sm' | 'md' | 'lg'

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
  size?: LabelSize
}

const joinClassNames = (...classNames: (string | undefined)[]) =>
  classNames
    .filter((className): className is string => className !== undefined && className.length > 0)
    .join(' ')

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, className, required = false, size = 'md', ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={joinClassNames(labelRecipe({ required, size }), className)}
        data-required={required ? '' : undefined}
        {...props}
      >
        {children}
      </label>
    )
  },
)

Label.displayName = 'Label'
