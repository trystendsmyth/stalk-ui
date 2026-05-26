import * as MenubarPrimitive from '@radix-ui/react-menubar'
import { Check, ChevronRight, Circle } from 'lucide-react'
import { forwardRef } from 'react'
import { css, cx } from 'styled-system/css'
import { menubar as menubarRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef, FC, HTMLAttributes } from 'react'

const styles = /* @__PURE__ */ menubarRecipe()
const insetStyles = /* @__PURE__ */ menubarRecipe({ inset: true })

const trailingChevron = /* @__PURE__ */ css({
  marginInlineStart: 'auto',
  paddingInlineStart: '8',
})

export const MenubarMenu: FC<ComponentPropsWithoutRef<typeof MenubarPrimitive.Menu>> =
  function MenubarMenu(props) {
    return <MenubarPrimitive.Menu {...props} />
  }
export const MenubarSub: FC<ComponentPropsWithoutRef<typeof MenubarPrimitive.Sub>> =
  function MenubarSub(props) {
    return <MenubarPrimitive.Sub {...props} />
  }
export const MenubarGroup: FC<ComponentPropsWithoutRef<typeof MenubarPrimitive.Group>> =
  function MenubarGroup(props) {
    return <MenubarPrimitive.Group {...props} />
  }
export const MenubarRadioGroup: FC<ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioGroup>> =
  function MenubarRadioGroup(props) {
    return <MenubarPrimitive.RadioGroup {...props} />
  }
export const MenubarPortal: FC<ComponentPropsWithoutRef<typeof MenubarPrimitive.Portal>> =
  function MenubarPortal(props) {
    return <MenubarPrimitive.Portal {...props} />
  }

export const MenubarRoot = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof MenubarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(function MenubarRoot({ className, ...props }, ref) {
  return <MenubarPrimitive.Root ref={ref} className={cx(styles.root, className)} {...props} />
})

export const MenubarTrigger = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof MenubarPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(function MenubarTrigger({ className, ...props }, ref) {
  return <MenubarPrimitive.Trigger ref={ref} className={cx(styles.trigger, className)} {...props} />
})

export interface MenubarContentProps extends ComponentPropsWithoutRef<
  typeof MenubarPrimitive.Content
> {
  /** Override the portal container. Defaults to `document.body`. */
  container?: HTMLElement | null
}

export const MenubarContent = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof MenubarPrimitive.Content>,
  MenubarContentProps
>(function MenubarContent(
  { align = 'start', alignOffset = -4, className, container, sideOffset = 8, ...props },
  ref,
) {
  return (
    <MenubarPortal container={container ?? undefined}>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        className={cx(styles.content, className)}
        sideOffset={sideOffset}
        {...props}
      />
    </MenubarPortal>
  )
})

export interface MenubarItemProps extends ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> {
  /** Reserves indicator space so the item aligns with checkbox/radio items. */
  inset?: boolean
}

export const MenubarItem = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof MenubarPrimitive.Item>,
  MenubarItemProps
>(function MenubarItem({ className, inset = false, ...props }, ref) {
  const slots = inset ? insetStyles : styles
  return <MenubarPrimitive.Item ref={ref} className={cx(slots.item, className)} {...props} />
})

export const MenubarLabel = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof MenubarPrimitive.Label>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & { inset?: boolean }
>(function MenubarLabel({ className, inset = false, ...props }, ref) {
  const slots = inset ? insetStyles : styles
  return (
    <MenubarPrimitive.Label
      ref={ref}
      className={cx(slots.label, inset && css({ paddingInlineStart: '28' }), className)}
      {...props}
    />
  )
})

export const MenubarSeparator = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof MenubarPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(function MenubarSeparator({ className, ...props }, ref) {
  return (
    <MenubarPrimitive.Separator ref={ref} className={cx(styles.separator, className)} {...props} />
  )
})

