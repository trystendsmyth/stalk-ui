import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { select as selectRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef } from 'react'

export type SelectSize = 'sm' | 'md' | 'lg'

export const SelectRoot = SelectPrimitive.Root
export const SelectGroup = SelectPrimitive.Group
export const SelectValue = SelectPrimitive.Value
export const SelectPortal = SelectPrimitive.Portal

export interface SelectTriggerProps extends ComponentPropsWithoutRef<
  typeof SelectPrimitive.Trigger
> {
  invalid?: boolean
  size?: SelectSize
}

export const SelectTrigger = forwardRef<
  ComponentRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(
  (
    { 'aria-invalid': ariaInvalid, children, className, invalid = false, size = 'md', ...props },
    ref,
  ) => {
    const isInvalid = invalid || ariaInvalid === true || ariaInvalid === 'true'
    const styles = selectRecipe({ size })

    return (
      <SelectPrimitive.Trigger
        ref={ref}
        aria-invalid={isInvalid ? true : ariaInvalid}
        className={cx(styles.trigger, className)}
        data-invalid={isInvalid ? '' : undefined}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <ChevronDown aria-hidden="true" height={16} width={16} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    )
  },
)

SelectTrigger.displayName = 'SelectTrigger'

export type SelectContentProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Content>

export const SelectContent = forwardRef<
  ComponentRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ children, className, position = 'popper', ...props }, ref) => {
  const styles = selectRecipe()

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cx(styles.content, className)}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport className={styles.viewport}>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
})

SelectContent.displayName = 'SelectContent'

export const SelectItem = forwardRef<
  ComponentRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, className, ...props }, ref) => {
  const styles = selectRecipe()

  return (
    <SelectPrimitive.Item ref={ref} className={cx(styles.item, className)} {...props}>
      <SelectPrimitive.ItemIndicator className={styles.itemIndicator}>
        <Check aria-hidden="true" height={14} width={14} />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
})

SelectItem.displayName = 'SelectItem'

export const SelectLabel = forwardRef<
  ComponentRef<typeof SelectPrimitive.Label>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => {
  const styles = selectRecipe()
  return <SelectPrimitive.Label ref={ref} className={cx(styles.label, className)} {...props} />
})

SelectLabel.displayName = 'SelectLabel'

export const SelectSeparator = forwardRef<
  ComponentRef<typeof SelectPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => {
  const styles = selectRecipe()
  return (
    <SelectPrimitive.Separator ref={ref} className={cx(styles.separator, className)} {...props} />
  )
})

SelectSeparator.displayName = 'SelectSeparator'

export const Select = Object.assign(SelectRoot, {
  Content: SelectContent,
  Group: SelectGroup,
  Item: SelectItem,
  Label: SelectLabel,
  Portal: SelectPortal,
  Root: SelectRoot,
  Separator: SelectSeparator,
  Trigger: SelectTrigger,
  Value: SelectValue,
})
