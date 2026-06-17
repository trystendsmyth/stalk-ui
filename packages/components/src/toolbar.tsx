import * as ToolbarPrimitive from '@radix-ui/react-toolbar'
import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { toolbar as toolbarRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef } from 'react'

const styles = /* @__PURE__ */ toolbarRecipe()

export const ToolbarRoot = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ToolbarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root>
>(function ToolbarRoot({ className, ...props }, ref) {
  return <ToolbarPrimitive.Root ref={ref} className={cx(styles.root, className)} {...props} />
})

export const ToolbarButton = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ToolbarPrimitive.Button>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button>
>(function ToolbarButton({ className, ...props }, ref) {
  return <ToolbarPrimitive.Button ref={ref} className={cx(styles.button, className)} {...props} />
})

export const ToolbarLink = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ToolbarPrimitive.Link>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Link>
>(function ToolbarLink({ className, ...props }, ref) {
  return <ToolbarPrimitive.Link ref={ref} className={cx(styles.link, className)} {...props} />
})

export const ToolbarSeparator = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ToolbarPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>
>(function ToolbarSeparator({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.Separator ref={ref} className={cx(styles.separator, className)} {...props} />
  )
})

export const ToolbarToggleGroup = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ToolbarPrimitive.ToggleGroup>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleGroup>
>(function ToolbarToggleGroup({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.ToggleGroup
      ref={ref}
      className={cx(styles.toggleGroup, className)}
      {...props}
    />
  )
})

export const ToolbarToggleItem = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ToolbarPrimitive.ToggleItem>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleItem>
>(function ToolbarToggleItem({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.ToggleItem
      ref={ref}
      className={cx(styles.toggleItem, className)}
      {...props}
    />
  )
})

type ToolbarNamespace = typeof ToolbarRoot & {
  Button: typeof ToolbarButton
  Link: typeof ToolbarLink
  Root: typeof ToolbarRoot
  Separator: typeof ToolbarSeparator
  ToggleGroup: typeof ToolbarToggleGroup
  ToggleItem: typeof ToolbarToggleItem
}

export const Toolbar: ToolbarNamespace = /* @__PURE__ */ Object.assign(ToolbarRoot, {
  Button: ToolbarButton,
  Link: ToolbarLink,
  Root: ToolbarRoot,
  Separator: ToolbarSeparator,
  ToggleGroup: ToolbarToggleGroup,
  ToggleItem: ToolbarToggleItem,
})
