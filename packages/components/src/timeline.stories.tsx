import { Timeline } from './timeline'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Data Display/Timeline',
  component: Timeline.Root,
  tags: ['autodocs', 'stable'],
  argTypes: {
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Timeline.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Timeline.Root aria-label="Deployment activity" {...args} style={{ maxWidth: '24rem' }}>
      <Timeline.Item tone="success">
        <Timeline.Content>
          <Timeline.Time dateTime="2026-07-03T14:10">Today, 14:10</Timeline.Time>
          <Timeline.Title>Deploy finished</Timeline.Title>
          <Timeline.Description>Build #424 promoted to production.</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Content>
          <Timeline.Time dateTime="2026-07-03T13:58">Today, 13:58</Timeline.Time>
          <Timeline.Title>Review approved</Timeline.Title>
          <Timeline.Description>2 approvals, checks green.</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item tone="danger">
        <Timeline.Content>
          <Timeline.Time dateTime="2026-07-03T11:02">Today, 11:02</Timeline.Time>
          <Timeline.Title>Alert raised</Timeline.Title>
          <Timeline.Description>Inverter 12 stopped reporting.</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline.Root>
  ),
}
