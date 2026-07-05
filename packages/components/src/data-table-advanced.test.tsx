import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
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

test('column visibility menu hides and restores columns', async () => {
  const user = userEvent.setup()
  render(<DataTableAdvanced columns={columns} data={data} enableColumnVisibility />)

  expect(screen.getByRole('columnheader', { name: 'Role' })).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: /Columns/ }))
  await user.click(await screen.findByRole('menuitemcheckbox', { name: 'Role' }))

  expect(screen.queryByRole('columnheader', { name: 'Role' })).not.toBeInTheDocument()
  expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument()
})

test('renders resize handles when column resizing is enabled', () => {
  const { container } = render(
    <DataTableAdvanced columns={columns} data={data} enableColumnResizing />,
  )

  expect(
    container.querySelectorAll('[class*="resizeHandle"], span[aria-hidden]').length,
  ).toBeGreaterThan(0)
  const header = screen.getByRole('columnheader', { name: 'Name' })
  expect(header.style.width).not.toBe('')
})

test('exports the current view as CSV', async () => {
  const user = userEvent.setup()
  const createObjectURL = vi.fn((_blob: Blob) => 'blob:fake')
  const revokeObjectURL = vi.fn()
  vi.stubGlobal('URL', Object.assign(URL, { createObjectURL, revokeObjectURL }))
  const clicked = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined)

  try {
    render(<DataTableAdvanced columns={columns} data={data} exportFileName="members.csv" />)
    await user.click(screen.getByRole('button', { name: 'Export CSV' }))

    expect(createObjectURL).toHaveBeenCalledTimes(1)
    const blob = createObjectURL.mock.calls[0]?.[0]
    if (blob === undefined) {
      throw new Error('createObjectURL not called with a blob')
    }
    expect(await blob.text()).toBe('Name,Role\nAda,Owner\nLinus,Maintainer')
    expect(clicked).toHaveBeenCalledTimes(1)
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:fake')
  } finally {
    clicked.mockRestore()
    vi.unstubAllGlobals()
  }
})
