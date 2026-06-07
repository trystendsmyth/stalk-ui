import { forwardRef } from 'react'
import { css, cx } from 'styled-system/css'
import { text as textRecipe } from 'styled-system/recipes'

import type { TextAlign, TextColor, TextSize, TextWeight } from './text'
import type { Tone } from './tones'
import type { HTMLAttributes } from 'react'

/** Heading levels. The level sets both the rendered element and the default visual size. */
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Heading level. Renders the matching `<hN>` and picks its textStyle by default. Defaults to `h2`. */
  as?: HeadingLevel
  /** Neutral foreground colour. Ignored when `tone` is set. Defaults to `default`. */
  color?: TextColor
  lineClamp?: number
  /** Visual size, decoupled from the semantic level. Defaults to match `as`. */
  size?: TextSize
  /** Selects a semantic status palette, overriding `color`. */
  tone?: Tone
  truncate?: boolean
  align?: TextAlign
  /** Defaults to `semibold`. */
  weight?: TextWeight
}

const resolveColor = (color: TextColor, tone: Tone | undefined): string | undefined => {
  if (tone !== undefined) return css({ colorPalette: tone, color: 'colorPalette.text' })
  if (color === 'default') return undefined
  return css({ color: `fg.${color}` })
}

export const Heading = /* @__PURE__ */ forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading(
    {
      align,
      as: Component = 'h2',
      className,
      color = 'default',
      lineClamp,
      size,
      tone,
      truncate = false,
      weight = 'semibold',
      ...props
    },
    ref,
  ) {
    return (
      <Component
        ref={ref}
        className={cx(
          textRecipe({ align, size: size ?? Component, truncate, weight }),
          resolveColor(color, tone),
          lineClamp !== undefined ? css({ lineClamp: String(lineClamp) }) : undefined,
          className,
        )}
        {...props}
      />
    )
  },
)
