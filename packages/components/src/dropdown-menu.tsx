import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { forwardRef } from 'react'
import { dropdownMenu as dropdownMenuRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef, HTMLAttributes } from 'react'

const styles = dropdownMenuRecipe()

const joinClassNames = (...classNames: (string | undefined)[]) =>
  classNames
    .filter((className): className is string => className !== undefined && className.length > 0)
    .join(' ')

export const DropdownMenuRoot = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuGroup = DropdownMenuPrimitive.Group
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal

export const DropdownMenuContent = forwardRef<
  ComponentRef<typeof DropdownMenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPortal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      className={joinClassNames(styles.content, className)}
      sideOffset={sideOffset}
      {...props}
    />
  </DropdownMenuPortal>
))

DropdownMenuContent.displayName = 'DropdownMenuContent'

export const DropdownMenuItem = forwardRef<
  ComponentRef<typeof DropdownMenuPrimitive.Item>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={joinClassNames(styles.item, className)}
    {...props}
  />
))

DropdownMenuItem.displayName = 'DropdownMenuItem'

export const DropdownMenuLabel = forwardRef<
  ComponentRef<typeof DropdownMenuPrimitive.Label>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={joinClassNames(styles.label, className)}
    {...props}
  />
))

DropdownMenuLabel.displayName = 'DropdownMenuLabel'

export const DropdownMenuSeparator = forwardRef<
  ComponentRef<typeof DropdownMenuPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={joinClassNames(styles.separator, className)}
    {...props}
  />
))

DropdownMenuSeparator.displayName = 'DropdownMenuSeparator'

export const DropdownMenuShortcut = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={joinClassNames(styles.shortcut, className)} {...props} />
  ),
)

DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

export const DropdownMenu = Object.assign(DropdownMenuRoot, {
  Content: DropdownMenuContent,
  Group: DropdownMenuGroup,
  Item: DropdownMenuItem,
  Label: DropdownMenuLabel,
  Portal: DropdownMenuPortal,
  Root: DropdownMenuRoot,
  Separator: DropdownMenuSeparator,
  Shortcut: DropdownMenuShortcut,
  Trigger: DropdownMenuTrigger,
})
