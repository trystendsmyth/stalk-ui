import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { DataTable } from './data-table'

import type { ColumnDef } from '@tanstack/react-table'

interface Person {
  name: string
  age: number
}

const columns: ColumnDef<Person>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'age', header: 'Age' },
]

const data: Person[] = [
  { name: 'Charlie', age: 30 },
  { name: 'Alice', age: 10 },
  { name: 'Bob', age: 20 },
]

test('renders rows without axe violations', async () => {
  const { container } = render(<DataTable columns={columns} data={data} />)
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByText('Charlie')).toBeInTheDocument()
  expect(screen.getByRole('columnheader', { name: /Name/ })).toBeInTheDocument()
})

test('sorts rows when a sortable header is clicked', async () => {
  const user = userEvent.setup()
  render(<DataTable columns={columns} data={data} />)

  await user.click(screen.getByRole('button', { name: /Name/ }))

  const cells = screen.getAllByRole('cell')
  expect(cells[0]).toHaveTextContent('Alice')
})

test('shows the empty message when there is no data', () => {
  render(<DataTable columns={columns} data={[]} emptyMessage="Nothing here." />)

  expect(screen.getByText('Nothing here.')).toBeInTheDocument()
})
