import '@testing-library/jest-dom/vitest'

import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Input } from './input'

afterEach(() => {
  cleanup()
})

const sizes = ['sm', 'md', 'lg'] as const

test.each(sizes)('renders %s size without axe violations', async (size) => {
  const { container } = render(<Input aria-label={`${size} input`} size={size} />)
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('textbox', { name: `${size} input` })).toHaveClass(`stalk-input--${size}`)
})

test('supports label, description, and user input', async () => {
  const user = userEvent.setup()

  render(
    <>
      <label htmlFor="email">Email</label>
      <p id="email-description">Used for product updates.</p>
      <Input id="email" aria-describedby="email-description" />
    </>,
  )

  const input = screen.getByRole('textbox', { name: 'Email' })
  await user.type(input, 'hello@stalk-ui.com')

  expect(input).toHaveAccessibleDescription('Used for product updates.')
  expect(input).toHaveValue('hello@stalk-ui.com')
})

test('marks invalid fields for assistive technology', () => {
  render(<Input invalid aria-label="Email" />)

  const input = screen.getByRole('textbox', { name: 'Email' })
  expect(input).toBeInvalid()
  expect(input).toHaveClass('stalk-input--invalid')
})

test('does not accept input while disabled', async () => {
  const user = userEvent.setup()

  render(<Input disabled aria-label="Disabled input" />)

  const input = screen.getByRole('textbox', { name: 'Disabled input' })
  await user.type(input, 'ignored')

  expect(input).toBeDisabled()
  expect(input).toHaveValue('')
})
