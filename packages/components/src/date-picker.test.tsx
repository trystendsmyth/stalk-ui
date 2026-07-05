import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { DatePicker } from './date-picker'

import type { DateRange } from './date-picker'

const ControlledDatePicker = ({ onChange }: { onChange?: (date: Date | undefined) => void }) => {
  const [date, setDate] = useState<Date>()
  return (
    <DatePicker
      aria-label="Event date"
      locale="en-US"
      value={date}
      onChange={(next) => {
        setDate(next)
        onChange?.(next)
      }}
    />
  )
}

test('renders the field and calendar trigger without axe violations', async () => {
  const { container } = render(<ControlledDatePicker />)
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('group', { name: 'Event date' })).toBeInTheDocument()
  expect(screen.getByLabelText('Month')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Open calendar' })).toBeInTheDocument()
})

test('updates the segments when a calendar day is selected', async () => {
  const user = userEvent.setup()
  const onChange = vi.fn<(date: Date | undefined) => void>()
  render(<ControlledDatePicker onChange={onChange} />)

  await user.click(screen.getByRole('button', { name: 'Open calendar' }))
  await user.click(await screen.findByText('15'))

  expect(onChange.mock.lastCall?.[0]?.getDate()).toBe(15)
  expect(screen.getByLabelText<HTMLInputElement>('Day').value).toBe('15')
})

test('parses a typed date', async () => {
  const user = userEvent.setup()
  const onChange = vi.fn<(date: Date | undefined) => void>()
  render(<ControlledDatePicker onChange={onChange} />)

  await user.click(screen.getByLabelText('Month'))
  await user.keyboard('12252023')

  const parsed = onChange.mock.lastCall?.[0]
  expect(parsed?.getFullYear()).toBe(2023)
  expect(parsed?.getMonth()).toBe(11)
})

const RANGE_START = new Date(2024, 5, 3)
const RANGE_END = new Date(2024, 5, 9)

test('range mode renders a formatted range field and opens a range calendar', async () => {
  const user = userEvent.setup()
  const { container } = render(
    <DatePicker
      aria-label="Report window"
      mode="range"
      value={{ from: RANGE_START, to: RANGE_END }}
      onChange={() => undefined}
    />,
  )
  const field = screen.getByRole('button', { name: 'Report window' })

  expect(field.textContent).toContain('Jun 3')
  expect(field.textContent).toContain('Jun 9')
  expect((await axe(container)).violations).toHaveLength(0)

  await user.click(field)
  // Two side-by-side months by default.
  expect(await screen.findAllByRole('grid')).toHaveLength(2)
})

test('range presets apply their range and close the popover', async () => {
  const user = userEvent.setup()
  const onChange = vi.fn<(range: DateRange | undefined) => void>()
  render(
    <DatePicker
      aria-label="Report window"
      mode="range"
      presets={[{ label: 'Last 7 days', range: { from: RANGE_START, to: RANGE_END } }]}
      onChange={onChange}
    />,
  )

  await user.click(screen.getByRole('button', { name: 'Report window' }))
  await user.click(await screen.findByRole('button', { name: 'Last 7 days' }))

  expect(onChange).toHaveBeenCalledWith({ from: RANGE_START, to: RANGE_END })
  expect(screen.queryByRole('button', { name: 'Last 7 days' })).not.toBeInTheDocument()
})
