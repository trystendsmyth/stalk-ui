'use client'

import * as SwitchPrimitive from '@radix-ui/react-switch'
import { forwardRef, useId } from 'react'
import { cx } from 'styled-system/css'
import { switchRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef } from 'react'

export type SwitchSize = 'sm' | 'md' | 'lg'

export interface SwitchProps extends Omit<
  ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
  'color'
> {
  /** Marks the switch as invalid; sets `aria-invalid` and applies invalid styling. */
  invalid?: boolean
  size?: SwitchSize
}

export const Switch = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(function Switch(
  { 'aria-invalid': ariaInvalid, className, id: idProp, invalid = false, size = 'md', ...props },
  ref,
) {
  const isInvalid = invalid || ariaInvalid === true || ariaInvalid === 'true'
  const generatedId = useId()
  const id = idProp ?? generatedId
  const styles = switchRecipe({ size })

  return (
    <SwitchPrimitive.Root
      ref={ref}
      id={id}
      aria-invalid={isInvalid ? true : ariaInvalid}
      className={cx(styles.root, className)}
      data-invalid={isInvalid ? '' : undefined}
      {...props}
    >
      <SwitchPrimitive.Thumb className={styles.thumb} />
    </SwitchPrimitive.Root>
  )
})
