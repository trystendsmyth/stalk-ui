import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { createContext, forwardRef, useContext, useMemo } from 'react'
import { cx } from 'styled-system/css'
import { accordion as accordionRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef } from 'react'

export type AccordionVariant = (typeof accordionRecipe.variantMap.variant)[number]

type AccordionStyles = ReturnType<typeof accordionRecipe>

const AccordionContext = /* @__PURE__ */ createContext<AccordionStyles | null>(null)

const useAccordionStyles = () => {
  const styles = useContext(AccordionContext)
  if (!styles) {
    throw new Error('Accordion subcomponents must be rendered inside <Accordion.Root>.')
  }
  return styles
}

export type AccordionRootProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
  /** Visual treatment for the root container. `card` adds a bordered surface and inset
   *  trigger padding; `inline` is unstyled chrome for embedding in arbitrary surfaces. */
  variant?: AccordionVariant
}

export const AccordionRoot = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof AccordionPrimitive.Root>,
  AccordionRootProps
>(function AccordionRoot({ className, variant = 'inline', ...props }, ref) {
  const styles = useMemo(() => accordionRecipe({ variant }), [variant])

  return (
    <AccordionContext.Provider value={styles}>
      <AccordionPrimitive.Root ref={ref} className={cx(styles.root, className)} {...props} />
    </AccordionContext.Provider>
  )
})

export const AccordionItem = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(function AccordionItem({ className, ...props }, ref) {
  const styles = useAccordionStyles()
  return <AccordionPrimitive.Item ref={ref} className={cx(styles.item, className)} {...props} />
})

export const AccordionHeader = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof AccordionPrimitive.Header>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>
>(function AccordionHeader({ className, ...props }, ref) {
  const styles = useAccordionStyles()
  return <AccordionPrimitive.Header ref={ref} className={cx(styles.header, className)} {...props} />
})

export const AccordionTrigger = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof AccordionPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(function AccordionTrigger({ children, className, ...props }, ref) {
  const styles = useAccordionStyles()
  return (
    <AccordionPrimitive.Header className={styles.header}>
      <AccordionPrimitive.Trigger ref={ref} className={cx(styles.trigger, className)} {...props}>
        {children}
        <ChevronDown aria-hidden="true" className={styles.icon} height={16} width={16} />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})

export const AccordionContent = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof AccordionPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(function AccordionContent({ className, ...props }, ref) {
  const styles = useAccordionStyles()
  return (
    <AccordionPrimitive.Content ref={ref} className={cx(styles.content, className)} {...props} />
  )
})

export const Accordion = /* @__PURE__ */ Object.assign(AccordionRoot, {
  Content: AccordionContent,
  Header: AccordionHeader,
  Item: AccordionItem,
  Root: AccordionRoot,
  Trigger: AccordionTrigger,
})
