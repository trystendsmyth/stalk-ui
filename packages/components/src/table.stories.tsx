import { VisuallyHidden } from 'styled-system/jsx'

import { Badge } from './badge'
import { Table } from './table'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Data Display/Table',
  component: Table.Root,
  tags: ['autodocs', 'stable'],
  argTypes: {
    children: { table: { disable: true } },
    className: { table: { disable: true } },
    containerProps: { table: { disable: true } },
  },
  parameters: { controls: { disable: true } },
} satisfies Meta<typeof Table.Root>

export default meta

type Story = StoryObj<typeof meta>

const invoices = [
  { invoice: 'INV-001', status: 'Paid', method: 'Card', amount: '$250.00' },
  { invoice: 'INV-002', status: 'Pending', method: 'Transfer', amount: '$150.00' },
  { invoice: 'INV-003', status: 'Paid', method: 'Card', amount: '$350.00' },
]

export const Default: Story = {
  render: () => (
    <Table.Root>
      <Table.Caption>Recent invoices.</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head scope="col">Invoice</Table.Head>
          <Table.Head scope="col">Status</Table.Head>
          <Table.Head scope="col">Method</Table.Head>
          <Table.Head scope="col">Amount</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {invoices.map((row) => (
          <Table.Row key={row.invoice}>
            <Table.Cell>{row.invoice}</Table.Cell>
            <Table.Cell>
              <Badge tone={row.status === 'Paid' ? 'success' : 'warning'} variant="subtle">
                {row.status}
              </Badge>
            </Table.Cell>
            <Table.Cell>{row.method}</Table.Cell>
            <Table.Cell>{row.amount}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell colSpan={3}>Total</Table.Cell>
          <Table.Cell>$750.00</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table.Root>
  ),
}

export const Selectable: Story = {
  render: () => (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head scope="col">Name</Table.Head>
          <Table.Head scope="col">Role</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row data-state="selected">
          <Table.Cell>Ada Lovelace</Table.Cell>
          <Table.Cell>Owner</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Linus Torvalds</Table.Cell>
          <Table.Cell>Maintainer</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  ),
}

export const StickyHeaderAndPinnedColumn: Story = {
  render: () => (
    <Table.Root stickyHeader containerProps={{ style: { maxHeight: 180 } }}>
      <Table.Header>
        <Table.Row>
          <Table.Head scope="col" data-pinned="start">
            Name
          </Table.Head>
          <Table.Head scope="col">Role</Table.Head>
          <Table.Head scope="col">Team</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Array.from({ length: 12 }, (_, i) => (
          <Table.Row key={i}>
            <Table.Cell data-pinned="start">Member {i + 1}</Table.Cell>
            <Table.Cell>Maintainer</Table.Cell>
            <Table.Cell>Platform</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  ),
}

export const ExpandableRows: Story = {
  render: () => (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head scope="col">
            <VisuallyHidden>Toggle details</VisuallyHidden>
          </Table.Head>
          <Table.Head scope="col">Invoice</Table.Head>
          <Table.Head scope="col">Status</Table.Head>
          <Table.Head scope="col">Amount</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {invoices.map((row) => (
          <Table.ExpandableRow
            key={row.invoice}
            colSpan={4}
            detail={`${row.invoice} — settled via ${row.method}.`}
          >
            <Table.Cell>
              <Table.ExpandTrigger label={`Toggle ${row.invoice} details`} />
            </Table.Cell>
            <Table.Cell>{row.invoice}</Table.Cell>
            <Table.Cell>
              <Badge tone={row.status === 'Paid' ? 'success' : 'warning'} variant="subtle">
                {row.status}
              </Badge>
            </Table.Cell>
            <Table.Cell>{row.amount}</Table.Cell>
          </Table.ExpandableRow>
        ))}
      </Table.Body>
    </Table.Root>
  ),
}

export const StickyFooter: Story = {
  render: () => (
    <Table.Root containerProps={{ style: { maxHeight: 180 } }} stickyFooter>
      <Table.Header>
        <Table.Row>
          <Table.Head scope="col">Member</Table.Head>
          <Table.Head scope="col">Commits</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Array.from({ length: 12 }, (_, i) => (
          <Table.Row key={i}>
            <Table.Cell>Member {i + 1}</Table.Cell>
            <Table.Cell>{(i + 1) * 7}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell>Total</Table.Cell>
          <Table.Cell>546</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table.Root>
  ),
}
