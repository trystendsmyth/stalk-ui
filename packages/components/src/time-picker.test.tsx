import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { TimePicker } from './time-picker'

test('renders the time selects without axe violations', async () => {
  const { container } = render(<TimePicker value="" onChange={() => undefined} />)
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('combobox', { name: 'Hours' })).toBeInTheDocument()
  expect(screen.getByRole('combobox', { name: 'Minutes' })).toBeInTheDocument()
  expect(screen.getByRole('combobox', { name: 'AM/PM' })).toBeInTheDocument()
})

test('renders a controlled 24h value as 12-hour parts', () => {
  render(<TimePicker value="14:30" onChange={() => undefined} hourCycle="12" />)

  expect(screen.getByRole('combobox', { name: 'Hours' })).toHaveTextContent('2')
  expect(screen.getByRole('combobox', { name: 'Minutes' })).toHaveTextContent('30')
  expect(screen.getByRole('combobox', { name: 'AM/PM' })).toHaveTextContent('PM')
})

test('omits the period selector in 24-hour mode', () => {
  render(<TimePicker value="09:05" onChange={() => undefined} hourCycle="24" />)

  expect(screen.queryByRole('combobox', { name: 'AM/PM' })).not.toBeInTheDocument()
  expect(screen.getByRole('combobox', { name: 'Hours' })).toHaveTextContent('09')
})
