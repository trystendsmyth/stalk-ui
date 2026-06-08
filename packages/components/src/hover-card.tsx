import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { hoverCard as hoverCardRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef } from 'react'

const styles = /* @__PURE__ */ hoverCardRecipe()

export const HoverCardRoot = HoverCardPrimitive.Root
export const HoverCardTrigger = HoverCardPrimitive.Trigger
export const HoverCardPortal = HoverCardPrimitive.Portal

export const HoverCardContent = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof HoverCardPrimitive.Content>,
  ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(function HoverCardContent({ children, className, sideOffset = 4, ...props }, ref) {
  return (
    <HoverCardPortal>
      <HoverCardPrimitive.Content
        ref={ref}
        className={cx(styles.content, className)}
        sideOffset={sideOffset}
        {...props}
      >
        {children}
        <HoverCardPrimitive.Arrow className={styles.arrow} />
      </HoverCardPrimitive.Content>
    </HoverCardPortal>
  )
})

export const HoverCard = /* @__PURE__ */ Object.assign(HoverCardRoot, {
  Content: HoverCardContent,
  Portal: HoverCardPortal,
  Root: HoverCardRoot,
  Trigger: HoverCardTrigger,
})
