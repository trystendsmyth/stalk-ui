import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { tooltip as tooltipRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef } from 'react'

const styles = tooltipRecipe()

export const TooltipProvider = TooltipPrimitive.Provider
export const TooltipRoot = TooltipPrimitive.Root
export const TooltipTrigger = TooltipPrimitive.Trigger
export const TooltipPortal = TooltipPrimitive.Portal

export const TooltipContent = forwardRef<
  ComponentRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ children, className, sideOffset = 4, ...props }, ref) => (
  <TooltipPortal>
    <TooltipPrimitive.Content
      ref={ref}
      className={cx(styles.content, className)}
      sideOffset={sideOffset}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className={styles.arrow} />
    </TooltipPrimitive.Content>
  </TooltipPortal>
))

TooltipContent.displayName = 'TooltipContent'

export const Tooltip = Object.assign(TooltipRoot, {
  Content: TooltipContent,
  Portal: TooltipPortal,
  Provider: TooltipProvider,
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
})
