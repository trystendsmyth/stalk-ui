'use client'

/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role --
 * WAI-ARIA tree pattern: `treeitem` lives on the li (which carries the roving
 * tabindex and key handling) and child lists are `role=group`. */

import { ChevronRight } from 'lucide-react'
import { forwardRef, useRef, useState } from 'react'
import { cx } from 'styled-system/css'
import { tree as treeRecipe } from 'styled-system/recipes'

import type { CSSProperties, HTMLAttributes, KeyboardEvent, MouseEvent, ReactNode } from 'react'

export interface TreeNode {
  id: string
  label: ReactNode
  /** Plain-text stand-in for typeahead when `label` isn't a string. */
  textValue?: string
  children?: readonly TreeNode[]
  disabled?: boolean
}

export interface TreeProps extends Omit<HTMLAttributes<HTMLUListElement>, 'onSelect'> {
  nodes: readonly TreeNode[]
  /** Expanded branch ids (controlled). */
  expanded?: readonly string[]
  defaultExpanded?: readonly string[]
  onExpandedChange?: (expanded: string[]) => void
  /**
   * `multiple` adds Ctrl/Cmd-click and Enter toggling, Shift+Arrow selection,
   * and Ctrl+A select-all. Defaults to `single`.
   */
  selectionMode?: 'single' | 'multiple'
  /** Selected node ids (controlled). */
  selected?: readonly string[]
  defaultSelected?: readonly string[]
  onSelectedChange?: (selected: string[]) => void
  /** Selection treatment: tint (`ghost`, default), filled row (`solid`), or inset ring (`outline`). */
  variant?: 'ghost' | 'solid' | 'outline'
  /** Row text and spacing density. Defaults to `md`. */
  size?: 'micro' | 'sm' | 'md' | 'lg'
  /** Row corner radius. Defaults to `sm`. */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  /**
   * Rows span the tree's full width at every depth — equal boxes with aligned
   * edges — and the indent moves inside the row.
   */
  fullWidth?: boolean
  /** Draw indentation guide lines along nested groups. */
  guides?: boolean
  /** Typing jumps focus to the next row starting with the typed characters. Defaults to `true`. */
  typeahead?: boolean
  /** Accessible name for the tree. */
  'aria-label'?: string
}

const TYPEAHEAD_RESET_MS = 500

/** Depth-first ids of nodes currently visible (children of collapsed branches excluded). */
const visibleIds = (nodes: readonly TreeNode[], expandedSet: ReadonlySet<string>): string[] =>
  nodes.flatMap((node) => [
    node.id,
    ...(node.children !== undefined && expandedSet.has(node.id)
      ? visibleIds(node.children, expandedSet)
      : []),
  ])

const findParentId = (
  nodes: readonly TreeNode[],
  id: string,
  parent?: string,
): string | undefined => {
  for (const node of nodes) {
    if (node.id === id) {
      return parent
    }
    const found = node.children === undefined ? undefined : findParentId(node.children, id, node.id)
    if (found !== undefined) {
      return found
    }
  }
  return undefined
}

const findNode = (nodes: readonly TreeNode[], id: string): TreeNode | undefined => {
  for (const node of nodes) {
    if (node.id === id) {
      return node
    }
    const found = node.children === undefined ? undefined : findNode(node.children, id)
    if (found !== undefined) {
      return found
    }
  }
  return undefined
}

/** Sibling list containing `id` (the root list when `id` is top-level). */
const siblingsOf = (nodes: readonly TreeNode[], id: string): readonly TreeNode[] | undefined => {
  if (nodes.some((node) => node.id === id)) {
    return nodes
  }
  for (const node of nodes) {
    const found = node.children === undefined ? undefined : siblingsOf(node.children, id)
    if (found !== undefined) {
      return found
    }
  }
  return undefined
}

const textOf = (node: TreeNode): string =>
  node.textValue ?? (typeof node.label === 'string' ? node.label : '')

