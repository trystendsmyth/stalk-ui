'use client'

/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role --
 * WAI-ARIA tree pattern: `treeitem` lives on the li (which carries the roving
 * tabindex and key handling) and child lists are `role=group`. */

import { ChevronRight } from 'lucide-react'
import { forwardRef, useRef, useState } from 'react'
import { cx } from 'styled-system/css'
import { treeView as treeViewRecipe } from 'styled-system/recipes'

import type { HTMLAttributes, KeyboardEvent, ReactNode } from 'react'

const styles = /* @__PURE__ */ treeViewRecipe()

export interface TreeNode {
  id: string
  label: ReactNode
  children?: readonly TreeNode[]
  disabled?: boolean
}

export interface TreeViewProps extends Omit<HTMLAttributes<HTMLUListElement>, 'onSelect'> {
  nodes: readonly TreeNode[]
  /** Expanded branch ids (controlled). */
  expanded?: readonly string[]
  defaultExpanded?: readonly string[]
  onExpandedChange?: (expanded: string[]) => void
  /** Selected node id (controlled). */
  selected?: string
  defaultSelected?: string
  onSelect?: (id: string) => void
  /** Accessible name for the tree. */
  'aria-label'?: string
}

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

/**
 * WAI-ARIA tree: roving tabindex, Arrow-key navigation (Down/Up across visible
 * rows, Right expands / enters, Left collapses / exits), Home/End, and
 * Enter/Space selection.
 */
export const TreeView = /* @__PURE__ */ forwardRef<HTMLUListElement, TreeViewProps>(
  function TreeView(
    {
      className,
      defaultExpanded = [],
      defaultSelected,
      expanded,
      nodes,
      onExpandedChange,
      onSelect,
      selected,
      ...props
    },
    ref,
  ) {
    const [internalExpanded, setInternalExpanded] = useState<readonly string[]>(defaultExpanded)
    const [internalSelected, setInternalSelected] = useState(defaultSelected)
    const expandedIds = new Set(expanded ?? internalExpanded)
    const selectedId = selected ?? internalSelected
    const [focusedId, setFocusedId] = useState<string | undefined>(undefined)
    const itemRefs = useRef(new Map<string, HTMLLIElement>())

    const setExpanded = (next: Set<string>) => {
      setInternalExpanded([...next])
      onExpandedChange?.([...next])
    }

    const toggle = (id: string) => {
      const next = new Set(expandedIds)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      setExpanded(next)
    }

    const select = (node: TreeNode) => {
      if (node.disabled === true) {
        return
      }
      setInternalSelected(node.id)
      onSelect?.(node.id)
    }

    const focusItem = (id: string | undefined) => {
      if (id === undefined) {
        return
      }
      setFocusedId(id)
      itemRefs.current.get(id)?.focus()
    }

    const onItemKeyDown = (event: KeyboardEvent<HTMLLIElement>, node: TreeNode) => {
      const order = visibleIds(nodes, expandedIds)
      const index = order.indexOf(node.id)
      const isBranch = node.children !== undefined
      const isExpanded = isBranch && expandedIds.has(node.id)

      switch (event.key) {
        case 'ArrowDown':
          focusItem(order[index + 1])
          break
        case 'ArrowUp':
          focusItem(order[index - 1])
          break
        case 'ArrowRight':
          if (isBranch && !isExpanded) {
            toggle(node.id)
          } else if (isExpanded) {
            focusItem(node.children?.[0]?.id)
          }
          break
        case 'ArrowLeft':
          if (isExpanded) {
            toggle(node.id)
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
            toggle(node.id)
          }
          select(node)
          break
        default:
          return
      }
      event.preventDefault()
      event.stopPropagation()
    }

    // The first visible row is the initial tab stop.
    const firstId = visibleIds(nodes, expandedIds)[0]
    const tabStopId =
      focusedId ?? (selectedId !== undefined && findNode(nodes, selectedId) ? selectedId : firstId)

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
            aria-selected={selectedId === node.id}
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
                event.stopPropagation()
                if (isBranch) {
                  toggle(node.id)
                }
                select(node)
                focusItem(node.id)
              }}
            >
              {isBranch ? (
                <span className={styles.indicator} aria-hidden="true">
                  <ChevronRight size={14} />
                </span>
              ) : null}
              <span className={styles.label}>{node.label}</span>
            </span>
            {isBranch && isExpanded ? (
              <ul role="group" className={styles.group}>
                {renderNodes(node.children ?? [], depth + 1)}
              </ul>
            ) : null}
          </li>
        )
      })

    return (
      <ul ref={ref} role="tree" className={cx(styles.root, className)} {...props}>
        {renderNodes(nodes, 0)}
      </ul>
    )
  },
)
