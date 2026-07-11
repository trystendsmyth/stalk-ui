import { Inbox, SearchX } from 'lucide-react'

import { Button } from './button'
import { EmptyState } from './empty-state'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Display/Empty State',
  component: EmptyState.Root,
  tags: ['autodocs', 'stable'],
  argTypes: {
    className: { table: { disable: true } },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof EmptyState.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <EmptyState.Root {...args}>
      <EmptyState.Icon>
        <Inbox />
      </EmptyState.Icon>
      <EmptyState.Title>No devices found</EmptyState.Title>
      <EmptyState.Description>
        Nothing matches the current filters. Try widening the date range or clearing filters.
      </EmptyState.Description>
      <EmptyState.Actions>
        <Button size="sm">Clear filters</Button>
        <Button size="sm" variant="outline">
          Add device
        </Button>
      </EmptyState.Actions>
    </EmptyState.Root>
  ),
}

// size="sm" fits inline panels like a filtered-out table body.
export const Compact: Story = {
  args: { size: 'sm' },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <EmptyState.Root {...args}>
      <EmptyState.Icon>
        <SearchX />
      </EmptyState.Icon>
      <EmptyState.Title>No results</EmptyState.Title>
      <EmptyState.Description>Adjust the search and try again.</EmptyState.Description>
    </EmptyState.Root>
  ),
}
