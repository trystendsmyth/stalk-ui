'use client'

import { move } from '@dnd-kit/helpers'
import { DragDropProvider } from '@dnd-kit/react'
import { useSortable } from '@dnd-kit/react/sortable'
import { createStyleContext } from '@stalk-ui/utils'
import { GripVertical } from 'lucide-react'
import { createContext, forwardRef, useContext, useMemo } from 'react'
import { cx } from 'styled-system/css'
import { sortable as sortableRecipe } from 'styled-system/recipes'

import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

/** Matches dnd-kit's `UniqueIdentifier`. */
export type SortableId = number | string

const { StyleProvider, useSlotStyles } = /* @__PURE__ */ createStyleContext(sortableRecipe, {
  name: 'Sortable',
})

// The item shares its drag-handle ref down to `Sortable.Handle`. `null` means
// "no handle context" — Handle rendered outside an Item.
type HandleRef = (element: Element | null) => void
const SortableHandleContext = /* @__PURE__ */ createContext<HandleRef | null>(null)

export interface SortableProps<T extends { id: SortableId }> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onDragEnd'
> {
  /** The ordered items. Each needs a stable `id`; this is the source of truth. */
  items: T[]
  /** Called with the reordered array when a drag settles into a new position. */
  onReorder: (items: T[]) => void
  /** The `Sortable.Item`s, one per entry in `items`. */
  children: ReactNode
}

/**
 * Headless drag-to-reorder list built on @dnd-kit. Controlled: you own `items`
 * and apply the `onReorder` result to your state. Keyboard and pointer dragging
 * (space to lift, arrows to move, space to drop) come from dnd-kit's default
 * sensors, so it is accessible out of the box. Compose it into reorderable lists,
 * sortable rows, or multi-column boards.
 */
export function SortableRoot<T extends { id: SortableId }>({
  items,
  onReorder,
  className,
  children,
  ...props
}: SortableProps<T>) {
  const styles = useMemo(() => sortableRecipe(), [])

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        // `move` returns the same reference on a canceled/no-op drag.
        const next = move(items, event)
        if (next !== items) onReorder(next)
      }}
    >
      <StyleProvider value={styles}>
        <div className={cx(styles.root, className)} {...props}>
          {children}
        </div>
      </StyleProvider>
    </DragDropProvider>
  )
}

export interface SortableItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  /** Stable identifier matching the corresponding entry in `items` (dnd-kit id). */
  id: SortableId
  /** The item's current position in `items`. */
  index: number
}

export const SortableItem = /* @__PURE__ */ forwardRef<HTMLDivElement, SortableItemProps>(
  function SortableItem({ id, index, className, children, ...props }, forwardedRef) {
    const styles = useSlotStyles()
    const { ref, handleRef, isDragging } = useSortable({ id, index })

    const setRefs = (node: HTMLDivElement | null) => {
      ref(node)
      if (typeof forwardedRef === 'function') forwardedRef(node)
      else if (forwardedRef) forwardedRef.current = node
    }

    return (
      <SortableHandleContext.Provider value={handleRef}>
        <div
          ref={setRefs}
          className={cx(styles.item, className)}
          data-dragging={isDragging ? '' : undefined}
          {...props}
        >
          {children}
        </div>
      </SortableHandleContext.Provider>
    )
  },
)

export interface SortableHandleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible label for the drag handle (i18n). Default `'Drag to reorder'`. */
  label?: string
}

/**
 * Drag handle for a `Sortable.Item`. When present, only the handle initiates a
 * drag (the rest of the item stays interactive). Omit it to make the whole item
 * draggable. Renders a grip icon by default; pass children to override.
 */
export const SortableHandle = /* @__PURE__ */ forwardRef<HTMLButtonElement, SortableHandleProps>(
  function SortableHandle(
    { label = 'Drag to reorder', className, children, ...props },
    forwardedRef,
  ) {
    const styles = useSlotStyles()
    const handleRef = useContext(SortableHandleContext)
    if (handleRef === null) {
      throw new Error('Sortable.Handle must be rendered inside <Sortable.Item>.')
    }

    const setRefs = (node: HTMLButtonElement | null) => {
      handleRef(node)
      if (typeof forwardedRef === 'function') forwardedRef(node)
      else if (forwardedRef) forwardedRef.current = node
    }

    return (
      <button
        ref={setRefs}
        aria-label={label}
        className={cx(styles.handle, className)}
        type="button"
        {...props}
      >
        {children ?? <GripVertical aria-hidden="true" height={16} width={16} />}
      </button>
    )
  },
)

export const Sortable = /* @__PURE__ */ Object.assign(SortableRoot, {
  Handle: SortableHandle,
  Item: SortableItem,
  Root: SortableRoot,
})
