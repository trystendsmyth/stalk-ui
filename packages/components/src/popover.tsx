import * as PopoverPrimitive from '@radix-ui/react-popover'
import { forwardRef } from 'react'
import { popover as popoverRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef } from 'react'

const styles = popoverRecipe()

const joinClassNames = (...classNames: (string | undefined)[]) =>
  classNames
    .filter((className): className is string => className !== undefined && className.length > 0)
    .join(' ')

export const PopoverRoot = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger
export const PopoverAnchor = PopoverPrimitive.Anchor
export const PopoverPortal = PopoverPrimitive.Portal

export const PopoverClose = forwardRef<
  ComponentRef<typeof PopoverPrimitive.Close>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Close>
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Close
    ref={ref}
    className={joinClassNames(styles.close, className)}
    {...props}
  />
))

PopoverClose.displayName = 'PopoverClose'

export const PopoverContent = forwardRef<
  ComponentRef<typeof PopoverPrimitive.Content>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ children, className, sideOffset = 4, ...props }, ref) => (
  <PopoverPortal>
    <PopoverPrimitive.Content
      ref={ref}
      className={joinClassNames(styles.content, className)}
      sideOffset={sideOffset}
      {...props}
    >
      {children}
      <PopoverPrimitive.Arrow className={styles.arrow} />
    </PopoverPrimitive.Content>
  </PopoverPortal>
))

PopoverContent.displayName = 'PopoverContent'

export const Popover = Object.assign(PopoverRoot, {
  Anchor: PopoverAnchor,
  Close: PopoverClose,
  Content: PopoverContent,
  Portal: PopoverPortal,
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
})
