import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { textarea as textareaRecipe } from 'styled-system/recipes'

import type { TextareaHTMLAttributes } from 'react'

export type TextareaSize = 'sm' | 'md' | 'lg'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean
  size?: TextareaSize
}

export const Textarea = /* @__PURE__ */ forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { 'aria-invalid': ariaInvalid, className, disabled, invalid = false, size = 'md', ...props },
    ref,
  ) {
    const isInvalid = invalid || ariaInvalid === true || ariaInvalid === 'true'

    return (
      <textarea
        ref={ref}
        aria-invalid={isInvalid ? true : ariaInvalid}
        className={cx(textareaRecipe({ invalid: isInvalid, size }), className)}
        data-invalid={isInvalid ? '' : undefined}
        disabled={disabled}
        {...props}
      />
    )
  },
)
