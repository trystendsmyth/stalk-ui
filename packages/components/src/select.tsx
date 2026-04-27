import * as SelectPrimitive from '@radix-ui/react-select'
import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { select as selectRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef } from 'react'

export type SelectSize = 'sm' | 'md' | 'lg'

export const SelectRoot = SelectPrimitive.Root
export const SelectValue = SelectPrimitive.Value
export const SelectPortal = SelectPrimitive.Portal

export interface SelectTriggerProps extends ComponentPropsWithoutRef<
  typeof SelectPrimitive.Trigger
> {
  invalid?: boolean
  size?: SelectSize
}

export type SelectProps = SelectTriggerProps

export const SelectTrigger = forwardRef<
  ComponentRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(
  (
    { 'aria-invalid': ariaInvalid, className, disabled, invalid = false, size = 'md', ...props },
    ref,
  ) => {
    const isInvalid = invalid || ariaInvalid === true || ariaInvalid === 'true'

    return (
      <SelectPrimitive.Trigger
        ref={ref}
        aria-invalid={isInvalid ? true : ariaInvalid}
        className={cx(selectRecipe({ invalid: isInvalid, size }), className)}
        data-invalid={isInvalid ? '' : undefined}
        disabled={disabled}
        {...props}
      />
    )
  },
)

SelectTrigger.displayName = 'SelectTrigger'

export const SelectContent = forwardRef<
  ComponentRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, ...props }, ref) => (
  <SelectPortal>
    <SelectPrimitive.Content
      ref={ref}
      className={cx('stalk-select__content', className)}
      {...props}
    />
  </SelectPortal>
))

SelectContent.displayName = 'SelectContent'

export const SelectItem = forwardRef<
  ComponentRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref} className={cx('stalk-select__item', className)} {...props}>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))

SelectItem.displayName = 'SelectItem'

export const Select = Object.assign(SelectRoot, {
  Content: SelectContent,
  Item: SelectItem,
  Portal: SelectPortal,
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Value: SelectValue,
})
