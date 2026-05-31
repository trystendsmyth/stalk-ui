import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { createStyleContext } from '@stalk-ui/utils'
import { ChevronDown } from 'lucide-react'
import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { accordion as accordionRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef } from 'react'

export type AccordionVariant = (typeof accordionRecipe.variantMap.variant)[number]

export type AccordionRootProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
  /** Visual treatment for the root container. `card` adds a bordered surface and inset
   *  trigger padding; `inline` is unstyled chrome for embedding in arbitrary surfaces. */
  variant?: AccordionVariant
}

const { useSlotStyles, withContext, withRootProvider } = /* @__PURE__ */ createStyleContext(
  accordionRecipe,
  { name: 'Accordion' },
)

export const AccordionRoot = /* @__PURE__ */ withRootProvider(AccordionPrimitive.Root)

export const AccordionItem = /* @__PURE__ */ withContext(AccordionPrimitive.Item, 'item')

export const AccordionHeader = /* @__PURE__ */ withContext(AccordionPrimitive.Header, 'header')

export const AccordionContent = /* @__PURE__ */ withContext(AccordionPrimitive.Content, 'content')

// Custom layout: the trigger renders inside an extra <Header> wrapper and ships
// a chevron icon. Hand-rolled rather than composed through `withContext` because
// the helper covers only the className+ref+slot passthrough case.
export const AccordionTrigger = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof AccordionPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(function AccordionTrigger({ children, className, ...props }, ref) {
  const styles = useSlotStyles()
  return (
    <AccordionPrimitive.Header className={styles.header}>
      <AccordionPrimitive.Trigger ref={ref} className={cx(styles.trigger, className)} {...props}>
        {children}
        <ChevronDown aria-hidden="true" className={styles.icon} height={16} width={16} />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})

export const Accordion = /* @__PURE__ */ Object.assign(AccordionRoot, {
  Content: AccordionContent,
  Header: AccordionHeader,
  Item: AccordionItem,
  Root: AccordionRoot,
  Trigger: AccordionTrigger,
})
