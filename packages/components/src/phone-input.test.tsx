import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { PhoneInput } from './phone-input'

const ControlledPhoneInput = ({ onChange }: { onChange?: (phone: string) => void }) => {
  const [value, setValue] = useState('')
  return (
    <PhoneInput
      aria-label="Phone number"
      defaultCountry="us"
      value={value}
      onChange={(phone) => {
        setValue(phone)
        onChange?.(phone)
      }}
    />
  )
}

test('renders the phone field and country selector without axe violations', async () => {
  const { container } = render(<ControlledPhoneInput />)
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('textbox', { name: 'Phone number' })).toBeInTheDocument()
  expect(screen.getByRole('combobox', { name: 'Country' })).toBeInTheDocument()
})

test('formats typed digits and emits an E.164 value', async () => {
  const user = userEvent.setup()
  const onChange = vi.fn()
  render(<ControlledPhoneInput onChange={onChange} />)

  await user.type(screen.getByRole('textbox', { name: 'Phone number' }), '2025550123')

  expect(onChange).toHaveBeenCalled()
  expect(onChange.mock.lastCall?.[0]).toBe('+12025550123')
})
