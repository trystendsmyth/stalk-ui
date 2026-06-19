import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
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

test('restricts disallowed characters as the user types', async () => {
  const user = userEvent.setup()
  render(<FormatInput aria-label="Phone" format="tel" />)
  const field = screen.getByLabelText('Phone')
  await user.type(field, 'abc1-800-555')
  expect(field).toHaveValue('1-800-555')
})

test('strips spaces from email input', async () => {
  const user = userEvent.setup()
  render(<FormatInput aria-label="Email" format="email" />)
  const field = screen.getByLabelText('Email')
  await user.type(field, 'ada @ example.com')
  expect(field).toHaveValue('ada@example.com')
})

test('surfaces the validity check only after a valid value is committed on blur', async () => {
  const user = userEvent.setup()
  render(<FormatInput aria-label="Email" format="email" showValidity validLabel="Valid email" />)
  await user.type(screen.getByLabelText('Email'), 'ada@stalk-ui.com')
  // Not shown until blur.
  expect(screen.queryByRole('img', { name: 'Valid email' })).not.toBeInTheDocument()
  await user.tab()
  expect(screen.getByRole('img', { name: 'Valid email' })).toBeInTheDocument()
})

test('marks the field invalid on blur when the value is malformed', async () => {
  const user = userEvent.setup()
  const onValidityChange = vi.fn()
  render(<FormatInput aria-label="Email" format="email" onValidityChange={onValidityChange} />)
  const field = screen.getByLabelText('Email')
  await user.type(field, 'not-an-email')
  await user.tab()
  expect(field).toHaveAttribute('aria-invalid', 'true')
  expect(onValidityChange).toHaveBeenLastCalledWith(false)
})

test('formats as you type via formatValue', async () => {
  const user = userEvent.setup()
  render(
    <FormatInput
      aria-label="Phone"
      format="tel"
      formatValue={(v) => {
        const d = v.replace(/\D/g, '')
        return d.length > 3 ? `${d.slice(0, 3)}-${d.slice(3)}` : d
      }}
    />,
  )
  const field = screen.getByLabelText('Phone')
  await user.type(field, '1234567')
  expect(field).toHaveValue('123-4567')
})

test('lowercases and trims email on blur', async () => {
  const user = userEvent.setup()
  render(<FormatInput aria-label="Email" format="email" />)
  const field = screen.getByLabelText('Email')
  await user.type(field, 'ADA@Example.com')
  await user.tab()
  expect(field).toHaveValue('ada@example.com')
})
