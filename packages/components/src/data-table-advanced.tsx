'use client'

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronDown, ChevronRight, ChevronsUpDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { cx } from 'styled-system/css'
import { dataTable as dataTableRecipe } from 'styled-system/recipes'

import { Button } from './button'
import { Table } from './table'

import type {
  Column,
  ColumnDef,
  ColumnPinningState,
  Row,
  SortingState,
  Table as TanStackTable,
} from '@tanstack/react-table'
import type { ReactNode } from 'react'

const styles = /* @__PURE__ */ dataTableRecipe()

/** `data-pinned` props for a column — empty when the column isn't frozen. */
const pinnedProps = <TData,>(column: Column<TData>): { 'data-pinned'?: 'start' | 'end' } => {
  const pinned = column.getIsPinned()
  if (pinned === 'left') return { 'data-pinned': 'start' }
  if (pinned === 'right') return { 'data-pinned': 'end' }
  return {}
}

export interface UseDataTableOptions<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  /** Rows per page; ignored when `enablePagination` is false. */
  pageSize?: number
  /** Render the Previous/Next pagination footer (default `true`). */
  enablePagination?: boolean
  /** Allow column sorting (default `true`). */
  enableSorting?: boolean
  /** Initial frozen columns, e.g. `{ left: ['name'], right: ['actions'] }`. */
  columnPinning?: ColumnPinningState
  /** Stable row id; defaults to TanStack's index-based id. */
  getRowId?: (row: TData, index: number) => string
}

export interface UseDataTableResult<TData> {
  table: TanStackTable<TData>
  /** Spread onto `Table.Head` / `Table.Cell` to freeze a pinned column (WS-1 recipe). */
  getPinnedProps: (column: Column<TData>) => { 'data-pinned'?: 'start' | 'end' }
  /** Detail-panel expansion (independent of TanStack sub-rows). */
  expansion: {
    isExpanded: (rowId: string) => boolean
    toggle: (rowId: string) => void
  }
}

/**
 * Headless data-table state: TanStack core + sorting + pagination (the common
 * path, statically imported and tree-shakeable), plus column-pinning props and
 * detail-panel expansion. Compose it with `Table.*` for full layout control, or
 * use the batteries-included `DataTableAdvanced` below.
 */
export function useDataTable<TData>({
  columns,
  data,
  pageSize = 10,
  enablePagination = true,
  enableSorting = true,
  columnPinning,
  getRowId,
}: UseDataTableOptions<TData>): UseDataTableResult<TData> {
  const [sorting, setSorting] = useState<SortingState>([])
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const table = useReactTable<TData>({
    columns,
    data,
    state: { sorting },
    enableSorting,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: { pageSize },
      ...(columnPinning ? { columnPinning } : {}),
    },
    ...(enablePagination ? { getPaginationRowModel: getPaginationRowModel() } : {}),
    ...(getRowId ? { getRowId } : {}),
  })

  return {
    table,
    getPinnedProps: pinnedProps,
    expansion: {
      isExpanded: (rowId) => expanded[rowId] ?? false,
      toggle: (rowId) => {
        setExpanded((current) => ({ ...current, [rowId]: !(current[rowId] ?? false) }))
      },
    },
  }
}

export interface DataTableAdvancedProps<TData> extends UseDataTableOptions<TData> {
  /** Message shown when there are no rows. */
  emptyMessage?: string
  /** Keep the header pinned while the body scrolls (pairs with `maxHeight`). */
  stickyHeader?: boolean
  /** Max height of the scroll region, enabling vertical scroll for `stickyHeader`. */
  maxHeight?: number | string
  /** Render an expandable detail panel for a row; adds a leading expand toggle. */
  renderSubRow?: (row: TData) => ReactNode
  /** Accessible label for the expand toggle (i18n). Default `'Toggle row details'`. */
  expandLabel?: string
  className?: string
}

