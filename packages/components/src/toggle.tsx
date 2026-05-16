import * as TogglePrimitive from '@radix-ui/react-toggle'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { createContext, forwardRef, useContext, useMemo } from 'react'
import { css, cx } from 'styled-system/css'
import { toggle as toggleRecipe } from 'styled-system/recipes'

import type { Tone } from './tones'
import type { ComponentPropsWithoutRef, ComponentRef } from 'react'

export type ToggleSize = (typeof toggleRecipe.variantMap.size)[number]
export type ToggleVariant = (typeof toggleRecipe.variantMap.variant)[number]
export type ToggleRadius = (typeof toggleRecipe.variantMap.radius)[number]
export type ToggleTone = Tone

interface ToggleGroupContextValue {
  attached: boolean
  radius: ToggleRadius
  size: ToggleSize
  tone: ToggleTone
  variant: ToggleVariant
}

const ToggleGroupContext = /* @__PURE__ */ createContext<ToggleGroupContextValue | null>(null)

export interface ToggleProps extends ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
  radius?: ToggleRadius
  size?: ToggleSize
  /** Selects the semantic color palette used when the toggle is on. */
  tone?: ToggleTone
  variant?: ToggleVariant
}

export const Toggle = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(function Toggle(
  { className, radius = 'md', size = 'md', tone = 'accent', variant = 'outline', ...props },
  ref,
) {
  const styles = toggleRecipe({ radius, size, variant })
  return (
    <TogglePrimitive.Root
      ref={ref}
      className={cx(styles.item, css({ colorPalette: tone }), className)}
      {...props}
    />
  )
})

type ToggleGroupSingleProps = ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & {
  type: 'single'
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

type ToggleGroupMultipleProps = ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & {
  type: 'multiple'
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

export type ToggleGroupProps = (ToggleGroupSingleProps | ToggleGroupMultipleProps) & {
  /** When true, items sit flush against each other forming a segmented control. */
  attached?: boolean
  radius?: ToggleRadius
  size?: ToggleSize
  /** Selects the semantic color palette used when an item is on. */
  tone?: ToggleTone
  variant?: ToggleVariant
}

export const ToggleGroup = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps
>(function ToggleGroup(
  {
    attached = false,
    className,
    radius = 'md',
    size = 'md',
    tone = 'accent',
    variant = 'outline',
    ...props
  },
  ref,
) {
  const styles = toggleRecipe({ attached, radius, size, variant })
  const ctx = useMemo<ToggleGroupContextValue>(
    () => ({ attached, radius, size, tone, variant }),
    [attached, radius, size, tone, variant],
  )
  return (
    <ToggleGroupContext.Provider value={ctx}>
      <ToggleGroupPrimitive.Root
        ref={ref}
        className={cx(styles.root, css({ colorPalette: tone }), className)}
        {...props}
      />
    </ToggleGroupContext.Provider>
  )
})

export interface ToggleGroupItemProps extends ComponentPropsWithoutRef<
  typeof ToggleGroupPrimitive.Item
> {
  /** Override inherited group settings on a per-item basis. */
  radius?: ToggleRadius
  size?: ToggleSize
  variant?: ToggleVariant
}

export const ToggleGroupItem = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(function ToggleGroupItem(
  { className, radius: radiusProp, size: sizeProp, variant: variantProp, ...props },
  ref,
) {
  const ctx = useContext(ToggleGroupContext)
  const size = sizeProp ?? ctx?.size ?? 'md'
  const radius = radiusProp ?? ctx?.radius ?? 'md'
  const variant = variantProp ?? ctx?.variant ?? 'outline'
  const attached = ctx?.attached ?? false
  const styles = toggleRecipe({ attached, radius, size, variant })
  return <ToggleGroupPrimitive.Item ref={ref} className={cx(styles.item, className)} {...props} />
})
