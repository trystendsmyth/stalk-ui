import { Slot } from '@radix-ui/react-slot'
import { Children, forwardRef } from 'react'
import { css, cx } from 'styled-system/css'
import { VisuallyHidden } from 'styled-system/jsx'
import { button as buttonRecipe } from 'styled-system/recipes'

import { Spinner, type SpinnerSize } from './spinner'

import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react'

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'subtle'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  loading?: boolean
  /**
   * Accessible label announced while `loading`. Defaults to `"Loading"`. Pass a
   * localized string when the surrounding app supplies translations.
   */
  loadingLabel?: string
  size?: ButtonSize
  variant?: ButtonVariant
}

const SPINNER_SIZE_BY_BUTTON: Record<ButtonSize, SpinnerSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
}

// Wrap raw text/number children in a span so they become element siblings.
// Without this, `<Button><Icon/>Save</Button>` lets the recipe's
// `:has(> svg:only-child)` selector incorrectly match the icon (text nodes are
// invisible to `:only-child`) and square the button.
const wrapTextChildren = (children: ReactNode): ReactNode =>
  Children.map(children, (child) =>
    typeof child === 'string' || typeof child === 'number' ? <span>{child}</span> : child,
  )

export const Button = /* @__PURE__ */ forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    asChild = false,
    children,
    className,
    disabled,
    loading = false,
    loadingLabel = 'Loading',
    onClick,
    size = 'md',
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

  // `Slot` takes a single child element to clone, so we can't wrap the
  // spinner overlay around a slotted child. When `asChild` is true we pass
  // children through unchanged and lean on `aria-busy` + `data-loading` for
  // state; the consumer's element keeps its native rendering.
  const wrappedChildren = asChild ? children : wrapTextChildren(children)

  const content =
    loading && !asChild ? (
      <>
        <span
          aria-hidden="true"
          className={css({
            display: 'contents',
            visibility: 'hidden',
          })}
        >
          {wrappedChildren}
        </span>
        <VisuallyHidden>{loadingLabel}</VisuallyHidden>
        <span
          aria-hidden="true"
          className={css({
            alignItems: 'center',
            display: 'inline-flex',
            inset: '0',
            justifyContent: 'center',
            pointerEvents: 'none',
            pos: 'absolute',
          })}
        >
          <Spinner size={SPINNER_SIZE_BY_BUTTON[size]} />
        </span>
      </>
    ) : (
      wrappedChildren
    )

  return (
    <Component
      ref={ref}
      aria-busy={loading || undefined}
      aria-disabled={asChild && isDisabled ? true : undefined}
      className={cx(buttonRecipe({ size, variant }), className)}
      data-loading={loading ? '' : undefined}
      disabled={asChild ? undefined : isDisabled}
      onClick={handleClick}
      type={asChild ? undefined : type}
      {...props}
    >
      {content}
    </Component>
  )
})
