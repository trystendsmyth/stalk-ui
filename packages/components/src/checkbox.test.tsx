import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Checkbox } from './checkbox'

const sizes = ['sm', 'md', 'lg'] as const

test.each(sizes)('renders %s size without axe violations', async (size) => {
  const { container } = render(<Checkbox aria-label={`${size} checkbox`} size={size} />)
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('checkbox', { name: `${size} checkbox` })).toBeInTheDocument()
})

test('supports label, description, and checked state changes', async () => {
  const user = userEvent.setup()

  render(
    <Checkbox
      description="Receive product release notes."
      id="release-notes"
      label="Release notes"
    />,
  )

  const checkbox = screen.getByRole('checkbox', { name: 'Release notes' })
  await user.click(checkbox)

  expect(checkbox).toHaveAccessibleDescription('Receive product release notes.')
  expect(checkbox).toBeChecked()
})

test('marks invalid fields for assistive technology', () => {
  render(<Checkbox invalid aria-label="Terms" />)

  const checkbox = screen.getByRole('checkbox', { name: 'Terms' })
  expect(checkbox).toBeInvalid()
  expect(checkbox).toHaveAttribute('data-invalid', '')
})

test('does not toggle while disabled', async () => {
  const user = userEvent.setup()

  render(<Checkbox disabled aria-label="Disabled checkbox" />)

  const checkbox = screen.getByRole('checkbox', { name: 'Disabled checkbox' })
  await user.click(checkbox)

  expect(checkbox).toBeDisabled()
  expect(checkbox).not.toBeChecked()
})
