import * as DialogPrimitive from '@radix-ui/react-dialog'
import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { sheet as sheetRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef, HTMLAttributes } from 'react'

export type SheetSide = (typeof sheetRecipe.variantMap.side)[number]

const styles = /* @__PURE__ */ sheetRecipe()

export const SheetRoot = DialogPrimitive.Root
export const SheetTrigger = DialogPrimitive.Trigger
export const SheetPortal = DialogPrimitive.Portal

export const SheetClose = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof DialogPrimitive.Close>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(function SheetClose({ asChild = false, className, ...props }, ref) {
  return (
    <DialogPrimitive.Close
      ref={ref}
      asChild={asChild}
      className={asChild ? className : cx(styles.close, className)}
      {...props}
    />
  )
})

export const SheetOverlay = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(function SheetOverlay({ className, ...props }, ref) {
  return <DialogPrimitive.Overlay ref={ref} className={cx(styles.overlay, className)} {...props} />
})

export type SheetContentProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  /** Edge the panel is anchored to. Defaults to `right`. */
  side?: SheetSide
}

export const SheetContent = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(function SheetContent({ children, className, side = 'right', ...props }, ref) {
  const sideStyles = sheetRecipe({ side })
  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content ref={ref} className={cx(sideStyles.content, className)} {...props}>
        {children}
      </DialogPrimitive.Content>
    </SheetPortal>
  )
})

export const SheetHeader = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function SheetHeader({ className, ...props }, ref) {
  return <div ref={ref} className={cx(styles.header, className)} {...props} />
})

export const SheetTitle = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(function SheetTitle({ className, ...props }, ref) {
  return <DialogPrimitive.Title ref={ref} className={cx(styles.title, className)} {...props} />
})

export const SheetDescription = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(function SheetDescription({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cx(styles.description, className)}
      {...props}
    />
  )
})

export const SheetFooter = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function SheetFooter({ className, ...props }, ref) {
  return <div ref={ref} className={cx(styles.footer, className)} {...props} />
})

// Compose the compound on a fresh wrapper rather than mutating the shared
// `DialogPrimitive.Root` singleton: Dialog is built on the same Radix dialog
// primitive, so `Object.assign`-ing the singleton in both would clobber each
// other's parts whenever both are imported together.
function SheetRootComponent(props: ComponentPropsWithoutRef<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props} />
}

export const Sheet = /* @__PURE__ */ Object.assign(SheetRootComponent, {
  Close: SheetClose,
  Content: SheetContent,
  Description: SheetDescription,
  Footer: SheetFooter,
  Header: SheetHeader,
  Overlay: SheetOverlay,
  Portal: SheetPortal,
  Root: SheetRoot,
  Title: SheetTitle,
  Trigger: SheetTrigger,
})
