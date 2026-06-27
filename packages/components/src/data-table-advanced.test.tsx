import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { DataTableAdvanced } from './data-table-advanced'

import type { ColumnDef } from '@tanstack/react-table'

interface Row {
  name: string
  role: string
}

const data: Row[] = [
  { name: 'Ada', role: 'Owner' },
  { name: 'Linus', role: 'Maintainer' },
]

const columns: ColumnDef<Row>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'role', header: 'Role' },
]

test('renders an accessible sortable table', async () => {
  const { container } = render(<DataTableAdvanced columns={columns} data={data} />)

  expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument()
  expect(screen.getByRole('cell', { name: 'Ada' })).toBeInTheDocument()
  expect((await axe(container)).violations).toHaveLength(0)
})

test('toggles sort direction via the header button', async () => {
  const user = userEvent.setup()
  render(<DataTableAdvanced columns={columns} data={data} />)

  const header = screen.getByRole('columnheader', { name: 'Name' })
  expect(header).not.toHaveAttribute('aria-sort')
  await user.click(within(header).getByRole('button', { name: 'Name' }))
  expect(header).toHaveAttribute('aria-sort', 'ascending')
})

test('expands a detail panel when renderSubRow is provided', async () => {
  const user = userEvent.setup()
  render(
    <DataTableAdvanced
      columns={columns}
      data={[{ name: 'Ada', role: 'Owner' }]}
      renderSubRow={(row) => <span>Details for {row.name}</span>}
    />,
  )

  expect(screen.queryByText('Details for Ada')).not.toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Toggle row details' }))
  expect(screen.getByText('Details for Ada')).toBeInTheDocument()
})

test('freezes a pinned column via data-pinned', () => {
  render(<DataTableAdvanced columns={columns} data={data} columnPinning={{ left: ['name'] }} />)

  expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveAttribute('data-pinned', 'start')
  expect(screen.getByRole('cell', { name: 'Ada' })).toHaveAttribute('data-pinned', 'start')
})
