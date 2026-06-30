import { Sparkline } from './sparkline'
import { TONES } from './tones'

import type { Meta, StoryObj } from '@storybook/react-vite'

const series = [4, 6, 5, 8, 7, 9, 6, 10, 12, 9, 13, 11]

const meta = {
  title: 'Components/Data Display/Sparkline',
  component: Sparkline,
  tags: ['autodocs', 'stable'],
  args: {
    data: series,
    'aria-label': 'Revenue, last 12 weeks',
  },
  argTypes: {
    // Array / union props don't map to useful Storybook controls — demoed via stories.
    data: { table: { disable: true } },
    series: { table: { disable: true } },
    reference: { table: { disable: true } },
    area: { control: 'boolean' },
    showLastPoint: { control: 'boolean' },
    tone: { control: 'select', options: TONES },
    width: { control: { type: 'number', min: 40, step: 10 } },
    height: { control: { type: 'number', min: 16, step: 4 } },
    strokeWidth: { control: { type: 'number', min: 0.5, step: 0.5 } },
  },
} satisfies Meta<typeof Sparkline>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Area: Story = {
  args: { area: true, showLastPoint: true },
}

export const Tones: Story = {
  render: (args) => (
    <div style={{ alignItems: 'center', display: 'flex', gap: 16 }}>
      <Sparkline {...args} tone="success" area showLastPoint />
      <Sparkline {...args} tone="warning" area showLastPoint />
      <Sparkline {...args} tone="danger" area showLastPoint />
    </div>
  ),
}

export const ReferenceLine: Story = {
  args: { area: true, height: 48, reference: 8, showLastPoint: true, width: 160 },
}

export const ReferenceBand: Story = {
  args: { height: 48, reference: [6, 10], width: 160 },
}

export const MultiSeries: Story = {
  args: {
    'aria-label': 'Actual vs target, last 12 weeks',
    height: 48,
    series: [[6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 10]],
    width: 160,
  },
}
