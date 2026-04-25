import { forwardRef } from 'react'
import { button as buttonRecipe } from 'styled-system/recipes'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'subtle'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leadingIcon?: ReactNode
  loading?: boolean
  size?: ButtonSize
  trailingIcon?: ReactNode
  variant?: ButtonVariant
}

const joinClassNames = (...classNames: (string | undefined)[]) =>
  classNames
    .filter((className): className is string => className !== undefined && className.length > 0)
    .join(' ')

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled,
      leadingIcon,
      loading = false,
      size = 'md',
      trailingIcon,
      type = 'button',
      variant = 'solid',
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled === true || loading

    return (
      <button
        ref={ref}
        className={joinClassNames(buttonRecipe({ size, variant }), className)}
        data-loading={loading ? '' : undefined}
        disabled={isDisabled}
        type={type}
        {...props}
      >
        {leadingIcon === undefined ? null : <span aria-hidden="true">{leadingIcon}</span>}
        <span>{children}</span>
        {trailingIcon === undefined ? null : <span aria-hidden="true">{trailingIcon}</span>}
      </button>
    )
  },
)

Button.displayName = 'Button'
