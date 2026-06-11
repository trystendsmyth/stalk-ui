import { useState } from 'react'
import { fn } from 'storybook/test'

import { TimePicker } from './time-picker'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Forms/Time Picker',
  component: TimePicker,
  tags: ['autodocs', 'stable'],
  args: {
    disabled: false,
    hourCycle: '12',
    hourLabel: 'Hours',
    minuteLabel: 'Minutes',
    minuteStep: 5,
    onChange: fn(),
    periodLabel: 'AM/PM',
    size: 'md',
  },
  argTypes: {
    className: { table: { disable: true } },
    disabled: { control: 'boolean' },
    hourCycle: { control: 'inline-radio', options: ['12', '24'] },
    hourLabel: { control: 'text' },
    minuteLabel: { control: 'text' },
    minuteStep: { control: { type: 'number', min: 1, max: 30 } },
    onChange: { table: { disable: true } },
    periodLabel: { control: 'text' },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <TimePicker
        {...args}
        value={value}
        onChange={(next) => {
          setValue(next)
          args.onChange?.(next)
        }}
      />
    )
  },
} satisfies Meta<typeof TimePicker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
