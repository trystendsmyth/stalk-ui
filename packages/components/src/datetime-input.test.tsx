import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { DatetimeInput } from './datetime-input'

import type { DatetimeInputMode } from './datetime-input'

const ControlledDatetimeInput = ({
  mode,
  onChange,
}: {
  mode?: DatetimeInputMode
  onChange?: (date: Date | undefined) => void
}) => {
  const [date, setDate] = useState<Date>()
  return (
    <DatetimeInput
      aria-label="When"
      locale="en-US"
      mode={mode}
      value={date}
      onChange={(next) => {
        setDate(next)
        onChange?.(next)
      }}
    />
  )
}

test('renders labelled segments without axe violations', async () => {
  const { container } = render(<ControlledDatetimeInput />)
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('group', { name: 'When' })).toBeInTheDocument()
  expect(screen.getByLabelText('Month')).toBeInTheDocument()
  expect(screen.getByLabelText('Day')).toBeInTheDocument()
  expect(screen.getByLabelText('Year')).toBeInTheDocument()
})

test('auto-advances between segments and parses the date', async () => {
  const user = userEvent.setup()
  const onChange = vi.fn<(date: Date | undefined) => void>()
  render(<ControlledDatetimeInput onChange={onChange} />)

  await user.click(screen.getByLabelText('Month'))
  await user.keyboard('12252023')

  // A two-digit month auto-advances to day, then to year.
  expect(screen.getByLabelText<HTMLInputElement>('Month').value).toBe('12')
  expect(screen.getByLabelText<HTMLInputElement>('Day').value).toBe('25')
  expect(screen.getByLabelText<HTMLInputElement>('Year').value).toBe('2023')

  const parsed = onChange.mock.lastCall?.[0]
  expect(parsed?.getMonth()).toBe(11)
  expect(parsed?.getDate()).toBe(25)
  expect(parsed?.getFullYear()).toBe(2023)
})

test('clamps an out-of-range segment', async () => {
  const user = userEvent.setup()
  render(<ControlledDatetimeInput />)

  await user.click(screen.getByLabelText('Month'))
  await user.keyboard('1239')

  expect(screen.getByLabelText<HTMLInputElement>('Day').value).toBe('31')
})

test('ignores non-digit characters', async () => {
  const user = userEvent.setup()
  render(<ControlledDatetimeInput />)

  await user.click(screen.getByLabelText('Month'))
  await user.keyboard('a1b2')

  expect(screen.getByLabelText<HTMLInputElement>('Month').value).toBe('12')
})

test('keeps a partial draft on blur (pads, does not clear)', async () => {
  const user = userEvent.setup()
  render(<ControlledDatetimeInput />)

  const month = screen.getByLabelText<HTMLInputElement>('Month')
  await user.click(month)
  await user.keyboard('3')
  await user.tab()

  expect(month.value).toBe('03')
})

test('expands a 2-digit year on blur', async () => {
  const user = userEvent.setup()
  const onChange = vi.fn<(date: Date | undefined) => void>()
  render(<ControlledDatetimeInput onChange={onChange} />)

  await user.click(screen.getByLabelText('Month'))
  await user.keyboard('1225')
  const year = screen.getByLabelText<HTMLInputElement>('Year')
  await user.keyboard('24')
  await user.tab()

  expect(year.value).toBe('2024')
  expect(onChange.mock.lastCall?.[0]?.getFullYear()).toBe(2024)
})

test('ArrowUp increments a segment', async () => {
  const user = userEvent.setup()
  render(<ControlledDatetimeInput />)

  const month = screen.getByLabelText<HTMLInputElement>('Month')
  await user.click(month)
  await user.keyboard('{ArrowUp}')

  expect(month.value).toBe('01')
})

test('supports time mode', async () => {
  const user = userEvent.setup()
  const onChange = vi.fn<(date: Date | undefined) => void>()
  render(<ControlledDatetimeInput mode="time" onChange={onChange} />)

  expect(screen.getByLabelText('Hour')).toBeInTheDocument()
  expect(screen.getByLabelText('Minute')).toBeInTheDocument()

  await user.click(screen.getByLabelText('Hour'))
  await user.keyboard('1430')

  const parsed = onChange.mock.lastCall?.[0]
  expect(parsed?.getHours()).toBe(14)
  expect(parsed?.getMinutes()).toBe(30)
})

test('supports datetime mode with all five segments', async () => {
  const user = userEvent.setup()
  const onChange = vi.fn<(date: Date | undefined) => void>()
  render(<ControlledDatetimeInput mode="datetime" onChange={onChange} />)

  for (const label of ['Month', 'Day', 'Year', 'Hour', 'Minute']) {
    expect(screen.getByLabelText(label)).toBeInTheDocument()
  }

  await user.click(screen.getByLabelText('Month'))
  await user.keyboard('122520231430')

  const parsed = onChange.mock.lastCall?.[0]
  expect(parsed?.getDate()).toBe(25)
  expect(parsed?.getHours()).toBe(14)
  expect(parsed?.getMinutes()).toBe(30)
})
