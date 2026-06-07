import { forwardRef } from 'react'
import { css, cx } from 'styled-system/css'
import { text as textRecipe } from 'styled-system/recipes'

import type { Tone } from './tones'
import type { HTMLAttributes } from 'react'

export type TextSize = (typeof textRecipe.variantMap.size)[number]
export type TextWeight = (typeof textRecipe.variantMap.weight)[number]
export type TextAlign = (typeof textRecipe.variantMap.align)[number]
/** Neutral foreground colours, mapped to `fg.*` semantic tokens. */
export type TextColor = 'default' | 'muted' | 'subtle'
/** Elements the inline/block text primitive is allowed to render as. */
export type TextElement = 'p' | 'span' | 'div' | 'label'

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. Defaults to `p`. */
  as?: TextElement
  /** Neutral foreground colour. Ignored when `tone` is set. Defaults to `default`. */
  color?: TextColor
  /** Clamp to N lines with a trailing ellipsis (multi-line). */
  lineClamp?: number
  size?: TextSize
  /** Selects a semantic status palette, overriding `color`. */
  tone?: Tone
  /** Truncate to a single line with a trailing ellipsis. */
  truncate?: boolean
  align?: TextAlign
  weight?: TextWeight
}

const resolveColor = (color: TextColor, tone: Tone | undefined): string | undefined => {
  if (tone !== undefined) return css({ colorPalette: tone, color: 'colorPalette.text' })
  if (color === 'default') return undefined
  return css({ color: `fg.${color}` })
}

const TextBase = /* @__PURE__ */ forwardRef<HTMLElement, TextProps>(function Text(
  {
    align,
    as: Component = 'p',
    className,
    color = 'default',
    lineClamp,
    size = 'body',
    tone,
    truncate = false,
    weight = 'regular',
    ...props
  },
  ref,
) {
  return (
    <Component
      // The element union is intentionally narrow; the cast keeps the shared
      // HTMLElement ref/attribute typing without a per-element generic.
      ref={ref as never}
      className={cx(
        textRecipe({ align, size, truncate, weight }),
        resolveColor(color, tone),
        lineClamp !== undefined ? css({ lineClamp: String(lineClamp) }) : undefined,
        className,
      )}
      {...props}
    />
  )
})

export type StrongProps = HTMLAttributes<HTMLElement>

export const Strong = /* @__PURE__ */ forwardRef<HTMLElement, StrongProps>(function Strong(
  { className, ...props },
  ref,
) {
  return <strong ref={ref} className={cx(css({ fontWeight: 'bold' }), className)} {...props} />
})

export type EmProps = HTMLAttributes<HTMLElement>

export const Em = /* @__PURE__ */ forwardRef<HTMLElement, EmProps>(function Em(
  { className, ...props },
  ref,
) {
  return <em ref={ref} className={cx(css({ fontStyle: 'italic' }), className)} {...props} />
})

export type QuoteProps = HTMLAttributes<HTMLQuoteElement>

// Inline quotation. The element carries the semantics; the UA supplies
// locale-aware quotation marks via `q::before`/`::after`.
export const Quote = /* @__PURE__ */ forwardRef<HTMLQuoteElement, QuoteProps>(function Quote(
  { className, ...props },
  ref,
) {
  return <q ref={ref} className={className} {...props} />
})

export const Text = /* @__PURE__ */ Object.assign(TextBase, {
  Em,
  Quote,
  Strong,
})
