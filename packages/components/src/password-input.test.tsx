import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { PasswordInput } from './password-input'

test('renders without axe violations', async () => {
  const { container } = render(<PasswordInput aria-label="Password" />)
  expect((await axe(container)).violations).toHaveLength(0)
})

test('starts hidden and toggles visibility', async () => {
  const user = userEvent.setup()
  render(<PasswordInput aria-label="Password" defaultValue="hunter2" />)
  const field = screen.getByLabelText('Password')
  expect(field).toHaveAttribute('type', 'password')

  const toggle = screen.getByRole('button', { name: 'Show password' })
  expect(toggle).toHaveAttribute('aria-pressed', 'false')
  await user.click(toggle)

  expect(field).toHaveAttribute('type', 'text')
  expect(screen.getByRole('button', { name: 'Hide password' })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
})

test('re-hides the value when the surrounding form submits', async () => {
  const user = userEvent.setup()
  render(
    <form
      onSubmit={(event) => {
        event.preventDefault()
      }}
    >
      <PasswordInput aria-label="Password" defaultValue="hunter2" />
      <button type="submit">Submit</button>
    </form>,
  )
  await user.click(screen.getByRole('button', { name: 'Show password' }))
  expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'text')
  await user.click(screen.getByRole('button', { name: 'Submit' }))
  expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password')
})

test('forwards a ref to the input', () => {
  const ref = createRef<HTMLInputElement>()
  render(<PasswordInput ref={ref} aria-label="Password" />)
  expect(ref.current?.tagName).toBe('INPUT')
})

test('does not toggle when disabled', async () => {
  const user = userEvent.setup()
  render(<PasswordInput aria-label="Password" defaultValue="x" disabled />)
  const toggle = screen.getByRole('button', { name: 'Show password' })
  expect(toggle).toBeDisabled()
  await user.click(toggle)
  expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password')
})
