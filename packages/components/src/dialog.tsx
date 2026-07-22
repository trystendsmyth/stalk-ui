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

export interface DialogContentProps extends ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> {
  /**
   * Render the dimming overlay behind the content. Default `true`. Set `false`
   * for a non-modal dialog (`<Dialog modal={false}>`) so the page behind stays
   * interactive and click-through — Radix's `modal` prop is forwarded by
   * `Dialog.Root`, this just drops the blocking overlay to match.
   */
  overlay?: boolean
  /**
   * Where long content scrolls. `outside` (default) scrolls the whole content
   * panel; `inside` pins the header and footer and hands the scroll to
   * `Dialog.Body`.
   */
  scrollBehavior?: 'outside' | 'inside'
}

export const DialogContent = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(function DialogContent(
  { children, className, overlay = true, scrollBehavior = 'outside', ...props },
  ref,
) {
  const contentClass =
    scrollBehavior === 'outside' ? styles.content : dialogRecipe({ scrollBehavior }).content
  return (
    <DialogPortal>
      {overlay ? <DialogOverlay /> : null}
      <DialogPrimitive.Content ref={ref} className={cx(contentClass, className)} {...props}>
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
})

export const DialogBody = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function DialogBody({ className, ...props }, ref) {
  return <div ref={ref} className={cx(styles.body, className)} {...props} />
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

// Compose the compound on a fresh wrapper rather than mutating the shared
// `DialogPrimitive.Root` singleton: Sheet is built on the same Radix dialog
// primitive, so `Object.assign`-ing the singleton in both would clobber each
// other's parts whenever both are imported together.
function DialogRootComponent(props: ComponentPropsWithoutRef<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props} />
}

export const Dialog = /* @__PURE__ */ Object.assign(DialogRootComponent, {
  Body: DialogBody,
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
