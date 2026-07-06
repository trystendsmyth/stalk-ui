'use client'

import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { drawer as drawerRecipe } from 'styled-system/recipes'
import { Drawer as Vaul } from 'vaul'

import type { ComponentPropsWithoutRef, ComponentRef, HTMLAttributes } from 'react'

const styles = /* @__PURE__ */ drawerRecipe()

export const DrawerRoot = Vaul.Root
export const DrawerTrigger = Vaul.Trigger
export const DrawerPortal = Vaul.Portal
export const DrawerClose = Vaul.Close

export const DrawerOverlay = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof Vaul.Overlay>,
  ComponentPropsWithoutRef<typeof Vaul.Overlay>
>(function DrawerOverlay({ className, ...props }, ref) {
  return <Vaul.Overlay ref={ref} className={cx(styles.overlay, className)} {...props} />
})

export type DrawerContentProps = ComponentPropsWithoutRef<typeof Vaul.Content> & {
  /** Hide the drag handle (kept by default: it signals drag-to-dismiss). */
  showHandle?: boolean
}

export const DrawerContent = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof Vaul.Content>,
  DrawerContentProps
>(function DrawerContent({ children, className, showHandle = true, ...props }, ref) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <Vaul.Content ref={ref} className={cx(styles.content, className)} {...props}>
        {showHandle ? <div aria-hidden className={styles.handle} /> : null}
        {children}
      </Vaul.Content>
    </DrawerPortal>
  )
})

export const DrawerHeader = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function DrawerHeader({ className, ...props }, ref) {
  return <div ref={ref} className={cx(styles.header, className)} {...props} />
})

export const DrawerTitle = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof Vaul.Title>,
  ComponentPropsWithoutRef<typeof Vaul.Title>
>(function DrawerTitle({ className, ...props }, ref) {
  return <Vaul.Title ref={ref} className={cx(styles.title, className)} {...props} />
})

export const DrawerDescription = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof Vaul.Description>,
  ComponentPropsWithoutRef<typeof Vaul.Description>
>(function DrawerDescription({ className, ...props }, ref) {
  return <Vaul.Description ref={ref} className={cx(styles.description, className)} {...props} />
})

export const DrawerBody = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function DrawerBody({ className, ...props }, ref) {
  return <div ref={ref} className={cx(styles.body, className)} {...props} />
})

export const DrawerFooter = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function DrawerFooter({ className, ...props }, ref) {
  return <div ref={ref} className={cx(styles.footer, className)} {...props} />
})

export const Drawer = /* @__PURE__ */ Object.assign(DrawerRoot, {
  Body: DrawerBody,
  Close: DrawerClose,
  Content: DrawerContent,
  Description: DrawerDescription,
  Footer: DrawerFooter,
  Header: DrawerHeader,
  Overlay: DrawerOverlay,
  Portal: DrawerPortal,
  Root: DrawerRoot,
  Title: DrawerTitle,
  Trigger: DrawerTrigger,
})
