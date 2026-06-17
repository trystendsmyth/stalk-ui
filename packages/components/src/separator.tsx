import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { separator as separatorRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef } from 'react'

export type SeparatorOrientation = (typeof separatorRecipe.variantMap.orientation)[number]

export interface SeparatorProps extends ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  orientation?: SeparatorOrientation
}

export const Separator = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(function Separator({ className, decorative = true, orientation = 'horizontal', ...props }, ref) {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cx(separatorRecipe({ orientation }), className)}
      {...props}
    />
  )
})
