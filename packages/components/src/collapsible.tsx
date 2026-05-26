import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { createContext, forwardRef, useContext, useMemo } from 'react'
import { cx } from 'styled-system/css'
import { collapsible as collapsibleRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef } from 'react'

export type CollapsibleVariant = (typeof collapsibleRecipe.variantMap.variant)[number]

type CollapsibleStyles = ReturnType<typeof collapsibleRecipe>

const CollapsibleContext = /* @__PURE__ */ createContext<CollapsibleStyles | null>(null)

const useCollapsibleStyles = () => {
  const styles = useContext(CollapsibleContext)
  if (!styles) {
    throw new Error('Collapsible subcomponents must be rendered inside <Collapsible.Root>.')
  }
  return styles
}

export type CollapsibleRootProps = ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root> & {
  /** Visual treatment for the root container. `card` adds a bordered, padded surface;
   *  `inline` is unstyled chrome for embedding in arbitrary surfaces. */
  variant?: CollapsibleVariant
}

export const CollapsibleRoot = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof CollapsiblePrimitive.Root>,
  CollapsibleRootProps
>(function CollapsibleRoot({ className, variant = 'inline', ...props }, ref) {
  const styles = useMemo(() => collapsibleRecipe({ variant }), [variant])

  return (
    <CollapsibleContext.Provider value={styles}>
      <CollapsiblePrimitive.Root ref={ref} className={cx(styles.root, className)} {...props} />
    </CollapsibleContext.Provider>
  )
})

export const CollapsibleTrigger = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof CollapsiblePrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>
>(function CollapsibleTrigger({ asChild = false, className, ...props }, ref) {
  const styles = useCollapsibleStyles()
  return (
    <CollapsiblePrimitive.Trigger
      ref={ref}
      asChild={asChild}
      className={asChild ? className : cx(styles.trigger, className)}
      {...props}
    />
  )
})

export const CollapsibleContent = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof CollapsiblePrimitive.Content>,
  ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(function CollapsibleContent({ className, ...props }, ref) {
  const styles = useCollapsibleStyles()
  return (
    <CollapsiblePrimitive.Content ref={ref} className={cx(styles.content, className)} {...props} />
  )
})

export const Collapsible = /* @__PURE__ */ Object.assign(CollapsibleRoot, {
  Content: CollapsibleContent,
  Root: CollapsibleRoot,
  Trigger: CollapsibleTrigger,
})
