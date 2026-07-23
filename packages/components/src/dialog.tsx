import * as DialogPrimitive from '@radix-ui/react-dialog'
import { createContext, forwardRef, useCallback, useContext, useMemo, useRef } from 'react'
import { css, cx } from 'styled-system/css'
import { dialog as dialogRecipe } from 'styled-system/recipes'

import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  HTMLAttributes,
  PointerEvent as ReactPointerEvent,
} from 'react'

const styles = /* @__PURE__ */ dialogRecipe()
// Static variant calls: no per-render recipe work, and extraction always sees them.
const contentStyles = /* @__PURE__ */ {
  padded: {
    outside: dialogRecipe().content,
    inside: dialogRecipe({ scrollBehavior: 'inside' }).content,
  },
  banded: {
    outside: dialogRecipe({ layout: 'banded' }).content,
    inside: dialogRecipe({ layout: 'banded', scrollBehavior: 'inside' }).content,
  },
}

// Drag plumbing between a draggable Content and its Header (the drag handle).
interface DialogDragHandlers {
  className: string
  onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void
  onPointerMove: (event: ReactPointerEvent<HTMLDivElement>) => void
  onPointerUp: (event: ReactPointerEvent<HTMLDivElement>) => void
}

const DialogDragContext = /* @__PURE__ */ createContext<DialogDragHandlers | null>(null)

// Pair `draggable` with `layout="banded"` — the header band is the full-bleed
// handle by construction. The wash yields while an inline close is hovered so
// the two affordances don't fight.
const dragHandle = /* @__PURE__ */ css({
  cursor: 'grab',
  touchAction: 'none',
  userSelect: 'none',
  _hover: { bgColor: 'bg.subtle' },
  '&:has(.stalk-dialog__close:hover)': { bgColor: 'transparent' },
  '&[data-dragging]': { cursor: 'grabbing', bgColor: 'bg.subtle' },
})

// Drags starting on interactive children (e.g. a header Close) stay clicks.
const INTERACTIVE_SELECTOR = 'a, button, input, select, textarea, [role="button"]'

export const DialogRoot = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogPortal = DialogPrimitive.Portal

export const DialogClose = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof DialogPrimitive.Close>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(function DialogClose({ asChild = false, className, ...props }, ref) {
  return (
    <DialogPrimitive.Close
      ref={ref}
      asChild={asChild}
      className={asChild ? className : cx(styles.close, className)}
      {...props}
    />
  )
})

export const DialogOverlay = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(function DialogOverlay({ className, ...props }, ref) {
  return <DialogPrimitive.Overlay ref={ref} className={cx(styles.overlay, className)} {...props} />
})

export interface DialogContentProps extends Omit<
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
  'draggable'
> {
  /**
   * Render the dimming overlay behind the content. Default `true`. Set `false`
   * for a non-modal dialog (`<Dialog modal={false}>`) so the page behind stays
   * interactive and click-through — Radix's `modal` prop is forwarded by
   * `Dialog.Root`, this just drops the blocking overlay to match.
   */
  overlay?: boolean
  /**
   * `padded` (default): the content pads and regions are text blocks.
   * `banded`: header/body/footer are full-width separator-bound bands — the
   * fit for dense panels and draggable dialogs.
   */
  layout?: 'padded' | 'banded'
  /**
   * `outside` (default) scrolls the whole panel; `inside` pins header/footer
   * and hands the scroll to `Dialog.Body`.
   */
  scrollBehavior?: 'outside' | 'inside'
  /**
   * Let the pointer drag the dialog by its `Dialog.Header`. Pairs with
   * `modal={false}` + `overlay={false}` for floating panels.
   */
  draggable?: boolean
  /** Released within this many px of home, the dialog snaps back. Default 24. */
  dragSnapDistance?: number
}

