'use client'

import { createStyleContext } from '@stalk-ui/utils'
import { useVirtualizer } from '@tanstack/react-virtual'
import { createContext, forwardRef, useContext, useMemo, useRef } from 'react'
import { cx } from 'styled-system/css'
import { virtualList as virtualListRecipe } from 'styled-system/recipes'

import type { VirtualItem } from '@tanstack/react-virtual'
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

const { StyleProvider, useSlotStyles } = /* @__PURE__ */ createStyleContext(virtualListRecipe, {
  name: 'VirtualList',
})

interface VirtualListContextValue {
  horizontal: boolean
  // TanStack's ref callback: reads `data-index` off the node to record its real size.
  measureElement: (node: Element | null) => void
}

const VirtualListContext = /* @__PURE__ */ createContext<VirtualListContextValue | null>(null)

const useVirtualListContext = (): VirtualListContextValue => {
  const context = useContext(VirtualListContext)
  if (context === null) {
    throw new Error('VirtualList.Item must be rendered inside <VirtualList>.')
  }
  return context
}

export interface VirtualListProps<TItem> extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** The full backlog. Only the visible window (plus overscan) is ever in the DOM. */
  items: readonly TItem[]
  /** Estimated item size in px for the flat `index`; refined by real measurement. */
  estimateSize: (index: number) => number
  /** Extra items rendered beyond the viewport to smooth fast scrolls (default 8). */
  overscan?: number
  /** Scroll/lay out along the inline axis instead of the block axis. */
  horizontal?: boolean
  /** Gap in px between items. */
  gap?: number
  /** Stable key for an item; defaults to its flat index. */
  getItemKey?: (item: TItem, index: number) => number | string
  /** Render one item — wrap the return in `<VirtualList.Item>`. */
  children: (item: TItem, virtualItem: VirtualItem) => ReactNode
}

/**
 * Headless windowed list. Renders only the items intersecting the scroll viewport
 * (plus `overscan`), so a 100k-row backlog stays at a handful of DOM nodes. Item
 * heights need not be uniform — pass an `estimateSize` and each rendered
 * `VirtualList.Item` self-measures. Built directly on TanStack Virtual's
 * `useVirtualizer`; no re-wrapping so the escape hatches stay reachable.
 */
export function VirtualListRoot<TItem>({
  items,
  estimateSize,
  overscan = 8,
  horizontal = false,
  gap,
  getItemKey,
  className,
  children,
  ...props
}: VirtualListProps<TItem>) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => scrollRef.current,
    estimateSize,
    overscan,
    horizontal,
    ...(gap === undefined ? {} : { gap }),
    ...(getItemKey
      ? { getItemKey: (index: number) => getItemKey(items[index] as TItem, index) }
      : {}),
  })

  const styles = useMemo(
    () => virtualListRecipe({ orientation: horizontal ? 'horizontal' : 'vertical' }),
    [horizontal],
  )

  const contextValue = useMemo<VirtualListContextValue>(
    () => ({ horizontal, measureElement: virtualizer.measureElement }),
    [horizontal, virtualizer],
  )

  const virtualItems = virtualizer.getVirtualItems()
  const totalSize = virtualizer.getTotalSize()
  const viewportStyle: CSSProperties = horizontal ? { width: totalSize } : { height: totalSize }

  return (
    <StyleProvider value={styles}>
      <VirtualListContext.Provider value={contextValue}>
        <div ref={scrollRef} className={cx(styles.root, className)} {...props}>
          <div className={styles.viewport} style={viewportStyle}>
            {virtualItems.map((virtualItem) => {
              const item = items[virtualItem.index]
              return item === undefined ? null : children(item, virtualItem)
            })}
          </div>
        </div>
      </VirtualListContext.Provider>
    </StyleProvider>
  )
}

export interface VirtualListItemProps extends HTMLAttributes<HTMLDivElement> {
  /** The `VirtualItem` handed to the render callback; positions and measures the row. */
  virtualItem: VirtualItem
}

export const VirtualListItem = /* @__PURE__ */ forwardRef<HTMLDivElement, VirtualListItemProps>(
  function VirtualListItem({ virtualItem, className, style, children, ...props }, ref) {
    const styles = useSlotStyles()
    const { horizontal, measureElement } = useVirtualListContext()

    // The node must reach both TanStack's measurer (for real heights) and any
    // caller-forwarded ref.
    const setRefs = (node: HTMLDivElement | null) => {
      measureElement(node)
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    }

    return (
      <div
        ref={setRefs}
        className={cx(styles.item, className)}
        data-index={virtualItem.index}
        style={{
          transform: horizontal
            ? `translateX(${String(virtualItem.start)}px)`
            : `translateY(${String(virtualItem.start)}px)`,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    )
  },
)

export const VirtualList = /* @__PURE__ */ Object.assign(VirtualListRoot, {
  Item: VirtualListItem,
  Root: VirtualListRoot,
})
