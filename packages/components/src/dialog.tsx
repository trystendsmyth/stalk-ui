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

// Drag plumbing between a draggable Content and its Header (the drag handle).
interface DialogDragHandlers {
  className: string
  onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void
  onPointerMove: (event: ReactPointerEvent<HTMLDivElement>) => void
  onPointerUp: (event: ReactPointerEvent<HTMLDivElement>) => void
}

const DialogDragContext = /* @__PURE__ */ createContext<DialogDragHandlers | null>(null)

const dragHandle = /* @__PURE__ */ css({
  cursor: 'grab',
  touchAction: 'none',
  userSelect: 'none',
  _active: { cursor: 'grabbing' },
})

// Drags starting on interactive children (e.g. a Close button in the header)
// stay clicks.
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
    overlay = true,
    scrollBehavior = 'outside',
    ...props
  },
  ref,
) {
  const contentRef = useRef<HTMLDivElement | null>(null)
  // Offset lives outside React state: pointermove writes the transform
  // directly, so dragging never re-renders the dialog subtree.
  const drag = useRef({ pointerId: -1, startX: 0, startY: 0, baseX: 0, baseY: 0, x: 0, y: 0 })

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
    // Compose with the recipe's centering transform; clearing the inline style
    // at home restores the recipe entirely.
    element.style.transform =
      x === 0 && y === 0
        ? ''
        : `translate(-50%, -50%) translate3d(${String(x)}px, ${String(y)}px, 0)`
  }, [])

  const dragHandlers = useMemo<DialogDragHandlers | null>(() => {
    if (!draggable) return null
    return {
      className: dragHandle,
      onPointerDown: (event) => {
        if (event.button !== 0) return
        if (event.target instanceof Element && event.target.closest(INTERACTIVE_SELECTOR) !== null)
          return
        const state = drag.current
        state.pointerId = event.pointerId
        state.startX = event.clientX
        state.startY = event.clientY
        state.baseX = state.x
        state.baseY = state.y
        if (typeof event.currentTarget.setPointerCapture === 'function') {
          event.currentTarget.setPointerCapture(event.pointerId)
        }
      },
      onPointerMove: (event) => {
        const state = drag.current
        if (state.pointerId !== event.pointerId) return
        applyOffset(
          state.baseX + event.clientX - state.startX,
          state.baseY + event.clientY - state.startY,
        )
      },
      onPointerUp: (event) => {
        const state = drag.current
        if (state.pointerId !== event.pointerId) return
        state.pointerId = -1
        if (Math.hypot(state.x, state.y) <= dragSnapDistance) applyOffset(0, 0)
      },
    }
  }, [draggable, dragSnapDistance, applyOffset])

  const contentClass =
    scrollBehavior === 'outside' ? styles.content : dialogRecipe({ scrollBehavior }).content
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
  Overlay: DialogOverlay,
  Portal: DialogPortal,
  Root: DialogRoot,
  Title: DialogTitle,
  Trigger: DialogTrigger,
})
