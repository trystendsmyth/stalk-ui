import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Switch } from './switch'

const sizes = ['sm', 'md', 'lg'] as const

test.each(sizes)('renders %s size without axe violations', async (size) => {
  const { container } = render(<Switch aria-label={`${size} switch`} size={size} />)
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('switch', { name: `${size} switch` })).toBeInTheDocument()
})

test('toggles checked state when clicked', async () => {
  const user = userEvent.setup()

  render(<Switch aria-label="Email notifications" />)

  const switchControl = screen.getByRole('switch', { name: 'Email notifications' })
  await user.click(switchControl)

  expect(switchControl).toBeChecked()
})

test('marks invalid fields for assistive technology', () => {
  render(<Switch aria-label="Required switch" invalid />)

  const switchControl = screen.getByRole('switch', { name: 'Required switch' })
  expect(switchControl).toBeInvalid()
  expect(switchControl).toHaveAttribute('data-invalid', '')
})

test('does not toggle while disabled', async () => {
  const user = userEvent.setup()

  render(<Switch aria-label="Disabled switch" disabled />)

  const switchControl = screen.getByRole('switch', { name: 'Disabled switch' })
  await user.click(switchControl)

  expect(switchControl).toBeDisabled()
  expect(switchControl).not.toBeChecked()
})
