import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { code as codeRecipe } from 'styled-system/recipes'

import type { HTMLAttributes } from 'react'

export type CodeVariant = (typeof codeRecipe.variantMap.variant)[number]

export interface CodeProps extends HTMLAttributes<HTMLElement> {
  /** Visual treatment. Defaults to `soft`. */
  variant?: CodeVariant
}

export const Code = /* @__PURE__ */ forwardRef<HTMLElement, CodeProps>(function Code(
  { className, variant = 'soft', ...props },
  ref,
) {
  return <code ref={ref} className={cx(codeRecipe({ variant }), className)} {...props} />
})
