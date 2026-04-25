import { forwardRef } from 'react'
import { textarea as textareaRecipe } from 'styled-system/recipes'

import type { TextareaHTMLAttributes } from 'react'

export type TextareaSize = 'sm' | 'md' | 'lg'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean
  size?: TextareaSize
}

const joinClassNames = (...classNames: (string | undefined)[]) =>
  classNames
    .filter((className): className is string => className !== undefined && className.length > 0)
    .join(' ')

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { 'aria-invalid': ariaInvalid, className, disabled, invalid = false, size = 'md', ...props },
    ref,
  ) => {
    const isInvalid = invalid || ariaInvalid === true || ariaInvalid === 'true'

    return (
      <textarea
        ref={ref}
        aria-invalid={isInvalid ? true : ariaInvalid}
        className={joinClassNames(textareaRecipe({ invalid: isInvalid, size }), className)}
        data-invalid={isInvalid ? '' : undefined}
        disabled={disabled}
        {...props}
      />
    )
  },
)

Textarea.displayName = 'Textarea'
