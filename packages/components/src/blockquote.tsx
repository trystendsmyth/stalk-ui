import { forwardRef } from 'react'
import { css, cx } from 'styled-system/css'
import { blockquote as blockquoteRecipe } from 'styled-system/recipes'

import type { Tone } from './tones'
import type { BlockquoteHTMLAttributes } from 'react'

export type BlockquoteSize = (typeof blockquoteRecipe.variantMap.size)[number]

export interface BlockquoteProps extends BlockquoteHTMLAttributes<HTMLQuoteElement> {
  size?: BlockquoteSize
  /** Tints the inline-start rule with a semantic palette. Defaults to a neutral border. */
  tone?: Tone
}

export const Blockquote = /* @__PURE__ */ forwardRef<HTMLQuoteElement, BlockquoteProps>(
  function Blockquote({ className, size = 'md', tone, ...props }, ref) {
    return (
      <blockquote
        ref={ref}
        className={cx(
          blockquoteRecipe({ size }),
          tone !== undefined
            ? css({ colorPalette: tone, borderColor: 'colorPalette.muted' })
            : undefined,
          className,
        )}
        {...props}
      />
    )
  },
)
