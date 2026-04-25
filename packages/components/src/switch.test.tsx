import '@testing-library/jest-dom/vitest'

import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Switch } from './switch'

afterEach(() => {
  cleanup()
})

const sizes = ['sm', 'md', 'lg'] as const

test.each(sizes)('renders %s size without axe violations', async (size) => {
  const { container } = render(<Switch aria-label={`${size} switch`} size={size} />)
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('switch', { name: `${size} switch` })).toHaveClass(
    `stalk-switch--${size}`,
  )
})

test('supports label, description, and checked state changes', async () => {
  const user = userEvent.setup()

  render(
    <Switch
      description="Send email notifications for product updates."
      id="email-notifications"
      label="Email notifications"
    />,
  )

  const switchControl = screen.getByRole('switch', { name: 'Email notifications' })
  await user.click(switchControl)

  expect(switchControl).toHaveAccessibleDescription('Send email notifications for product updates.')
  expect(switchControl).toBeChecked()
})

test('marks invalid fields for styling hooks', () => {
  render(<Switch invalid aria-label="Required switch" />)

  const switchControl = screen.getByRole('switch', { name: 'Required switch' })
  expect(switchControl).toHaveAttribute('data-invalid', '')
  expect(switchControl).toHaveClass('stalk-switch--invalid')
})

test('does not toggle while disabled', async () => {
  const user = userEvent.setup()

  render(<Switch disabled aria-label="Disabled switch" />)

  const switchControl = screen.getByRole('switch', { name: 'Disabled switch' })
  await user.click(switchControl)

  expect(switchControl).toBeDisabled()
  expect(switchControl).not.toBeChecked()
})