export const MenubarItemIndicator = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof MenubarPrimitive.ItemIndicator>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.ItemIndicator>
>(function MenubarItemIndicator({ className, ...props }, ref) {
  return (
    <MenubarPrimitive.ItemIndicator
      ref={ref}
      className={cx(styles.itemIndicator, className)}
      {...props}
    />
  )
})

export const MenubarCheckboxItem = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof MenubarPrimitive.CheckboxItem>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(function MenubarCheckboxItem({ children, className, ...props }, ref) {
  return (
    <MenubarPrimitive.CheckboxItem ref={ref} className={cx(insetStyles.item, className)} {...props}>
      <MenubarItemIndicator>
        <Check aria-hidden="true" height={14} width={14} />
      </MenubarItemIndicator>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
})

export const MenubarRadioItem = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof MenubarPrimitive.RadioItem>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(function MenubarRadioItem({ children, className, ...props }, ref) {
  return (
    <MenubarPrimitive.RadioItem ref={ref} className={cx(insetStyles.item, className)} {...props}>
      <MenubarItemIndicator>
        <Circle aria-hidden="true" fill="currentColor" height={8} width={8} />
      </MenubarItemIndicator>
      {children}
    </MenubarPrimitive.RadioItem>
  )
})

export interface MenubarSubTriggerProps extends ComponentPropsWithoutRef<
  typeof MenubarPrimitive.SubTrigger
> {
  inset?: boolean
}

export const MenubarSubTrigger = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof MenubarPrimitive.SubTrigger>,
  MenubarSubTriggerProps
>(function MenubarSubTrigger({ children, className, inset = false, ...props }, ref) {
  const slots = inset ? insetStyles : styles
  return (
    <MenubarPrimitive.SubTrigger ref={ref} className={cx(slots.item, className)} {...props}>
      {children}
      <ChevronRight aria-hidden="true" className={trailingChevron} height={14} width={14} />
    </MenubarPrimitive.SubTrigger>
  )
})

export const MenubarSubContent = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof MenubarPrimitive.SubContent>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(function MenubarSubContent({ className, ...props }, ref) {
  return (
    <MenubarPrimitive.SubContent
      ref={ref}
      className={cx(styles.subContent, className)}
      {...props}
    />
  )
})

export const MenubarShortcut = /* @__PURE__ */ forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(function MenubarShortcut({ className, ...props }, ref) {
  return <span ref={ref} className={cx(styles.shortcut, className)} {...props} />
})

type MenubarNamespace = typeof MenubarRoot & {
  CheckboxItem: typeof MenubarCheckboxItem
  Content: typeof MenubarContent
  Group: typeof MenubarGroup
  Item: typeof MenubarItem
  ItemIndicator: typeof MenubarItemIndicator
  Label: typeof MenubarLabel
  Menu: typeof MenubarMenu
  Portal: typeof MenubarPortal
  RadioGroup: typeof MenubarRadioGroup
  RadioItem: typeof MenubarRadioItem
  Root: typeof MenubarRoot
  Separator: typeof MenubarSeparator
  Shortcut: typeof MenubarShortcut
  Sub: typeof MenubarSub
  SubContent: typeof MenubarSubContent
  SubTrigger: typeof MenubarSubTrigger
  Trigger: typeof MenubarTrigger
}

export const Menubar: MenubarNamespace = /* @__PURE__ */ Object.assign(MenubarRoot, {
  CheckboxItem: MenubarCheckboxItem,
  Content: MenubarContent,
  Group: MenubarGroup,
  Item: MenubarItem,
  ItemIndicator: MenubarItemIndicator,
  Label: MenubarLabel,
  Menu: MenubarMenu,
  Portal: MenubarPortal,
  RadioGroup: MenubarRadioGroup,
  RadioItem: MenubarRadioItem,
  Root: MenubarRoot,
  Separator: MenubarSeparator,
  Shortcut: MenubarShortcut,
  Sub: MenubarSub,
  SubContent: MenubarSubContent,
  SubTrigger: MenubarSubTrigger,
  Trigger: MenubarTrigger,
})
