import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { DatePicker } from './date-picker'

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
