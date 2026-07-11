import { useState } from 'react'
import { fn } from 'storybook/test'
import { css } from 'styled-system/css'
import { VStack } from 'styled-system/jsx'

import { Slider } from './slider'

import type { Meta, StoryObj } from '@storybook/react-vite'

const frame = css({ width: '320px' })

const meta = {
  title: 'Components/Selection/Slider',
  component: Slider,
  tags: ['autodocs', 'stable'],
  args: {
    'aria-label': 'Volume',
    defaultValue: [40],
    disabled: false,
    max: 100,
    min: 0,
    onValueChange: fn(),
    onValueCommit: fn(),
    step: 1,
  },
  argTypes: {
    'aria-label': { control: 'text' },
    disabled: { control: 'boolean' },
    max: { control: { type: 'number' } },
    min: { control: { type: 'number' } },
    step: { control: { type: 'number', min: 1 } },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    shape: { control: 'inline-radio', options: ['linear', 'circular'] },
    showValue: { control: 'boolean' },
    className: { table: { disable: true } },
    formatValue: { table: { disable: true } },
    name: { table: { disable: true } },
    thumbLabels: { table: { disable: true } },
    value: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    onValueCommit: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div className={frame}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Range: Story = {
  args: {
    'aria-label': 'Price range',
    defaultValue: [20, 80],
    thumbLabels: ['Minimum price', 'Maximum price'],
  },
}

export const Controlled: Story = {
  parameters: { controls: { disable: true } },
  render: function Render({ defaultValue: _defaultValue, value: _value, ...args }) {
    const [value, setValue] = useState([35])
    return (
      <VStack alignItems="stretch" gap="8">
        <Slider
          {...args}
          aria-label="Brightness"
          value={value}
          onValueChange={(next) => {
            setValue(next)
            args.onValueChange?.(next)
          }}
        />
        <span>Value: {value.join(', ')}</span>
      </VStack>
    )
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: [60],
  },
}

export const Circular: Story = {
  args: {
    'aria-label': 'Target output',
    defaultValue: [65],
    shape: 'circular',
    showValue: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          '`shape="circular"` renders a rotary knob (270° arc, single value): drag around the dial or use Arrow/Page/Home/End keys. `showValue` centers the read-out; `formatValue` formats it.',
      },
    },
  },
  render: function Render({ defaultValue, ...args }) {
    const [value, setValue] = useState(defaultValue ?? [65])
    return (
      <Slider
        {...args}
        formatValue={(current) => `${String(current)}%`}
        value={value}
        onValueChange={(next) => {
          setValue(next)
          args.onValueChange?.(next)
        }}
      />
    )
  },
}
