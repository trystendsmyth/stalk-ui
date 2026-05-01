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
>(function PopoverClose({ className, ...props }, ref) {
  return <PopoverPrimitive.Close ref={ref} className={cx(styles.close, className)} {...props} />
})
export const PopoverContent = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof PopoverPrimitive.Content>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(function PopoverContent({ children, className, sideOffset = 4, ...props }, ref) {
  return (
    <PopoverPortal>
      <PopoverPrimitive.Content
        ref={ref}
        className={cx(styles.content, className)}
        sideOffset={sideOffset}
        {...props}
      >
        {children}
        <PopoverPrimitive.Arrow className={styles.arrow} />
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
