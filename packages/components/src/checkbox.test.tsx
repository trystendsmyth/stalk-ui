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

test('toggles checked state when clicked', async () => {
  const user = userEvent.setup()

  render(<Checkbox aria-label="Release notes" id="release-notes" />)

  const checkbox = screen.getByRole('checkbox', { name: 'Release notes' })
  await user.click(checkbox)

  expect(checkbox).toBeChecked()
})

test('renders an indeterminate state for assistive technology', () => {
  render(<Checkbox aria-label="Bulk select" checked="indeterminate" />)

  const checkbox = screen.getByRole('checkbox', { name: 'Bulk select' })
  expect(checkbox).toHaveAttribute('data-state', 'indeterminate')
})

test('marks invalid fields for assistive technology', () => {
  render(<Checkbox aria-label="Terms" invalid />)

  const checkbox = screen.getByRole('checkbox', { name: 'Terms' })
  expect(checkbox).toBeInvalid()
  expect(checkbox).toHaveAttribute('data-invalid', '')
})

test('does not toggle while disabled', async () => {
  const user = userEvent.setup()

  render(<Checkbox aria-label="Disabled checkbox" disabled />)

  const checkbox = screen.getByRole('checkbox', { name: 'Disabled checkbox' })
  await user.click(checkbox)

  expect(checkbox).toBeDisabled()
  expect(checkbox).not.toBeChecked()
})
