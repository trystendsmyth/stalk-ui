import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Radio } from './radio'

const sizes = ['sm', 'md', 'lg'] as const

test.each(sizes)('renders %s size without axe violations', async (size) => {
  const { container } = render(
    <Radio.Root name="size">
      <Radio.Item aria-label={`${size} radio`} size={size} value={size} />
    </Radio.Root>,
  )
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('radio', { name: `${size} radio` })).toBeInTheDocument()
})

test('selects a value when clicked within a group', async () => {
  const user = userEvent.setup()

  render(
    <Radio.Root name="plan">
      <Radio.Item aria-label="Basic" id="plan-basic" value="basic" />
      <Radio.Item aria-label="Pro" id="plan-pro" value="pro" />
    </Radio.Root>,
  )

  const basic = screen.getByRole('radio', { name: 'Basic' })
  const pro = screen.getByRole('radio', { name: 'Pro' })
  await user.click(basic)
  await user.click(pro)

  expect(basic).not.toBeChecked()
  expect(pro).toBeChecked()
})

test('marks invalid fields for assistive technology', () => {
  render(
    <Radio.Root name="choice">
      <Radio.Item aria-label="Required choice" invalid value="required" />
    </Radio.Root>,
  )

  const radio = screen.getByRole('radio', { name: 'Required choice' })
  expect(radio).toBeInvalid()
  expect(radio).toHaveAttribute('data-invalid', '')
})

test('does not toggle while disabled', async () => {
  const user = userEvent.setup()

  render(
    <Radio.Root name="disabled">
      <Radio.Item aria-label="Disabled radio" disabled value="disabled" />
    </Radio.Root>,
  )

  const radio = screen.getByRole('radio', { name: 'Disabled radio' })
  await user.click(radio)

  expect(radio).toBeDisabled()
  expect(radio).not.toBeChecked()
})
