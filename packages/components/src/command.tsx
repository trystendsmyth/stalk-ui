import { Command as CommandPrimitive } from 'cmdk'
import { Search } from 'lucide-react'
import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { command as commandRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef, HTMLAttributes } from 'react'

const styles = /* @__PURE__ */ commandRecipe()

export type CommandRootProps = ComponentPropsWithoutRef<typeof CommandPrimitive>

export const CommandRoot = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof CommandPrimitive>,
  CommandRootProps
>(function CommandRoot({ className, ...props }, ref) {
  return <CommandPrimitive ref={ref} className={cx(styles.root, className)} {...props} />
})

export type CommandInputProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Input>

export const CommandInput = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof CommandPrimitive.Input>,
  CommandInputProps
>(function CommandInput({ className, ...props }, ref) {
  return (
    <div className={styles.inputWrapper}>
      <Search size={16} aria-hidden />
      <CommandPrimitive.Input ref={ref} className={cx(styles.input, className)} {...props} />
    </div>
  )
})

export type CommandListProps = ComponentPropsWithoutRef<typeof CommandPrimitive.List>

export const CommandList = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof CommandPrimitive.List>,
  CommandListProps
>(function CommandList({ className, ...props }, ref) {
  return <CommandPrimitive.List ref={ref} className={cx(styles.list, className)} {...props} />
})

export type CommandEmptyProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>

export const CommandEmpty = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof CommandPrimitive.Empty>,
  CommandEmptyProps
>(function CommandEmpty({ className, ...props }, ref) {
  return <CommandPrimitive.Empty ref={ref} className={cx(styles.empty, className)} {...props} />
})

export type CommandGroupProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Group>

export const CommandGroup = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof CommandPrimitive.Group>,
  CommandGroupProps
>(function CommandGroup({ className, ...props }, ref) {
  return <CommandPrimitive.Group ref={ref} className={cx(styles.group, className)} {...props} />
})

export type CommandItemProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Item>

export const CommandItem = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof CommandPrimitive.Item>,
  CommandItemProps
>(function CommandItem({ className, ...props }, ref) {
  return <CommandPrimitive.Item ref={ref} className={cx(styles.item, className)} {...props} />
})

export type CommandSeparatorProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>

export const CommandSeparator = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof CommandPrimitive.Separator>,
  CommandSeparatorProps
>(function CommandSeparator({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Separator ref={ref} className={cx(styles.separator, className)} {...props} />
  )
})

export type CommandShortcutProps = HTMLAttributes<HTMLSpanElement>

export const CommandShortcut = /* @__PURE__ */ forwardRef<HTMLSpanElement, CommandShortcutProps>(
  function CommandShortcut({ className, ...props }, ref) {
    return <span ref={ref} className={cx(styles.shortcut, className)} {...props} />
  },
)

export const Command = /* @__PURE__ */ Object.assign(CommandRoot, {
  Empty: CommandEmpty,
  Group: CommandGroup,
  Input: CommandInput,
  Item: CommandItem,
  List: CommandList,
  Root: CommandRoot,
  Separator: CommandSeparator,
  Shortcut: CommandShortcut,
})
