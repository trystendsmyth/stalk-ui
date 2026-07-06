import { HStack } from 'styled-system/jsx'

import { Card } from './card'
import { Sparkline } from './sparkline'
import { Stat } from './stat'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Data Display/Stat',
  component: Stat.Root,
  tags: ['autodocs', 'stable'],
  argTypes: {
    className: { table: { disable: true } },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Stat.Root>

export default meta

type Story = StoryObj<typeof meta>

const bandwidth = [312, 350, 341, 388, 402, 380, 412]

export const Default: Story = {
  render: (args) => (
    <Stat.Root {...args}>
      <Stat.Label>Storage used</Stat.Label>
      <Stat.Value>
        412 <Stat.Unit>GB</Stat.Unit>
      </Stat.Value>
      <Stat.Delta direction="up">+8.2% vs yesterday</Stat.Delta>
    </Stat.Root>
  ),
}

// The trend slot composes Sparkline for a KPI card — the Tremor-style pattern.
export const WithTrend: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Card.Root size="sm" style={{ maxWidth: '16rem' }}>
      <Card.Content>
        <Stat.Root>
          <Stat.Label>Bandwidth (7d)</Stat.Label>
          <Stat.Value>
            2,585 <Stat.Unit>GB</Stat.Unit>
          </Stat.Value>
          <Stat.Delta direction="up">+4.9%</Stat.Delta>
          <Stat.Trend>
            <Sparkline aria-label="Bandwidth trend" data={bandwidth} height={36} width={192} />
          </Stat.Trend>
        </Stat.Root>
      </Card.Content>
    </Card.Root>
  ),
}

export const Directions: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack gap="24" flexWrap="wrap">
      <Stat.Root>
        <Stat.Label>Availability</Stat.Label>
        <Stat.Value>99.2%</Stat.Value>
        <Stat.Delta direction="up">+0.3 pts</Stat.Delta>
      </Stat.Root>
      <Stat.Root>
        <Stat.Label>Open alerts</Stat.Label>
        <Stat.Value>17</Stat.Value>
        <Stat.Delta direction="down">-5 today</Stat.Delta>
      </Stat.Root>
      <Stat.Root>
        <Stat.Label>Devices</Stat.Label>
        <Stat.Value>63</Stat.Value>
        <Stat.Delta direction="flat">no change</Stat.Delta>
      </Stat.Root>
    </HStack>
  ),
}
