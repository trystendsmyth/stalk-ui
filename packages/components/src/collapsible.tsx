import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { createStyleContext } from '@stalk-ui/utils'
import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { collapsible as collapsibleRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef } from 'react'

export type CollapsibleVariant = (typeof collapsibleRecipe.variantMap.variant)[number]

export type CollapsibleRootProps = ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root> & {
  /** Visual treatment for the root container. `card` adds a bordered, padded surface;
   *  `inline` is unstyled chrome for embedding in arbitrary surfaces. */
  variant?: CollapsibleVariant
}

const { useSlotStyles, withContext, withRootProvider } = /* @__PURE__ */ createStyleContext(
  collapsibleRecipe,
  { name: 'Collapsible' },
)

export const CollapsibleRoot = /* @__PURE__ */ withRootProvider(CollapsiblePrimitive.Root)

export const CollapsibleContent = /* @__PURE__ */ withContext(
  CollapsiblePrimitive.Content,
  'content',
)

// Hand-rolled because `asChild` merges the trigger into a child (e.g. a Button)
// that owns its own styling — applying the slot class then would double-style it.
export const CollapsibleTrigger = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof CollapsiblePrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>
>(function CollapsibleTrigger({ asChild = false, className, ...props }, ref) {
  const styles = useSlotStyles()
  return (
    <CollapsiblePrimitive.Trigger
      ref={ref}
      asChild={asChild}
      className={asChild ? className : cx(styles.trigger, className)}
      {...props}
    />
  )
})

export const Collapsible = /* @__PURE__ */ Object.assign(CollapsibleRoot, {
  Content: CollapsibleContent,
  Root: CollapsibleRoot,
  Trigger: CollapsibleTrigger,
})
