import { act, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { OtpInput } from './otp-input'

// input-otp's password-manager badge detection schedules polling timers
// (setInterval / delayed setTimeout) it doesn't clear on unmount, so they fire
// after JSDOM is torn down → "window is not defined", failing the run even
// though every test passed. Disable that strategy here (a PWM-only UX
// affordance, irrelevant to these tests); the drains mop up one-shot timers.
afterEach(async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
})

const renderOtp = () =>
  render(
    <OtpInput maxLength={4} aria-label="One-time passcode" pushPasswordManagerStrategy="none">
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

const waitForOtpTimers = async () => {
  await act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 60)
    })
  })
}

test('renders an accessible input without axe violations', async () => {
  const { container } = renderOtp()
  await waitForOtpTimers()

  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('textbox', { name: 'One-time passcode' })).toBeInTheDocument()
})

test('applies slot classes', async () => {
  renderOtp()
  await waitForOtpTimers()

  expect(screen.getByRole('separator')).toHaveClass('stalk-otp-input__separator')
})

test('throws when subcomponents render outside the root', () => {
  expect(() => render(<OtpInput.Group />)).toThrow(/must be rendered inside <OtpInputRoot>/)
})