export const DialogContent = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(function DialogContent(
  {
    children,
    className,
    draggable = false,
    dragSnapDistance = 24,
    layout = 'padded',
    overlay = true,
    scrollBehavior = 'outside',
    ...props
  },
  ref,
) {
  const contentRef = useRef<HTMLDivElement | null>(null)
  // Offset lives outside React state; pointermove writes styles directly.
  const drag = useRef({
    pointerId: -1,
    startX: 0,
    startY: 0,
    baseX: 0,
    baseY: 0,
    x: 0,
    y: 0,
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0,
  })

  const composedRef = useCallback(
    (node: HTMLDivElement | null) => {
      contentRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref !== null) ref.current = node
    },
    [ref],
  )

  const applyOffset = useCallback((x: number, y: number) => {
    const element = contentRef.current
    if (element === null) return
    drag.current.x = x
    drag.current.y = y
    // The recipe centers via `translate`, so the offset owns `transform`.
    element.style.transform =
      x === 0 && y === 0 ? '' : `translate3d(${String(x)}px, ${String(y)}px, 0)`
  }, [])

  const dragHandlers = useMemo<DialogDragHandlers | null>(() => {
    if (!draggable) return null
    return {
      className: dragHandle,
      onPointerDown: (event) => {
        if (event.button !== 0) return
        const state = drag.current
        if (state.pointerId !== -1) return // one drag at a time
        if (event.target instanceof Element && event.target.closest(INTERACTIVE_SELECTOR) !== null)
          return
        const content = contentRef.current
        if (content === null) return
        state.pointerId = event.pointerId
        state.startX = event.clientX
        state.startY = event.clientY
        state.baseX = state.x
        state.baseY = state.y
        // Keep the panel on-screen; the header (only handle) stays reachable.
        const rect = content.getBoundingClientRect()
        const headerBottom = event.currentTarget.getBoundingClientRect().bottom
        state.minX = state.baseX - rect.left
        state.maxX = state.baseX + window.innerWidth - rect.right
        state.minY = state.baseY - rect.top
        state.maxY = state.baseY + window.innerHeight - headerBottom
        // Track 1:1 while dragging; the recipe transition animates the snap-back.
        content.style.transition = 'none'
        content.style.willChange = 'transform'
        event.currentTarget.setAttribute('data-dragging', '')
        if (typeof event.currentTarget.setPointerCapture === 'function') {
          event.currentTarget.setPointerCapture(event.pointerId)
        }
      },
      onPointerMove: (event) => {
        const state = drag.current
        if (state.pointerId !== event.pointerId) return
        applyOffset(
          Math.min(state.maxX, Math.max(state.minX, state.baseX + event.clientX - state.startX)),
          Math.min(state.maxY, Math.max(state.minY, state.baseY + event.clientY - state.startY)),
        )
      },
      onPointerUp: (event) => {
        const state = drag.current
        if (state.pointerId !== event.pointerId) return
        state.pointerId = -1
        event.currentTarget.removeAttribute('data-dragging')
        const content = contentRef.current
        if (content !== null) {
          content.style.transition = ''
          content.style.willChange = ''
        }
        if (Math.hypot(state.x, state.y) <= dragSnapDistance) applyOffset(0, 0)
      },
    }
  }, [draggable, dragSnapDistance, applyOffset])

  const contentClass = contentStyles[layout][scrollBehavior]
  return (
    <DialogPortal>
      {overlay ? <DialogOverlay /> : null}
      <DialogPrimitive.Content ref={composedRef} className={cx(contentClass, className)} {...props}>
        <DialogDragContext.Provider value={dragHandlers}>{children}</DialogDragContext.Provider>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
})

export const DialogBody = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function DialogBody({ className, ...props }, ref) {
  return <div ref={ref} className={cx(styles.body, className)} {...props} />
})

export const DialogHeader = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function DialogHeader({ className, ...props }, ref) {
  const dragHandlers = useContext(DialogDragContext)
  return (
    <div
      ref={ref}
      className={cx(styles.header, dragHandlers?.className, className)}
      {...(dragHandlers === null
        ? {}
        : {
            onPointerDown: dragHandlers.onPointerDown,
            onPointerMove: dragHandlers.onPointerMove,
            onPointerUp: dragHandlers.onPointerUp,
            onPointerCancel: dragHandlers.onPointerUp,
          })}
      {...props}
    />
  )
})

export const DialogHeaderActions = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function DialogHeaderActions({ className, ...props }, ref) {
  return <div ref={ref} className={cx(styles.headerActions, className)} {...props} />
})

export const DialogTitle = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(function DialogTitle({ className, ...props }, ref) {
  return <DialogPrimitive.Title ref={ref} className={cx(styles.title, className)} {...props} />
})

export const DialogDescription = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(function DialogDescription({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cx(styles.description, className)}
      {...props}
    />
  )
})

export const DialogFooter = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function DialogFooter({ className, ...props }, ref) {
  return <div ref={ref} className={cx(styles.footer, className)} {...props} />
})

// Compose the compound on a fresh wrapper rather than mutating the shared
// `DialogPrimitive.Root` singleton: Sheet is built on the same Radix dialog
// primitive, so `Object.assign`-ing the singleton in both would clobber each
// other's parts whenever both are imported together.
function DialogRootComponent(props: ComponentPropsWithoutRef<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props} />
}

export const Dialog = /* @__PURE__ */ Object.assign(DialogRootComponent, {
  Body: DialogBody,
  Close: DialogClose,
  Content: DialogContent,
  Description: DialogDescription,
  Footer: DialogFooter,
  Header: DialogHeader,
  HeaderActions: DialogHeaderActions,
  Overlay: DialogOverlay,
  Portal: DialogPortal,
  Root: DialogRoot,
  Title: DialogTitle,
  Trigger: DialogTrigger,
})
