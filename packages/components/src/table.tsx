import { createStyleContext } from '@stalk-ui/utils'
import { forwardRef, useMemo } from 'react'
import { cx } from 'styled-system/css'
import { table as tableRecipe } from 'styled-system/recipes'

import type { HTMLAttributes, TableHTMLAttributes } from 'react'

const { StyleProvider, withContext } = /* @__PURE__ */ createStyleContext(tableRecipe, {
  name: 'Table',
})

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
}

// The root renders a horizontal scroll container around the table so wide
// tables stay contained. The forwarded ref points at the <table> element.
export const TableRoot = /* @__PURE__ */ forwardRef<HTMLTableElement, TableRootProps>(
  function TableRoot({ className, containerProps, stickyHeader = false, ...props }, ref) {
    const styles = useMemo(() => tableRecipe({ stickyHeader }), [stickyHeader])
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

export const Table = /* @__PURE__ */ Object.assign(TableRoot, {
  Body: TableBody,
  Caption: TableCaption,
  Cell: TableCell,
  Footer: TableFooter,
  Head: TableHead,
  Header: TableHeader,
  Root: TableRoot,
  Row: TableRow,
})
