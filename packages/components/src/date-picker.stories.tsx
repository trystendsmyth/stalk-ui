import { useState } from 'react'
import { fn } from 'storybook/test'

import { DatePicker } from './date-picker'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Forms/Date Picker',
  component: DatePicker,
  tags: ['autodocs', 'stable'],
  args: {
    calendarLabel: 'Open calendar',
    disabled: false,
    invalid: false,
    locale: 'en-US',
    onChange: fn(),
    size: 'md',
    'aria-label': 'Event date',
  },
  argTypes: {
    'aria-label': { control: 'text' },
    calendarLabel: { control: 'text' },
    className: { table: { disable: true } },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    locale: { control: 'text' },
    onChange: { table: { disable: true } },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    value: { table: { disable: true } },
  },
  render: (args) => {
    const [date, setDate] = useState<Date>()
    return (
      <div style={{ maxWidth: '16rem' }}>
        <DatePicker
          {...args}
          value={date}
          onChange={(next) => {
            setDate(next)
            args.onChange?.(next)
          }}
        />
      </div>
    )
  },
} satisfies Meta<typeof DatePicker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
