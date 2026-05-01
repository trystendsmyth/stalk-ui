import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { forwardRef, useId } from 'react'
import { cx } from 'styled-system/css'
import { radio as radioRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef } from 'react'

export type RadioSize = 'sm' | 'md' | 'lg'

export const RadioRoot = RadioGroupPrimitive.Root

export interface RadioItemProps extends Omit<
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
  'color'
> {
  /** Marks the radio as invalid; sets `aria-invalid` and applies invalid styling. */
  invalid?: boolean
  size?: RadioSize
}

export type RadioProps = RadioItemProps

export const RadioItem = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioItemProps
>(function RadioItem(
  { 'aria-invalid': ariaInvalid, className, id: idProp, invalid = false, size = 'md', ...props },
  ref,
) {
  const isInvalid = invalid || ariaInvalid === true || ariaInvalid === 'true'
  const generatedId = useId()
  const id = idProp ?? generatedId
  const styles = radioRecipe({ size })

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      id={id}
      aria-invalid={isInvalid ? true : ariaInvalid}
      className={cx(styles.root, className)}
      data-invalid={isInvalid ? '' : undefined}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className={styles.indicator} />
    </RadioGroupPrimitive.Item>
  )
})
export const Radio = /* @__PURE__ */ Object.assign(RadioRoot, {
  Item: RadioItem,
  Root: RadioRoot,
})