export function DataTableAdvanced<TData>({
  emptyMessage = 'No results.',
  stickyHeader = false,
  maxHeight,
  renderSubRow,
  expandLabel = 'Toggle row details',
  className,
  ...options
}: DataTableAdvancedProps<TData>) {
  const { table, getPinnedProps, expansion } = useDataTable(options)
  const rows = table.getRowModel().rows
  const leafCount = table.getAllLeafColumns().length
  const colSpan = leafCount + (renderSubRow ? 1 : 0)

  const renderExpandToggle = (row: Row<TData>) => (
    <Table.Cell>
      <Button
        size="sm"
        variant="ghost"
        aria-expanded={expansion.isExpanded(row.id)}
        aria-label={expandLabel}
        onClick={() => {
          expansion.toggle(row.id)
        }}
      >
        {expansion.isExpanded(row.id) ? (
          <ChevronDown size={16} aria-hidden />
        ) : (
          <ChevronRight size={16} aria-hidden />
        )}
      </Button>
    </Table.Cell>
  )

  return (
    <div className={cx(styles.root, className)}>
      <Table.Root
        stickyHeader={stickyHeader}
        {...(maxHeight === undefined ? {} : { containerProps: { style: { maxHeight } } })}
      >
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {renderSubRow ? <Table.Head aria-hidden /> : null}
              {headerGroup.headers.map((header) => {
                const sorted = header.column.getIsSorted()
                const ariaSort =
                  sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : undefined
                const SortIcon =
                  sorted === 'asc' ? ChevronUp : sorted === 'desc' ? ChevronDown : ChevronsUpDown

                return (
                  <Table.Head
                    key={header.id}
                    aria-sort={ariaSort}
                    {...getPinnedProps(header.column)}
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <button
                        type="button"
                        className={styles.sortButton}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <SortIcon size={14} aria-hidden />
                      </button>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </Table.Head>
                )
              })}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {rows.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={colSpan} style={{ textAlign: 'center' }}>
                {emptyMessage}
              </Table.Cell>
            </Table.Row>
          ) : (
            rows.map((row) => (
              <ExpandableRows
                key={row.id}
                row={row}
                colSpan={colSpan}
                getPinnedProps={getPinnedProps}
                renderSubRow={renderSubRow}
                expandToggle={renderSubRow ? renderExpandToggle(row) : null}
                isExpanded={expansion.isExpanded(row.id)}
              />
            ))
          )}
        </Table.Body>
      </Table.Root>
      {options.enablePagination !== false && table.getPageCount() > 1 ? (
        <div className={styles.pagination}>
          <span className={styles.pageInfo}>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <Button
            size="sm"
            variant="outline"
            disabled={!table.getCanPreviousPage()}
            onClick={() => {
              table.previousPage()
            }}
          >
            Previous
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={!table.getCanNextPage()}
            onClick={() => {
              table.nextPage()
            }}
          >
            Next
          </Button>
        </div>
      ) : null}
    </div>
  )
}

interface ExpandableRowsProps<TData> {
  row: Row<TData>
  colSpan: number
  getPinnedProps: (column: Column<TData>) => { 'data-pinned'?: 'start' | 'end' }
  renderSubRow: ((row: TData) => ReactNode) | undefined
  expandToggle: ReactNode
  isExpanded: boolean
}

function ExpandableRows<TData>({
  row,
  colSpan,
  getPinnedProps,
  renderSubRow,
  expandToggle,
  isExpanded,
}: ExpandableRowsProps<TData>) {
  return (
    <>
      <Table.Row data-state={row.getIsSelected() ? 'selected' : undefined}>
        {expandToggle}
        {row.getVisibleCells().map((cell) => (
          <Table.Cell key={cell.id} {...getPinnedProps(cell.column)}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </Table.Cell>
        ))}
      </Table.Row>
      {renderSubRow && isExpanded ? (
        <Table.Row>
          <Table.Cell colSpan={colSpan}>{renderSubRow(row.original)}</Table.Cell>
        </Table.Row>
      ) : null}
    </>
  )
}

DataTableAdvanced.displayName = 'DataTableAdvanced'