/**
 * WAI-ARIA tree: roving tabindex, Arrow-key navigation (Down/Up across visible
 * rows, Right expands / enters, Left collapses / exits), Home/End, Enter/Space
 * selection, `*` sibling expansion, and printable-character typeahead. In
 * `selectionMode="multiple"`, Ctrl/Cmd-click and Enter toggle, Shift+Arrows
 * extend, and Ctrl+A selects every visible row. Collapsed branches never
 * mount their children, so large trees stay cheap to render.
 */
export const Tree = /* @__PURE__ */ forwardRef<HTMLUListElement, TreeProps>(function Tree(
  {
    className,
    defaultExpanded = [],
    defaultSelected = [],
    expanded,
    fullWidth = false,
    guides = false,
    nodes,
    onExpandedChange,
    onSelectedChange,
    radius = 'sm',
    selected,
    selectionMode = 'single',
    size = 'md',
    typeahead = true,
    variant = 'ghost',
    ...props
  },
  ref,
) {
  const [internalExpanded, setInternalExpanded] = useState<readonly string[]>(defaultExpanded)
  const [internalSelected, setInternalSelected] = useState<readonly string[]>(defaultSelected)
  const expandedIds = new Set(expanded ?? internalExpanded)
  const selectedIds = new Set(selected ?? internalSelected)
  const [focusedId, setFocusedId] = useState<string | undefined>(undefined)
  const itemRefs = useRef(new Map<string, HTMLLIElement>())
  const typeaheadRef = useRef({ buffer: '', at: 0 })

  const styles = treeRecipe({ fullWidth, guides, radius, size, variant })

  const setExpanded = (next: Set<string>) => {
    setInternalExpanded([...next])
    onExpandedChange?.([...next])
  }

  const setSelected = (next: readonly string[]) => {
    setInternalSelected(next)
    onSelectedChange?.([...next])
  }

  const toggleExpanded = (id: string) => {
    const next = new Set(expandedIds)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    setExpanded(next)
  }

  /** Replace the selection (plain click / single mode), or toggle membership. */
  const select = (node: TreeNode, mode: 'replace' | 'toggle') => {
    if (node.disabled === true) {
      return
    }
    if (mode === 'replace' || selectionMode === 'single') {
      setSelected([node.id])
      return
    }
    setSelected(
      selectedIds.has(node.id)
        ? [...selectedIds].filter((id) => id !== node.id)
        : [...selectedIds, node.id],
    )
  }

  const focusItem = (id: string | undefined) => {
    if (id === undefined) {
      return
    }
    setFocusedId(id)
    itemRefs.current.get(id)?.focus()
  }

  const selectableIds = (ids: readonly string[]) =>
    ids.filter((id) => findNode(nodes, id)?.disabled !== true)

  const onTypeahead = (key: string, order: readonly string[], fromIndex: number) => {
    const now = Date.now()
    const state = typeaheadRef.current
    state.buffer = now - state.at > TYPEAHEAD_RESET_MS ? key : state.buffer + key
    state.at = now
    const query = state.buffer.toLowerCase()

    // Search after the focused row first, wrapping to the top.
    const rotated = [...order.slice(fromIndex + 1), ...order.slice(0, fromIndex + 1)]
    const hit = rotated.find((id) => {
      const node = findNode(nodes, id)
      return node !== undefined && textOf(node).toLowerCase().startsWith(query)
    })
    focusItem(hit)
    return hit !== undefined
  }

  const onItemKeyDown = (event: KeyboardEvent<HTMLLIElement>, node: TreeNode) => {
    const order = visibleIds(nodes, expandedIds)
    const index = order.indexOf(node.id)
    const isBranch = node.children !== undefined
    const isExpanded = isBranch && expandedIds.has(node.id)
    const multiple = selectionMode === 'multiple'

    if (multiple && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'a') {
      const all = selectableIds(order)
      setSelected(all.every((id) => selectedIds.has(id)) ? [] : all)
      event.preventDefault()
      event.stopPropagation()
      return
    }

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        const nextId = order[event.key === 'ArrowDown' ? index + 1 : index - 1]
        if (multiple && event.shiftKey && nextId !== undefined) {
          const next = findNode(nodes, nextId)
          if (next !== undefined) {
            select(next, 'toggle')
          }
        }
        focusItem(nextId)
        break
      }
      case 'ArrowRight':
        if (isBranch && !isExpanded) {
          toggleExpanded(node.id)
        } else if (isExpanded) {
          focusItem(node.children?.[0]?.id)
        }
        break
      case 'ArrowLeft':
        if (isExpanded) {
          toggleExpanded(node.id)
        } else {
          focusItem(findParentId(nodes, node.id))
        }
        break
      case 'Home':
        focusItem(order[0])
        break
      case 'End':
        focusItem(order.at(-1))
        break
      case 'Enter':
      case ' ':
        if (isBranch) {
          toggleExpanded(node.id)
        }
        select(node, multiple ? 'toggle' : 'replace')
        break
      // Expands every sibling branch at the same depth (WAI-ARIA APG).
      case '*': {
        const next = new Set(expandedIds)
        for (const sibling of siblingsOf(nodes, node.id) ?? []) {
          if (sibling.children !== undefined) {
            next.add(sibling.id)
          }
        }
        setExpanded(next)
        break
      }
      default: {
        if (
          typeahead &&
          event.key.length === 1 &&
          event.key !== ' ' &&
          !event.ctrlKey &&
          !event.metaKey &&
          !event.altKey &&
          onTypeahead(event.key, order, index)
        ) {
          break
        }
        return
      }
    }
    event.preventDefault()
    event.stopPropagation()
  }

  const onRowClick = (event: MouseEvent, node: TreeNode) => {
    event.stopPropagation()
    const isBranch = node.children !== undefined
    const toggleKey = event.ctrlKey || event.metaKey
    if (isBranch && !toggleKey) {
      toggleExpanded(node.id)
    }
    // Multiple mode toggles membership on any click (checkbox-tree behavior).
    select(node, selectionMode === 'multiple' ? 'toggle' : 'replace')
    focusItem(node.id)
  }

  // The first visible row is the initial tab stop.
  const order = visibleIds(nodes, expandedIds)
  const firstSelected = order.find((id) => selectedIds.has(id))
  const tabStopId = focusedId ?? firstSelected ?? order[0]

  const renderNodes = (level: readonly TreeNode[], depth: number): ReactNode =>
    level.map((node) => {
      const isBranch = node.children !== undefined
      const isExpanded = isBranch && expandedIds.has(node.id)

      return (
        <li
          key={node.id}
          ref={(element) => {
            if (element === null) {
              itemRefs.current.delete(node.id)
            } else {
              itemRefs.current.set(node.id, element)
            }
          }}
          role="treeitem"
          aria-expanded={isBranch ? isExpanded : undefined}
          aria-selected={selectedIds.has(node.id)}
          aria-disabled={node.disabled === true ? true : undefined}
          className={styles.branch}
          tabIndex={node.id === tabStopId ? 0 : -1}
          onFocus={(event) => {
            // Only the row itself, not bubbled child-focus.
            if (event.target === event.currentTarget) {
              setFocusedId(node.id)
            }
          }}
          onKeyDown={(event) => {
            if (event.target === event.currentTarget) {
              onItemKeyDown(event, node)
            }
          }}
        >
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- pointer affordance only; the keyboard interaction is on the treeitem li above */}
          <span
            className={styles.row}
            data-tree-row
            onClick={(event) => {
              onRowClick(event, node)
            }}
          >
            {isBranch ? (
              <span className={styles.indicator} aria-hidden="true">
                {/* Rendered size comes from the recipe's size variant. */}
                <ChevronRight size={14} strokeWidth={4} />
              </span>
            ) : null}
            <span className={styles.label}>{node.label}</span>
          </span>
          {isBranch && isExpanded ? (
            <ul
              role="group"
              className={styles.group}
              // Inherited by the group's rows: drives the fullWidth indent
              // calc and the depth-aware guide offset.
              style={{ '--tree-depth': depth + 1 } as CSSProperties}
            >
              {renderNodes(node.children ?? [], depth + 1)}
            </ul>
          ) : null}
        </li>
      )
    })

  return (
    <ul
      ref={ref}
      role="tree"
      aria-multiselectable={selectionMode === 'multiple' ? true : undefined}
      className={cx(styles.root, className)}
      {...props}
    >
      {renderNodes(nodes, 0)}
    </ul>
  )
})
