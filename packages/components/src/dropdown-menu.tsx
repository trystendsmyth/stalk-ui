import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Check, ChevronRight, Circle } from 'lucide-react'
import { forwardRef } from 'react'
import { css, cx } from 'styled-system/css'
import { dropdownMenu as dropdownMenuRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef, HTMLAttributes } from 'react'

const styles = /* @__PURE__ */ dropdownMenuRecipe()
const insetStyles = /* @__PURE__ */ dropdownMenuRecipe({ inset: true })

const trailingChevron = /* @__PURE__ */ css({
  marginInlineStart: 'auto',
  paddingInlineStart: '8',
})

export const DropdownMenuRoot = /* @__PURE__ */ function DropdownMenuRoot({
  modal = false,
  ...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root modal={modal} {...props} />
}
export const DropdownMenuSub = DropdownMenuPrimitive.Sub
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuGroup = DropdownMenuPrimitive.Group
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal

export interface DropdownMenuContentProps extends ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
> {
  /** Override the portal container. Defaults to `document.body`. */
  container?: HTMLElement | null
}

export const DropdownMenuContent = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(function DropdownMenuContent({ className, container, sideOffset = 4, ...props }, ref) {
  return (
    <DropdownMenuPortal container={container ?? undefined}>
      <DropdownMenuPrimitive.Content
        ref={ref}
        className={cx(styles.content, className)}
        sideOffset={sideOffset}
        {...props}
      />
    </DropdownMenuPortal>
  )
})

export interface DropdownMenuItemProps extends ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Item
> {
  /** Reserves indicator space so the item aligns with checkbox/radio items. */
  inset?: boolean
}

export const DropdownMenuItem = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(function DropdownMenuItem({ className, inset = false, ...props }, ref) {
  const slots = inset ? insetStyles : styles
  return <DropdownMenuPrimitive.Item ref={ref} className={cx(slots.item, className)} {...props} />
})

export const DropdownMenuLabel = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof DropdownMenuPrimitive.Label>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }
>(function DropdownMenuLabel({ className, inset = false, ...props }, ref) {
  const slots = inset ? insetStyles : styles
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cx(slots.label, inset && css({ paddingInlineStart: '28' }), className)}
      {...props}
    />
  )
})

export const DropdownMenuSeparator = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof DropdownMenuPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(function DropdownMenuSeparator({ className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cx(styles.separator, className)}
      {...props}
    />
  )
})

export const DropdownMenuItemIndicator = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof DropdownMenuPrimitive.ItemIndicator>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.ItemIndicator>
>(function DropdownMenuItemIndicator({ className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.ItemIndicator
      ref={ref}
      className={cx(styles.itemIndicator, className)}
      {...props}
    />
  )
})

export const DropdownMenuCheckboxItem = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(function DropdownMenuCheckboxItem({ children, className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cx(insetStyles.item, className)}
      {...props}
    >
      <DropdownMenuItemIndicator>
        <Check aria-hidden="true" height={14} width={14} />
      </DropdownMenuItemIndicator>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
})

export const DropdownMenuRadioItem = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof DropdownMenuPrimitive.RadioItem>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(function DropdownMenuRadioItem({ children, className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={cx(insetStyles.item, className)}
      {...props}
    >
      <DropdownMenuItemIndicator>
        <Circle aria-hidden="true" fill="currentColor" height={8} width={8} />
      </DropdownMenuItemIndicator>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
})

export interface DropdownMenuSubTriggerProps extends ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubTrigger
> {
  inset?: boolean
}

export const DropdownMenuSubTrigger = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
  DropdownMenuSubTriggerProps
>(function DropdownMenuSubTrigger({ children, className, inset = false, ...props }, ref) {
  const slots = inset ? insetStyles : styles
  return (
    <DropdownMenuPrimitive.SubTrigger ref={ref} className={cx(slots.item, className)} {...props}>
      {children}
      <ChevronRight aria-hidden="true" className={trailingChevron} height={14} width={14} />
    </DropdownMenuPrimitive.SubTrigger>
  )
})

export const DropdownMenuSubContent = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(function DropdownMenuSubContent({ className, sideOffset = 4, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cx(styles.subContent, className)}
      sideOffset={sideOffset}
      {...props}
    />
  )
})

export const DropdownMenuShortcut = /* @__PURE__ */ forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(function DropdownMenuShortcut({ className, ...props }, ref) {
  return <span ref={ref} className={cx(styles.shortcut, className)} {...props} />
})

export const DropdownMenu = /* @__PURE__ */ Object.assign(DropdownMenuRoot, {
  CheckboxItem: DropdownMenuCheckboxItem,
  Content: DropdownMenuContent,
  Group: DropdownMenuGroup,
  Item: DropdownMenuItem,
  ItemIndicator: DropdownMenuItemIndicator,
  Label: DropdownMenuLabel,
  Portal: DropdownMenuPortal,
  RadioGroup: DropdownMenuRadioGroup,
  RadioItem: DropdownMenuRadioItem,
  Root: DropdownMenuRoot,
  Separator: DropdownMenuSeparator,
  Shortcut: DropdownMenuShortcut,
  Sub: DropdownMenuSub,
  SubContent: DropdownMenuSubContent,
  SubTrigger: DropdownMenuSubTrigger,
  Trigger: DropdownMenuTrigger,
})
