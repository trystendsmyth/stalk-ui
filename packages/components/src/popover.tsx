import * as PopoverPrimitive from '@radix-ui/react-popover'
import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { popover as popoverRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef } from 'react'

const styles = /* @__PURE__ */ popoverRecipe()

export const PopoverRoot = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger
export const PopoverAnchor = PopoverPrimitive.Anchor
export const PopoverPortal = PopoverPrimitive.Portal

export const PopoverClose = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof PopoverPrimitive.Close>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Close>
>(function PopoverClose({ asChild = false, className, ...props }, ref) {
  return (
    <PopoverPrimitive.Close
      ref={ref}
      asChild={asChild}
      className={asChild ? className : cx(styles.close, className)}
      {...props}
    />
  )
})
export type PopoverContentProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
  /** Cap height to the available space and scroll within (with overscroll
   *  containment) instead of overflowing — for tall panels like filter lists. */
  scrollable?: boolean
}

export const PopoverContent = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(function PopoverContent(
  { children, className, scrollable = false, sideOffset = 4, ...props },
  ref,
) {
  const variantStyles = popoverRecipe({ scrollable })
  return (
    <PopoverPortal>
      <PopoverPrimitive.Content
        ref={ref}
        className={cx(variantStyles.content, className)}
        sideOffset={sideOffset}
        {...props}
      >
        {children}
        <PopoverPrimitive.Arrow className={variantStyles.arrow} />
      </PopoverPrimitive.Content>
    </PopoverPortal>
  )
})
export const Popover = /* @__PURE__ */ Object.assign(PopoverRoot, {
  Anchor: PopoverAnchor,
  Close: PopoverClose,
  Content: PopoverContent,
  Portal: PopoverPortal,
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
})
