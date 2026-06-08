import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { ChevronDown } from 'lucide-react'
import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { navigationMenu as navigationMenuRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef, FC } from 'react'

const styles = /* @__PURE__ */ navigationMenuRecipe()

export const NavigationMenuSub: FC<ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Sub>> =
  function NavigationMenuSub(props) {
    return <NavigationMenuPrimitive.Sub {...props} />
  }

export const NavigationMenuRoot = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof NavigationMenuPrimitive.Root>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(function NavigationMenuRoot({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Root ref={ref} className={cx(styles.root, className)} {...props} />
  )
})

export const NavigationMenuList = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof NavigationMenuPrimitive.List>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(function NavigationMenuList({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.List ref={ref} className={cx(styles.list, className)} {...props} />
  )
})

export const NavigationMenuItem = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof NavigationMenuPrimitive.Item>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item>
>(function NavigationMenuItem({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Item ref={ref} className={cx(styles.item, className)} {...props} />
  )
})

export const NavigationMenuTrigger = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof NavigationMenuPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(function NavigationMenuTrigger({ children, className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Trigger ref={ref} className={cx(styles.trigger, className)} {...props}>
      {children}
      <ChevronDown aria-hidden="true" className={styles.triggerIcon} />
    </NavigationMenuPrimitive.Trigger>
  )
})

export const NavigationMenuContent = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof NavigationMenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(function NavigationMenuContent({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Content
      ref={ref}
      className={cx(styles.content, className)}
      {...props}
    />
  )
})

export const NavigationMenuLink = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof NavigationMenuPrimitive.Link>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>
>(function NavigationMenuLink({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Link ref={ref} className={cx(styles.link, className)} {...props} />
  )
})

export const NavigationMenu = /* @__PURE__ */ Object.assign(NavigationMenuRoot, {
  Content: NavigationMenuContent,
  Item: NavigationMenuItem,
  Link: NavigationMenuLink,
  List: NavigationMenuList,
  Root: NavigationMenuRoot,
  Sub: NavigationMenuSub,
  Trigger: NavigationMenuTrigger,
})
