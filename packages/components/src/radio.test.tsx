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

test('supports label, description, and group selection', async () => {
  const user = userEvent.setup()

  render(
    <fieldset>
      <legend>Plan</legend>
      <Radio.Root name="plan">
        <Radio.Item
          description="Best for small teams."
          id="plan-basic"
          label="Basic"
          value="basic"
        />
        <Radio.Item id="plan-pro" label="Pro" value="pro" />
      </Radio.Root>
    </fieldset>,
  )

  const basic = screen.getByRole('radio', { name: 'Basic' })
  const pro = screen.getByRole('radio', { name: 'Pro' })
  await user.click(basic)
  await user.click(pro)

  expect(basic).toHaveAccessibleDescription('Best for small teams.')
  expect(basic).not.toBeChecked()
  expect(pro).toBeChecked()
})

test('marks invalid fields for styling hooks', () => {
  render(
    <Radio.Root name="choice">
      <Radio.Item invalid aria-label="Required choice" value="required" />
    </Radio.Root>,
  )

  const radio = screen.getByRole('radio', { name: 'Required choice' })
  expect(radio).toHaveAttribute('data-invalid', '')
})

test('does not toggle while disabled', async () => {
  const user = userEvent.setup()

  render(
    <Radio.Root name="disabled">
      <Radio.Item disabled aria-label="Disabled radio" value="disabled" />
    </Radio.Root>,
  )

  const radio = screen.getByRole('radio', { name: 'Disabled radio' })
  await user.click(radio)

  expect(radio).toBeDisabled()
  expect(radio).not.toBeChecked()
})
