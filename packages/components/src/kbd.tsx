import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { kbd as kbdRecipe } from 'styled-system/recipes'

import type { HTMLAttributes } from 'react'

export type KbdSize = (typeof kbdRecipe.variantMap.size)[number]

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  size?: KbdSize
}

export const Kbd = /* @__PURE__ */ forwardRef<HTMLElement, KbdProps>(function Kbd(
  { className, size = 'md', ...props },
  ref,
) {
  return <kbd ref={ref} className={cx(kbdRecipe({ size }), className)} {...props} />
})
