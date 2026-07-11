import { Timeline } from './timeline'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Display/Timeline',
  component: Timeline.Root,
  tags: ['autodocs', 'stable'],
  args: { orientation: 'vertical' },
  argTypes: {
    className: { table: { disable: true } },
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
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
          <Timeline.Description>Instance 12 stopped reporting.</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline.Root>
  ),
}

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  parameters: {
    docs: {
      description: {
        story:
          '`orientation="horizontal"` spreads items along a row — each rail runs from its dot toward the next item, with the content stacked underneath.',
      },
    },
  },
  render: (args) => (
    <Timeline.Root aria-label="Order progress" {...args}>
      <Timeline.Item tone="success">
        <Timeline.Content>
          <Timeline.Time dateTime="2026-07-01">Jul 1</Timeline.Time>
          <Timeline.Title>Ordered</Timeline.Title>
          <Timeline.Description>Payment confirmed.</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item tone="success">
        <Timeline.Content>
          <Timeline.Time dateTime="2026-07-02">Jul 2</Timeline.Time>
          <Timeline.Title>Shipped</Timeline.Title>
          <Timeline.Description>Left the warehouse.</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Content>
          <Timeline.Time dateTime="2026-07-05">Jul 5</Timeline.Time>
          <Timeline.Title>Out for delivery</Timeline.Title>
          <Timeline.Description>Arriving today.</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline.Root>
  ),
}
