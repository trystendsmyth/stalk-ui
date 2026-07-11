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
  title: 'Components/Tables & Lists/Data Table Advanced',
  component: DataTableAdvanced<Member>,
  tags: ['autodocs', 'stable'],
  argTypes: {
    pageSize: { control: 'number' },
    // Data/render/config objects + handlers aren't editable as controls.
    columns: { table: { disable: true } },
    data: { table: { disable: true } },
    renderSubRow: { table: { disable: true } },
    columnPinning: { table: { disable: true } },
    maxHeight: { table: { disable: true } },
    getRowId: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof DataTableAdvanced<Member>>

export default meta

type Story = StoryObj<typeof meta>

// Toolbar affordances: a column-visibility menu, CSV export of the current
// view, and pointer column resizing — the MUI-X-tier table pillars.
export const ToolbarAndResizing: Story = {
  args: {
    columns,
    data: members,
    enableColumnResizing: true,
    enableColumnVisibility: true,
    exportFileName: 'members.csv',
    pageSize: 5,
  },
}

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

const manyMembers: Member[] = Array.from({ length: 5_000 }, (_, i) => ({
  name: `Member ${String(i + 1)}`,
  role: i % 3 === 0 ? 'Owner' : 'Maintainer',
  team: ['Platform', 'Growth', 'Infra'][i % 3] ?? 'Platform',
  commits: (i * 37) % 200,
}))

// 5,000 rows, only the visible window mounted. Pagination is replaced by scroll;
// sticky header and pinned columns keep working.
export const Virtualized: Story = {
  args: {
    columns,
    data: manyMembers,
    enableVirtualization: true,
    stickyHeader: true,
    maxHeight: 360,
    columnPinning: { left: ['name'] },
  },
}
