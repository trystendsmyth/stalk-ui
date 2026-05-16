import * as TabsPrimitive from '@radix-ui/react-tabs'
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react'
import { css, cx } from 'styled-system/css'
import { tabs as tabsRecipe } from 'styled-system/recipes'

import type { Tone } from './tones'
import type { ComponentPropsWithoutRef, ComponentRef } from 'react'

export type TabsSize = (typeof tabsRecipe.variantMap.size)[number]
export type TabsVariant = (typeof tabsRecipe.variantMap.variant)[number]
export type TabsTone = Tone

interface TabsContextValue {
  fitted: boolean
  size: TabsSize
  styles: ReturnType<typeof tabsRecipe>
  variant: TabsVariant
}

const TabsContext = /* @__PURE__ */ createContext<TabsContextValue | null>(null)

const useTabsStyles = () => {
  const ctx = useContext(TabsContext)
  if (!ctx) {
    throw new Error('Tabs subcomponents must be rendered inside <TabsRoot>.')
  }
  return ctx
}

export interface TabsRootProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  /** Stretch the trigger list to fill the row and split available space evenly. */
  fitted?: boolean
  size?: TabsSize
  /** Selects the semantic color palette used for the active indicator. */
  tone?: TabsTone
  variant?: TabsVariant
}

export const TabsRoot = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof TabsPrimitive.Root>,
  TabsRootProps
>(function TabsRoot(
  { className, fitted = false, size = 'md', tone = 'accent', variant = 'line', ...props },
  ref,
) {
  const styles = useMemo(() => tabsRecipe({ fitted, size, variant }), [fitted, size, variant])
  const ctx = useMemo<TabsContextValue>(
    () => ({ fitted, size, styles, variant }),
    [fitted, size, styles, variant],
  )

  return (
    <TabsContext.Provider value={ctx}>
      <TabsPrimitive.Root
        ref={ref}
        className={cx(styles.root, css({ colorPalette: tone }), className)}
        {...props}
      />
    </TabsContext.Provider>
  )
})

export type TabsListProps = ComponentPropsWithoutRef<typeof TabsPrimitive.List>

/** Drives the sliding indicator. Reads the active trigger's position on every state
 *  change (via MutationObserver, scoped to `data-state` attribute mutations) and on
 *  resize, then writes inline `transform`/`width`/`height` to the indicator element.
 *  Only transform/size are animated → all on the compositor thread, no layout reflow.
 *
 *  Variant determines whether the indicator hugs one axis (line) or covers the full
 *  trigger box (segmented, pills). For the line variant the orthogonal dimension is
 *  pinned by CSS (`height: 2px` for horizontal, `width: 2px` for vertical), so we
 *  intentionally leave that style empty here to defer to the recipe. */
const useIndicator = (listRef: React.RefObject<HTMLDivElement | null>, variant: TabsVariant) => {
  const indicatorRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const list = listRef.current
    const indicator = indicatorRef.current
    if (!list || !indicator) return

    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const active = list.querySelector<HTMLElement>('[role="tab"][data-state="active"]')
        if (!active) {
          indicator.style.opacity = '0'
          return
        }
        const vertical = list.getAttribute('data-orientation') === 'vertical'
        const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = active

        if (variant === 'line') {
          if (vertical) {
            indicator.style.transform = `translate3d(0, ${String(offsetTop)}px, 0)`
            indicator.style.height = `${String(offsetHeight)}px`
            indicator.style.width = ''
          } else {
            indicator.style.transform = `translate3d(${String(offsetLeft)}px, 0, 0)`
            indicator.style.width = `${String(offsetWidth)}px`
            indicator.style.height = ''
          }
        } else {
          indicator.style.transform = `translate3d(${String(offsetLeft)}px, ${String(offsetTop)}px, 0)`
          indicator.style.width = `${String(offsetWidth)}px`
          indicator.style.height = `${String(offsetHeight)}px`
        }

        indicator.style.opacity = '1'
      })
    }

    update()

    const mo = new MutationObserver(update)
    mo.observe(list, { attributes: true, attributeFilter: ['data-state'], subtree: true })

    const ro = new ResizeObserver(update)
    ro.observe(list)
    for (const child of Array.from(list.querySelectorAll('[role="tab"]'))) {
      ro.observe(child)
    }

    return () => {
      cancelAnimationFrame(frame)
      mo.disconnect()
      ro.disconnect()
    }
  }, [listRef, variant])

  return indicatorRef
}

export const TabsList = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof TabsPrimitive.List>,
  TabsListProps
>(function TabsList({ children, className, ...props }, ref) {
  const { styles, variant } = useTabsStyles()
  const listRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useIndicator(listRef, variant)

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      listRef.current = node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    },
    [ref],
  )

  return (
    <TabsPrimitive.List ref={setRefs} className={cx(styles.list, className)} {...props}>
      <span ref={indicatorRef} aria-hidden="true" className={styles.indicator} />
      {children}
    </TabsPrimitive.List>
  )
})

export type TabsTriggerProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>

export const TabsTrigger = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(function TabsTrigger({ className, ...props }, ref) {
  const { styles } = useTabsStyles()
  return <TabsPrimitive.Trigger ref={ref} className={cx(styles.trigger, className)} {...props} />
})

export type TabsContentProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Content>

export const TabsContent = /* @__PURE__ */ forwardRef<
  ComponentRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(function TabsContent({ className, ...props }, ref) {
  const { styles } = useTabsStyles()
  return <TabsPrimitive.Content ref={ref} className={cx(styles.content, className)} {...props} />
})

export const Tabs = /* @__PURE__ */ Object.assign(TabsRoot, {
  Content: TabsContent,
  List: TabsList,
  Root: TabsRoot,
  Trigger: TabsTrigger,
})
