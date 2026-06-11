import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { Calendar } from './calendar'

const SingleCalendar = ({ onSelect }: { onSelect?: (date: Date | undefined) => void }) => {
  const [selected, setSelected] = useState<Date>()
  return (
    <Calendar
      mode="single"
      defaultMonth={new Date(2025, 0, 1)}
      selected={selected}
      onSelect={(date) => {
        setSelected(date)
        onSelect?.(date)
      }}
    />
  )
}

test('renders a calendar grid without axe violations', async () => {
  const { container } = render(<SingleCalendar />)
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('grid')).toBeInTheDocument()
})

test('selects a day when clicked', async () => {
  const user = userEvent.setup()
  const onSelect = vi.fn<(date: Date | undefined) => void>()
  render(<SingleCalendar onSelect={onSelect} />)

  await user.click(screen.getByText('15'))

  expect(onSelect).toHaveBeenCalledTimes(1)
  expect(onSelect.mock.calls[0]?.[0]?.getDate()).toBe(15)
})
