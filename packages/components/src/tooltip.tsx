import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { forwardRef } from 'react'
import { tooltip as tooltipRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef } from 'react'

const styles = tooltipRecipe()

const joinClassNames = (...classNames: (string | undefined)[]) =>
  classNames
    .filter((className): className is string => className !== undefined && className.length > 0)
    .join(' ')

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
      className={joinClassNames(styles.content, className)}
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
