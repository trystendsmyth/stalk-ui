import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { cx } from 'styled-system/css'
import { dataTable as dataTableRecipe } from 'styled-system/recipes'

import { Button } from './button'
import { Table } from './table'

import type { ColumnDef, SortingState } from '@tanstack/react-table'

const styles = /* @__PURE__ */ dataTableRecipe()

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  /** Message shown when there are no rows. */
  emptyMessage?: string
  /** Rows per page; ignored when `enablePagination` is false. */
  pageSize?: number
  /** Render the Previous/Next pagination footer (default `true`). */
  enablePagination?: boolean
  className?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  emptyMessage = 'No results.',
  pageSize = 10,
  enablePagination = true,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    columns,
    data,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: { pagination: { pageSize } },
    ...(enablePagination ? { getPaginationRowModel: getPaginationRowModel() } : {}),
  })

  const rows = table.getRowModel().rows

  return (
    <div className={cx(styles.root, className)}>
      <Table.Root>
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sorted = header.column.getIsSorted()
                const ariaSort =
                  sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : undefined
                const SortIcon =
                  sorted === 'asc' ? ChevronUp : sorted === 'desc' ? ChevronDown : ChevronsUpDown

                return (
                  <Table.Head key={header.id} aria-sort={ariaSort}>
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
              <Table.Cell colSpan={columns.length} style={{ textAlign: 'center' }}>
                {emptyMessage}
              </Table.Cell>
            </Table.Row>
          ) : (
            rows.map((row) => (
              <Table.Row key={row.id} data-state={row.getIsSelected() ? 'selected' : undefined}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
      {enablePagination && table.getPageCount() > 1 ? (
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

DataTable.displayName = 'DataTable'
