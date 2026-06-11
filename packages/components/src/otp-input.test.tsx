import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { OtpInput } from './otp-input'

const renderOtp = () =>
  render(
    <OtpInput maxLength={4} aria-label="One-time passcode">
      <OtpInput.Group>
        <OtpInput.Slot index={0} />
        <OtpInput.Slot index={1} />
      </OtpInput.Group>
      <OtpInput.Separator />
      <OtpInput.Group>
        <OtpInput.Slot index={2} />
        <OtpInput.Slot index={3} />
      </OtpInput.Group>
    </OtpInput>,
  )

test('renders an accessible input without axe violations', async () => {
  const { container } = renderOtp()
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('textbox', { name: 'One-time passcode' })).toBeInTheDocument()
})

test('applies slot classes', () => {
  renderOtp()

  expect(screen.getByRole('separator')).toHaveClass('stalk-otp-input__separator')
})

test('throws when subcomponents render outside the root', () => {
  expect(() => render(<OtpInput.Group />)).toThrow(/must be rendered inside <OtpInputRoot>/)
})
