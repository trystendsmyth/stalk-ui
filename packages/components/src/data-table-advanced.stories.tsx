import { css } from 'styled-system/css'

import { DataTableAdvanced } from './data-table-advanced'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ColumnDef } from '@tanstack/react-table'

interface Member {
  name: string
  role: string
  team: string
  commits: number
}

const members: Member[] = Array.from({ length: 14 }, (_, i) => ({
  name: `Member ${String(i + 1)}`,
  role: i % 3 === 0 ? 'Owner' : 'Maintainer',
  team: ['Platform', 'Growth', 'Infra'][i % 3] ?? 'Platform',
  commits: (i * 37) % 200,
}))

const columns: ColumnDef<Member>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'role', header: 'Role' },
  { accessorKey: 'team', header: 'Team' },
  { accessorKey: 'commits', header: 'Commits' },
]

const meta = {
  title: 'Components/Data Display/Data Table Advanced',
  component: DataTableAdvanced<Member>,
  tags: ['autodocs', 'stable'],
  argTypes: {
    columns: { table: { disable: true } },
    data: { table: { disable: true } },
    renderSubRow: { table: { disable: true } },
  },
} satisfies Meta<typeof DataTableAdvanced<Member>>

export default meta

type Story = StoryObj<typeof meta>

export const Sortable: Story = {
  args: { columns, data: members, pageSize: 6 },
}

export const ExpandableRows: Story = {
  args: {
    columns,
    data: members,
    pageSize: 6,
    renderSubRow: (row) => (
      <div className={css({ color: 'fg.muted', py: '8' })}>
        Detail panel for <strong>{row.name}</strong> — {row.role} on {row.team}, {row.commits}{' '}
        commits.
      </div>
    ),
  },
}

export const StickyHeaderAndPinnedColumn: Story = {
  args: {
    columns,
    data: members,
    enablePagination: false,
    stickyHeader: true,
    maxHeight: 220,
    columnPinning: { left: ['name'] },
  },
}
