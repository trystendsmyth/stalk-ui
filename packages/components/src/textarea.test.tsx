import '@testing-library/jest-dom/vitest'

import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Textarea } from './textarea'

afterEach(() => {
  cleanup()
})

const sizes = ['sm', 'md', 'lg'] as const

test.each(sizes)('renders %s size without axe violations', async (size) => {
  const { container } = render(<Textarea aria-label={`${size} textarea`} size={size} />)
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('textbox', { name: `${size} textarea` })).toHaveClass(
    `stalk-textarea--${size}`,
  )
})

test('supports label, description, multiline input, and keyboard newlines', async () => {
  const user = userEvent.setup()

  render(
    <>
      <label htmlFor="message">Message</label>
      <p id="message-description">Share launch notes.</p>
      <Textarea id="message" aria-describedby="message-description" />
    </>,
  )

  const textarea = screen.getByRole('textbox', { name: 'Message' })
  await user.type(textarea, 'Line one{enter}Line two')

  expect(textarea).toHaveAccessibleDescription('Share launch notes.')
  expect(textarea).toHaveValue('Line one\nLine two')
})

test('marks invalid fields for assistive technology', () => {
  render(<Textarea invalid aria-label="Message" />)

  const textarea = screen.getByRole('textbox', { name: 'Message' })
  expect(textarea).toBeInvalid()
  expect(textarea).toHaveClass('stalk-textarea--invalid')
})

test('does not accept input while disabled', async () => {
  const user = userEvent.setup()

  render(<Textarea disabled aria-label="Disabled textarea" />)

  const textarea = screen.getByRole('textbox', { name: 'Disabled textarea' })
  await user.type(textarea, 'ignored')

  expect(textarea).toBeDisabled()
  expect(textarea).toHaveValue('')
})
