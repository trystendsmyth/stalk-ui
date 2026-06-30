import { createStyleContext } from '@stalk-ui/utils'
import { createContext, forwardRef, useContext, useId, useMemo, useState } from 'react'
import { cx } from 'styled-system/css'
import { table as tableRecipe } from 'styled-system/recipes'

import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, TableHTMLAttributes } from 'react'

const { StyleProvider, useSlotStyles, withContext } = /* @__PURE__ */ createStyleContext(
  tableRecipe,
  { name: 'Table' },
)

export type TableRootProps = TableHTMLAttributes<HTMLTableElement> & {
  /** Props applied to the scroll container wrapping the `<table>`. */
  containerProps?: HTMLAttributes<HTMLDivElement>
  /**
   * Keep the header rows pinned while the body scrolls. Pair with a max-height +
   * `overflowY: 'auto'` on `containerProps` to get the vertical scroll region.
   * Freeze individual columns by setting `data-pinned="start" | "end"` on the
   * matching `Table.Head` / `Table.Cell`.
   */
  stickyHeader?: boolean
  /** Keep the footer rows pinned to the bottom while the body scrolls (mirror of
   *  `stickyHeader`; same `containerProps` scroll requirement). */
  stickyFooter?: boolean
}

// The root renders a horizontal scroll container around the table so wide
// tables stay contained. The forwarded ref points at the <table> element.
export const TableRoot = /* @__PURE__ */ forwardRef<HTMLTableElement, TableRootProps>(
  function TableRoot(
    { className, containerProps, stickyHeader = false, stickyFooter = false, ...props },
    ref,
  ) {
    const styles = useMemo(
      () => tableRecipe({ stickyHeader, stickyFooter }),
      [stickyHeader, stickyFooter],
    )
    const { className: containerClassName, ...restContainer } = containerProps ?? {}

    return (
      <StyleProvider value={styles}>
        <div className={cx(styles.root, containerClassName)} {...restContainer}>
          <table ref={ref} className={cx(styles.table, className)} {...props} />
        </div>
      </StyleProvider>
    )
  },
)

export const TableHeader = /* @__PURE__ */ withContext('thead', 'header')
export const TableBody = /* @__PURE__ */ withContext('tbody', 'body')
export const TableFooter = /* @__PURE__ */ withContext('tfoot', 'footer')
export const TableRow = /* @__PURE__ */ withContext('tr', 'row')
export const TableHead = /* @__PURE__ */ withContext('th', 'head')
export const TableCell = /* @__PURE__ */ withContext('td', 'cell')
export const TableCaption = /* @__PURE__ */ withContext('caption', 'caption')

interface ExpandContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  contentId: string
}

const ExpandContext = /* @__PURE__ */ createContext<ExpandContextValue | null>(null)

const ExpandChevron = () => (
  <svg
    aria-hidden="true"
    fill="none"
    height="14"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="14"
  >
    <path d="m9 6 6 6-6 6" />
  </svg>
)

export interface TableExpandableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Detail content revealed below the row, in a cell spanning `colSpan` columns. */
  detail: ReactNode
  /** Number of columns the detail cell spans. */
  colSpan: number
  /** Controlled open state. */
  open?: boolean
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean
  /** Called when the open state changes. */
  onOpenChange?: (open: boolean) => void
}

/**
 * A table row that discloses a detail region below it. Place a `Table.ExpandTrigger`
 * in one of its cells; the detail row carries a matching `id`/`aria-controls` and
 * stays in the DOM (hidden) when collapsed.
 */
export const TableExpandableRow = /* @__PURE__ */ forwardRef<
  HTMLTableRowElement,
  TableExpandableRowProps
>(function TableExpandableRow(
  { detail, colSpan, open, defaultOpen = false, onOpenChange, className, children, ...props },
  ref,
) {
  const styles = useSlotStyles()
  const contentId = useId()
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen
  const setOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next)
    onOpenChange?.(next)
  }

  return (
    <ExpandContext.Provider value={{ open: isOpen, setOpen, contentId }}>
      <tr
        ref={ref}
        className={cx(styles.row, className)}
        data-state={isOpen ? 'open' : 'closed'}
        {...props}
      >
        {children}
      </tr>
      <tr hidden={!isOpen}>
        <td className={styles.expandedCell} colSpan={colSpan} id={contentId}>
          {detail}
        </td>
      </tr>
    </ExpandContext.Provider>
  )
})

export interface TableExpandTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible label for the toggle. Default `"Toggle row details"`. */
  label?: string
}

/** Disclosure toggle for a `Table.ExpandableRow` (renders a rotating chevron by default). */
export const TableExpandTrigger = /* @__PURE__ */ forwardRef<
  HTMLButtonElement,
  TableExpandTriggerProps
>(function TableExpandTrigger(
  { className, label = 'Toggle row details', children, onClick, ...props },
  ref,
) {
  const styles = useSlotStyles()
  const context = useContext(ExpandContext)
  if (context === null) {
    throw new Error('Table.ExpandTrigger must be rendered inside Table.ExpandableRow.')
  }
  return (
    <button
      ref={ref}
      aria-controls={context.contentId}
      aria-expanded={context.open}
      aria-label={label}
      className={cx(styles.expandTrigger, className)}
      onClick={(event) => {
        context.setOpen(!context.open)
        onClick?.(event)
      }}
      type="button"
      {...props}
    >
      {children ?? <ExpandChevron />}
    </button>
  )
})

export const Table = /* @__PURE__ */ Object.assign(TableRoot, {
  Body: TableBody,
  Caption: TableCaption,
  Cell: TableCell,
  ExpandableRow: TableExpandableRow,
  ExpandTrigger: TableExpandTrigger,
  Footer: TableFooter,
  Head: TableHead,
  Header: TableHeader,
  Root: TableRoot,
  Row: TableRow,
})
