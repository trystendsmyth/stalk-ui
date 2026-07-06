import { useState } from 'react'
import { fn } from 'storybook/test'

import { DatePicker } from './date-picker'

import type { DatePickerSingleProps, DateRange } from './date-picker'
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
    const single = args as DatePickerSingleProps
    const [date, setDate] = useState<Date>()
    return (
      <div style={{ maxWidth: '16rem' }}>
        <DatePicker
          {...single}
          value={date}
          onChange={(next) => {
            setDate(next)
            single.onChange?.(next)
          }}
        />
      </div>
    )
  },
} satisfies Meta<typeof DatePicker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

// mode="range": a formatted range field opening a two-month range calendar,
// with optional quick-range presets ("Last 7 days") in a rail beside it.
export const Range: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(2024, 5, 3),
      to: new Date(2024, 5, 9),
    })
    const day = (offset: number) => {
      const date = new Date(2024, 5, 20)
      date.setDate(date.getDate() + offset)
      return date
    }
    return (
      <div style={{ maxWidth: '20rem' }}>
        <DatePicker
          aria-label="Report window"
          mode="range"
          presets={[
            { label: 'Last 7 days', range: { from: day(-6), to: day(0) } },
            { label: 'Last 30 days', range: { from: day(-29), to: day(0) } },
            { label: 'Month to date', range: { from: new Date(2024, 5, 1), to: day(0) } },
          ]}
          value={range}
          onChange={setRange}
        />
      </div>
    )
  },
}
