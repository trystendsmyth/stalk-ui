import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check, Minus } from 'lucide-react'
import { forwardRef, useId, useState } from 'react'
import { cx } from 'styled-system/css'
import { checkbox as checkboxRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef } from 'react'

export type CheckboxSize = 'sm' | 'md' | 'lg'
type CheckedState = boolean | 'indeterminate'

export interface CheckboxProps extends Omit<
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  'color'
> {
  invalid?: boolean
  size?: CheckboxSize
}

const ICON_SIZE: Record<CheckboxSize, number> = {
  sm: 10,
  md: 12,
  lg: 16,
}

export const Checkbox = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(function Checkbox(
  {
    'aria-invalid': ariaInvalid,
    checked,
    className,
    defaultChecked,
    id: idProp,
    invalid = false,
    onCheckedChange,
    size = 'md',
    ...props
  },
  ref,
) {
  const isInvalid = invalid || ariaInvalid === true || ariaInvalid === 'true'
  const generatedId = useId()
  const id = idProp ?? generatedId
  const styles = checkboxRecipe({ size })
  const iconSize = ICON_SIZE[size]

  const isControlled = checked !== undefined
  const [internalState, setInternalState] = useState<CheckedState>(defaultChecked ?? false)

  const effectiveState = isControlled ? checked : internalState
  const isIndeterminate = effectiveState === 'indeterminate'

  const handleCheckedChange = (next: CheckedState) => {
    if (!isControlled) {
      setInternalState(next)
    }
    onCheckedChange?.(next)
  }

  const checkedProps: { checked?: CheckedState; defaultChecked?: CheckedState } = isControlled
    ? { checked }
    : defaultChecked !== undefined
      ? { defaultChecked }
      : {}

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      id={id}
      aria-invalid={isInvalid ? true : ariaInvalid}
      className={cx(styles.root, className)}
      data-invalid={isInvalid ? '' : undefined}
      {...checkedProps}
      onCheckedChange={handleCheckedChange}
      {...props}
    >
      <CheckboxPrimitive.Indicator asChild className={styles.indicator}>
        {isIndeterminate ? (
          <Minus aria-hidden="true" height={iconSize} width={iconSize} strokeWidth={3} />
        ) : (
          <Check aria-hidden="true" height={iconSize} width={iconSize} strokeWidth={3} />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
