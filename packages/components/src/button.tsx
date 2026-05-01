import { Slot } from '@radix-ui/react-slot'
import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { button as buttonRecipe } from 'styled-system/recipes'

import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react'

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'subtle'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  leadingIcon?: ReactNode
  loading?: boolean
  size?: ButtonSize
  trailingIcon?: ReactNode
  variant?: ButtonVariant
}

export const Button = /* @__PURE__ */ forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    asChild = false,
    children,
    className,
    disabled,
    leadingIcon,
    loading = false,
    onClick,
    size = 'md',
    trailingIcon,
    type = 'button',
    variant = 'solid',
    ...props
  },
  ref,
) {
  const isDisabled = disabled === true || loading
  const Component = asChild ? Slot : 'button'

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    onClick?.(event)
  }

  return (
    <Component
      ref={ref}
      aria-disabled={asChild && isDisabled ? true : undefined}
      className={cx(buttonRecipe({ size, variant }), className)}
      data-loading={loading ? '' : undefined}
      disabled={asChild ? undefined : isDisabled}
      onClick={handleClick}
      type={asChild ? undefined : type}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {leadingIcon === undefined ? null : <span aria-hidden="true">{leadingIcon}</span>}
          <span>{children}</span>
          {trailingIcon === undefined ? null : <span aria-hidden="true">{trailingIcon}</span>}
        </>
      )}
    </Component>
  )
})
