import { Badge } from './badge'
import { DataTable } from './data-table'

import type { DataTableProps } from './data-table'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ColumnDef } from '@tanstack/react-table'

interface Invoice {
  invoice: string
  status: 'paid' | 'pending' | 'overdue'
  amount: number
}

const columns: ColumnDef<Invoice>[] = [
  { accessorKey: 'invoice', header: 'Invoice' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue<Invoice['status']>()
      const tone = status === 'paid' ? 'success' : status === 'overdue' ? 'danger' : 'warning'
      return <Badge tone={tone}>{status}</Badge>
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ getValue }) => `$${getValue<number>().toFixed(2)}`,
  },
]

const data: Invoice[] = [
  { invoice: 'INV-001', status: 'paid', amount: 250 },
  { invoice: 'INV-002', status: 'pending', amount: 150 },
  { invoice: 'INV-003', status: 'overdue', amount: 350 },
  { invoice: 'INV-004', status: 'paid', amount: 450 },
]

type InvoiceTableProps = Pick<
  DataTableProps<Invoice, unknown>,
  'emptyMessage' | 'enablePagination' | 'pageSize'
>

// Demo wrapper: `columns`/`data` are fixed (they can't be Storybook controls),
// but the simple display props remain controllable.
const InvoiceTable = (props: InvoiceTableProps) => (
  <DataTable columns={columns} data={data} {...props} />
)

const meta = {
  title: 'Components/Tables & Lists/Data Table',
  component: InvoiceTable,
  tags: ['autodocs', 'stable'],
  args: {
    emptyMessage: 'No results.',
    enablePagination: true,
    pageSize: 10,
  },
  argTypes: {
    emptyMessage: { control: 'text' },
    enablePagination: { control: 'boolean' },
    pageSize: { control: 'number' },
  },
} satisfies Meta<typeof InvoiceTable>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
