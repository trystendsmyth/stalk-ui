import { useState } from 'react'
import { fn } from 'storybook/test'

import { Calendar } from './calendar'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { DateRange } from 'react-day-picker'

// `onSelect` is part of DayPicker's mode-discriminated union, so it cannot be
// supplied through the shared `meta.args` without narrowing the union. Keep a
// module-level spy that each story forwards to so the Actions panel still logs.
const onSelect = fn()

const meta = {
  title: 'Components/Forms/Calendar',
  component: Calendar,
  tags: ['autodocs', 'stable'],
  args: {
    captionLayout: 'label',
    fixedWeeks: false,
    numberOfMonths: 1,
    showOutsideDays: true,
    showWeekNumber: false,
    weekStartsOn: 0,
  },
  argTypes: {
    captionLayout: {
      control: 'select',
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
    },
    className: { table: { disable: true } },
    classNames: { table: { disable: true } },
    components: { table: { disable: true } },
    disabled: { table: { disable: true } },
    fixedWeeks: { control: 'boolean' },
    id: { table: { disable: true } },
    mode: { table: { disable: true } },
    numberOfMonths: { control: 'number' },
    onSelect: { table: { disable: true } },
    selected: { table: { disable: true } },
    showOutsideDays: { control: 'boolean' },
    showWeekNumber: { control: 'boolean' },
    style: { table: { disable: true } },
    weekStartsOn: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6] },
  },
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

export const Single: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<Date>()
    return (
      <Calendar
        {...args}
        mode="single"
        selected={selected}
        onSelect={(date, ...rest) => {
          setSelected(date)
          onSelect(date, ...rest)
        }}
      />
    )
  },
}

export const Range: Story = {
  args: { numberOfMonths: 2 },
  render: (args) => {
    const [range, setRange] = useState<DateRange>()
    return (
      <Calendar
        {...args}
        mode="range"
        selected={range}
        onSelect={(next, ...rest) => {
          setRange(next)
          onSelect(next, ...rest)
        }}
      />
    )
  },
}
