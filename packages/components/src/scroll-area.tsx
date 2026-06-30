import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { scrollArea as scrollAreaRecipe } from 'styled-system/recipes'

import type { ComponentPropsWithoutRef, ComponentRef } from 'react'

const styles = /* @__PURE__ */ scrollAreaRecipe()

export const ScrollAreaViewport = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ScrollAreaPrimitive.Viewport>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Viewport>
>(function ScrollAreaViewport({ className, ...props }, ref) {
  // A scrollable region must be keyboard-operable; make the viewport focusable so
  // keyboard users can scroll it (overridable via props).
  return (
    <ScrollAreaPrimitive.Viewport
      ref={ref}
      tabIndex={0}
      className={cx(styles.viewport, className)}
      {...props}
    />
  )
})

export const ScrollAreaThumb = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ScrollAreaPrimitive.Thumb>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Thumb>
>(function ScrollAreaThumb({ className, ...props }, ref) {
  return <ScrollAreaPrimitive.Thumb ref={ref} className={cx(styles.thumb, className)} {...props} />
})

export const ScrollAreaScrollbar = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ScrollAreaPrimitive.Scrollbar>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>
>(function ScrollAreaScrollbar({ className, orientation = 'vertical', ...props }, ref) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      ref={ref}
      orientation={orientation}
      className={cx(styles.scrollbar, className)}
      {...props}
    >
      <ScrollAreaThumb />
    </ScrollAreaPrimitive.Scrollbar>
  )
})

export const ScrollAreaCorner = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ScrollAreaPrimitive.Corner>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Corner>
>(function ScrollAreaCorner({ className, ...props }, ref) {
  return (
    <ScrollAreaPrimitive.Corner ref={ref} className={cx(styles.corner, className)} {...props} />
  )
})

export interface ScrollAreaProps extends ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  /** Orientation of the convenience scrollbar rendered by the root. */
  orientation?: 'horizontal' | 'vertical' | 'both'
}

// Convenience root: wires Root + Viewport + scrollbar(s) + Corner so the common
// case is a single element. Compose the exported parts directly for finer control.
export const ScrollAreaRoot = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(function ScrollAreaRoot({ children, className, orientation = 'vertical', ...props }, ref) {
  return (
    <ScrollAreaPrimitive.Root ref={ref} className={cx(styles.root, className)} {...props}>
      <ScrollAreaViewport>{children}</ScrollAreaViewport>
      {orientation !== 'horizontal' && <ScrollAreaScrollbar orientation="vertical" />}
      {orientation !== 'vertical' && <ScrollAreaScrollbar orientation="horizontal" />}
      <ScrollAreaCorner />
    </ScrollAreaPrimitive.Root>
  )
})

type ScrollAreaNamespace = typeof ScrollAreaRoot & {
  Corner: typeof ScrollAreaCorner
  Root: typeof ScrollAreaRoot
  Scrollbar: typeof ScrollAreaScrollbar
  Thumb: typeof ScrollAreaThumb
  Viewport: typeof ScrollAreaViewport
}

export const ScrollArea: ScrollAreaNamespace = /* @__PURE__ */ Object.assign(ScrollAreaRoot, {
  Corner: ScrollAreaCorner,
  Root: ScrollAreaRoot,
  Scrollbar: ScrollAreaScrollbar,
  Thumb: ScrollAreaThumb,
  Viewport: ScrollAreaViewport,
})
