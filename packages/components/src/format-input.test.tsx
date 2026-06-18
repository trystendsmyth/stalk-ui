import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { FormatInput } from './format-input'

test('email format applies the right type, inputMode, and autocomplete', () => {
  render(<FormatInput aria-label="Email" format="email" />)
  const field = screen.getByLabelText('Email')
  expect(field).toHaveAttribute('type', 'email')
  expect(field).toHaveAttribute('inputmode', 'email')
  expect(field).toHaveAttribute('autocomplete', 'email')
})

test('url format applies type=url', () => {
  render(<FormatInput aria-label="Website" format="url" />)
  expect(screen.getByLabelText('Website')).toHaveAttribute('type', 'url')
})

test('renders without axe violations', async () => {
  const { container } = render(<FormatInput aria-label="Email" format="email" />)
  expect((await axe(container)).violations).toHaveLength(0)
})

test('surfaces a validity check once a valid value is entered', async () => {
  const user = userEvent.setup()
  render(<FormatInput aria-label="Email" format="email" showValidity validLabel="Valid email" />)
  expect(screen.queryByRole('img', { name: 'Valid email' })).not.toBeInTheDocument()
  await user.type(screen.getByLabelText('Email'), 'ada@stalk-ui.com')
  expect(screen.getByRole('img', { name: 'Valid email' })).toBeInTheDocument()
})
