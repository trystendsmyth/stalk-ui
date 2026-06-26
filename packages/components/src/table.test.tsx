import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Table } from './table'

const renderTable = () =>
  render(
    <Table.Root>
      <Table.Caption>Recent invoices.</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head scope="col">Invoice</Table.Head>
          <Table.Head scope="col">Amount</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>INV-001</Table.Cell>
          <Table.Cell>$250.00</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>,
  )

test('renders an accessible table without axe violations', async () => {
  const { container } = renderTable()
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('table', { name: 'Recent invoices.' })).toBeInTheDocument()
  expect(screen.getByRole('columnheader', { name: 'Invoice' })).toBeInTheDocument()
  expect(screen.getByRole('cell', { name: 'INV-001' })).toBeInTheDocument()
})

test('applies slot classes', () => {
  renderTable()

  expect(screen.getByRole('table')).toHaveClass('stalk-table__table')
  expect(screen.getByRole('columnheader', { name: 'Amount' })).toHaveClass('stalk-table__head')
  expect(screen.getByRole('cell', { name: '$250.00' })).toHaveClass('stalk-table__cell')
})

test('applies the sticky-header variant and forwards data-pinned to cells', async () => {
  const { container } = render(
    <Table.Root stickyHeader>
      <Table.Header>
        <Table.Row>
          <Table.Head scope="col" data-pinned="start">
            Name
          </Table.Head>
          <Table.Head scope="col">Role</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell data-pinned="start">Ada</Table.Cell>
          <Table.Cell>Owner</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>,
  )

  expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveClass(
    'stalk-table__head--stickyHeader_true',
  )
  expect(screen.getByRole('cell', { name: 'Ada' })).toHaveAttribute('data-pinned', 'start')
  expect((await axe(container)).violations).toHaveLength(0)
})

test('throws when subcomponents render outside the root', () => {
  expect(() =>
    render(
      <table>
        <Table.Body>
          <tr>
            <td>Detached</td>
          </tr>
        </Table.Body>
      </table>,
    ),
  ).toThrow(/must be rendered inside <TableRoot>/)
})
