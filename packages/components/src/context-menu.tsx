import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import { Check, ChevronRight, Circle } from 'lucide-react'
import { forwardRef } from 'react'
import { css, cx } from 'styled-system/css'
import { contextMenu as contextMenuRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef, HTMLAttributes } from 'react'

const styles = /* @__PURE__ */ contextMenuRecipe()
const insetStyles = /* @__PURE__ */ contextMenuRecipe({ inset: true })

const trailingChevron = /* @__PURE__ */ css({
  marginInlineStart: 'auto',
  paddingInlineStart: '8',
})

export const ContextMenuRoot = ContextMenuPrimitive.Root
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger
export const ContextMenuSub = ContextMenuPrimitive.Sub
export const ContextMenuGroup = ContextMenuPrimitive.Group
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup
export const ContextMenuPortal = ContextMenuPrimitive.Portal

export interface ContextMenuContentProps extends ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Content
> {
  /** Override the portal container. Defaults to `document.body`. */
  container?: HTMLElement | null
}

export const ContextMenuContent = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ContextMenuPrimitive.Content>,
  ContextMenuContentProps
>(function ContextMenuContent({ className, container, ...props }, ref) {
  return (
    <ContextMenuPortal container={container ?? undefined}>
      <ContextMenuPrimitive.Content
        ref={ref}
        className={cx(styles.content, className)}
        {...props}
      />
    </ContextMenuPortal>
  )
})

export interface ContextMenuItemProps extends ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Item
> {
  /** Reserves indicator space so the item aligns with checkbox/radio items. */
  inset?: boolean
}

export const ContextMenuItem = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ContextMenuPrimitive.Item>,
  ContextMenuItemProps
>(function ContextMenuItem({ className, inset = false, ...props }, ref) {
  const slots = inset ? insetStyles : styles
  return <ContextMenuPrimitive.Item ref={ref} className={cx(slots.item, className)} {...props} />
})

export const ContextMenuLabel = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ContextMenuPrimitive.Label>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & { inset?: boolean }
>(function ContextMenuLabel({ className, inset = false, ...props }, ref) {
  const slots = inset ? insetStyles : styles
  return (
    <ContextMenuPrimitive.Label
      ref={ref}
      className={cx(slots.label, inset && css({ paddingInlineStart: '28' }), className)}
      {...props}
    />
  )
})

export const ContextMenuSeparator = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ContextMenuPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(function ContextMenuSeparator({ className, ...props }, ref) {
  return (
    <ContextMenuPrimitive.Separator
      ref={ref}
      className={cx(styles.separator, className)}
      {...props}
    />
  )
})

export const ContextMenuItemIndicator = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ContextMenuPrimitive.ItemIndicator>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.ItemIndicator>
>(function ContextMenuItemIndicator({ className, ...props }, ref) {
  return (
    <ContextMenuPrimitive.ItemIndicator
      ref={ref}
      className={cx(styles.itemIndicator, className)}
      {...props}
    />
  )
})

export const ContextMenuCheckboxItem = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ContextMenuPrimitive.CheckboxItem>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(function ContextMenuCheckboxItem({ children, className, ...props }, ref) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      className={cx(insetStyles.item, className)}
      {...props}
    >
      <ContextMenuItemIndicator>
        <Check aria-hidden="true" height={14} width={14} />
      </ContextMenuItemIndicator>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
})

export const ContextMenuRadioItem = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ContextMenuPrimitive.RadioItem>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(function ContextMenuRadioItem({ children, className, ...props }, ref) {
  return (
    <ContextMenuPrimitive.RadioItem
      ref={ref}
      className={cx(insetStyles.item, className)}
      {...props}
    >
      <ContextMenuItemIndicator>
        <Circle aria-hidden="true" fill="currentColor" height={8} width={8} />
      </ContextMenuItemIndicator>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
})

export interface ContextMenuSubTriggerProps extends ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.SubTrigger
> {
  inset?: boolean
}

export const ContextMenuSubTrigger = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ContextMenuPrimitive.SubTrigger>,
  ContextMenuSubTriggerProps
>(function ContextMenuSubTrigger({ children, className, inset = false, ...props }, ref) {
  const slots = inset ? insetStyles : styles
  return (
    <ContextMenuPrimitive.SubTrigger ref={ref} className={cx(slots.item, className)} {...props}>
      {children}
      <ChevronRight aria-hidden="true" className={trailingChevron} height={14} width={14} />
    </ContextMenuPrimitive.SubTrigger>
  )
})

export const ContextMenuSubContent = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ContextMenuPrimitive.SubContent>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(function ContextMenuSubContent({ className, ...props }, ref) {
  return (
    <ContextMenuPrimitive.SubContent
      ref={ref}
      className={cx(styles.subContent, className)}
      {...props}
    />
  )
})

export const ContextMenuShortcut = /* @__PURE__ */ forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(function ContextMenuShortcut({ className, ...props }, ref) {
  return <span ref={ref} className={cx(styles.shortcut, className)} {...props} />
})

export const ContextMenu = /* @__PURE__ */ Object.assign(ContextMenuRoot, {
  CheckboxItem: ContextMenuCheckboxItem,
  Content: ContextMenuContent,
  Group: ContextMenuGroup,
  Item: ContextMenuItem,
  ItemIndicator: ContextMenuItemIndicator,
  Label: ContextMenuLabel,
  Portal: ContextMenuPortal,
  RadioGroup: ContextMenuRadioGroup,
  RadioItem: ContextMenuRadioItem,
  Root: ContextMenuRoot,
  Separator: ContextMenuSeparator,
  Shortcut: ContextMenuShortcut,
  Sub: ContextMenuSub,
  SubContent: ContextMenuSubContent,
  SubTrigger: ContextMenuSubTrigger,
  Trigger: ContextMenuTrigger,
})
