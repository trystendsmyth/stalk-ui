import { useState } from 'react'
import { fn } from 'storybook/test'

import { DatetimeInput } from './datetime-input'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Date & Time/Datetime Input',
  component: DatetimeInput,
  tags: ['autodocs', 'stable'],
  args: {
    disabled: false,
    invalid: false,
    locale: 'en-US',
    mode: 'date',
    onChange: fn(),
    size: 'md',
    'aria-label': 'Date',
  },
  argTypes: {
    'aria-describedby': { table: { disable: true } },
    'aria-label': { control: 'text' },
    className: { table: { disable: true } },
    disabled: { control: 'boolean' },
    endSlot: { table: { disable: true } },
    id: { table: { disable: true } },
    invalid: { control: 'boolean' },
    locale: { control: 'text' },
    mode: { control: 'inline-radio', options: ['date', 'time', 'datetime'] },
    onChange: { table: { disable: true } },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    value: { table: { disable: true } },
  },
} satisfies Meta<typeof DatetimeInput>

export default meta

type Story = StoryObj<typeof meta>

const renderField: Story['render'] = (args) => {
  const [value, setValue] = useState<Date>()
  return (
    <div style={{ maxWidth: '16rem' }}>
      <DatetimeInput
        {...args}
        value={value}
        onChange={(next) => {
          setValue(next)
          args.onChange?.(next)
        }}
      />
    </div>
  )
}

export const DateOnly: Story = { name: 'Date', render: renderField }

export const Time: Story = {
  args: { mode: 'time', 'aria-label': 'Time' },
  render: renderField,
}

export const DateAndTime: Story = {
  args: { mode: 'datetime', 'aria-label': 'Date and time' },
  render: renderField,
}
