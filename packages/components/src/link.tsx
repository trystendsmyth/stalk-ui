import { Slot } from '@radix-ui/react-slot'
import { forwardRef } from 'react'
import { css, cx } from 'styled-system/css'
import { link as linkRecipe } from 'styled-system/recipes'

import type { Tone } from './tones'
import type { AnchorHTMLAttributes } from 'react'

export type LinkUnderline = (typeof linkRecipe.variantMap.underline)[number]

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Render the child element instead of an `<a>` (e.g. a router Link). */
  asChild?: boolean
  /** Selects the semantic color palette. Defaults to `accent`. */
  tone?: Tone
  /** Underline behaviour. Defaults to `hover`. */
  underline?: LinkUnderline
}

export const Link = /* @__PURE__ */ forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { asChild = false, className, tone = 'accent', underline = 'hover', ...props },
  ref,
) {
  const Component = asChild ? Slot : 'a'

  return (
    <Component
      ref={ref}
      className={cx(linkRecipe({ underline }), css({ colorPalette: tone }), className)}
      {...props}
    />
  )
})
