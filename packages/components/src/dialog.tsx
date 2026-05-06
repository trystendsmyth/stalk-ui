import * as DialogPrimitive from '@radix-ui/react-dialog'
import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { dialog as dialogRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef, HTMLAttributes } from 'react'

const styles = /* @__PURE__ */ dialogRecipe()

export const DialogRoot = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogPortal = DialogPrimitive.Portal

export const DialogClose = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof DialogPrimitive.Close>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(function DialogClose({ asChild = false, className, ...props }, ref) {
  return (
    <DialogPrimitive.Close
      ref={ref}
      asChild={asChild}
      className={asChild ? className : cx(styles.close, className)}
      {...props}
    />
  )
})

export const DialogOverlay = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(function DialogOverlay({ className, ...props }, ref) {
  return <DialogPrimitive.Overlay ref={ref} className={cx(styles.overlay, className)} {...props} />
})

export const DialogContent = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(function DialogContent({ children, className, ...props }, ref) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content ref={ref} className={cx(styles.content, className)} {...props}>
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
})

export const DialogHeader = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function DialogHeader({ className, ...props }, ref) {
  return <div ref={ref} className={cx(styles.header, className)} {...props} />
})

export const DialogTitle = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(function DialogTitle({ className, ...props }, ref) {
  return <DialogPrimitive.Title ref={ref} className={cx(styles.title, className)} {...props} />
})

export const DialogDescription = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(function DialogDescription({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cx(styles.description, className)}
      {...props}
    />
  )
})

export const DialogFooter = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function DialogFooter({ className, ...props }, ref) {
  return <div ref={ref} className={cx(styles.footer, className)} {...props} />
})

export const Dialog = /* @__PURE__ */ Object.assign(DialogRoot, {
  Close: DialogClose,
  Content: DialogContent,
  Description: DialogDescription,
  Footer: DialogFooter,
  Header: DialogHeader,
  Overlay: DialogOverlay,
  Portal: DialogPortal,
  Root: DialogRoot,
  Title: DialogTitle,
  Trigger: DialogTrigger,
})
