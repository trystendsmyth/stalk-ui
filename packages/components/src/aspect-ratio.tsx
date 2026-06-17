import { Slot } from '@radix-ui/react-slot'
import { forwardRef } from 'react'
import { css, cx } from 'styled-system/css'

import type { CSSProperties, HTMLAttributes } from 'react'

// Native CSS `aspect-ratio` does the sizing; the ratio itself is a runtime value
// (set inline) so there is no recipe variant. The frame positions media and
// absolutely-placed children to fill the box edge to edge.
const frame = /* @__PURE__ */ css({
  position: 'relative',
  inlineSize: 'full',
  '& > *': {
    position: 'absolute',
    inset: '0',
    inlineSize: 'full',
    blockSize: 'full',
  },
  '& > img, & > video': {
    objectFit: 'cover',
  },
})

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  /** Render the single child element instead of a wrapping `<div>`. */
  asChild?: boolean
  /** Desired width-to-height ratio (e.g. `16 / 9`). Defaults to `1` (square). */
  ratio?: number
}

export const AspectRatio = /* @__PURE__ */ forwardRef<HTMLDivElement, AspectRatioProps>(
  function AspectRatio({ asChild = false, className, ratio = 1, style, ...props }, ref) {
    const Comp = asChild ? Slot : 'div'
    const ratioStyle: CSSProperties = { aspectRatio: String(ratio), ...style }
    return <Comp ref={ref} className={cx(frame, className)} style={ratioStyle} {...props} />
  },
)
