import * as DialogPrimitive from '@radix-ui/react-dialog'
import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { dialog as dialogRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef, HTMLAttributes } from 'react'

const styles = dialogRecipe()

export const DialogRoot = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogPortal = DialogPrimitive.Portal

export const DialogClose = forwardRef<
  ComponentRef<typeof DialogPrimitive.Close>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Close ref={ref} className={cx(styles.close, className)} {...props} />
))

DialogClose.displayName = 'DialogClose'

export const DialogOverlay = forwardRef<
  ComponentRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref} className={cx(styles.overlay, className)} {...props} />
))

DialogOverlay.displayName = 'DialogOverlay'

export const DialogContent = forwardRef<
  ComponentRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ children, className, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content ref={ref} className={cx(styles.content, className)} {...props}>
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
))

DialogContent.displayName = 'DialogContent'

export const DialogHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cx(styles.header, className)} {...props} />
  ),
)

DialogHeader.displayName = 'DialogHeader'

export const DialogTitle = forwardRef<
  ComponentRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cx(styles.title, className)} {...props} />
))

DialogTitle.displayName = 'DialogTitle'

export const DialogDescription = forwardRef<
  ComponentRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cx(styles.description, className)} {...props} />
))

DialogDescription.displayName = 'DialogDescription'

export const DialogFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cx(styles.footer, className)} {...props} />
  ),
)

DialogFooter.displayName = 'DialogFooter'

export const Dialog = Object.assign(DialogRoot, {
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
