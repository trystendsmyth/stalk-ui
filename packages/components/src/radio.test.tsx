import '@testing-library/jest-dom/vitest'

import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Radio } from './radio'

afterEach(() => {
  cleanup()
})

const sizes = ['sm', 'md', 'lg'] as const

test.each(sizes)('renders %s size without axe violations', async (size) => {
  const { container } = render(<Radio aria-label={`${size} radio`} name="size" size={size} />)
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('radio', { name: `${size} radio` })).toHaveClass(`stalk-radio--${size}`)
})

test('supports label, description, and group selection', async () => {
  const user = userEvent.setup()

  render(
    <fieldset>
      <legend>Plan</legend>
      <Radio
        description="Best for small teams."
        id="plan-basic"
        label="Basic"
        name="plan"
        value="basic"
      />
      <Radio id="plan-pro" label="Pro" name="plan" value="pro" />
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
  render(<Radio invalid aria-label="Required choice" name="choice" />)

  const radio = screen.getByRole('radio', { name: 'Required choice' })
  expect(radio).toHaveAttribute('data-invalid', '')
  expect(radio).toHaveClass('stalk-radio--invalid')
})

test('does not toggle while disabled', async () => {
  const user = userEvent.setup()

  render(<Radio disabled aria-label="Disabled radio" name="disabled" />)

  const radio = screen.getByRole('radio', { name: 'Disabled radio' })
  await user.click(radio)

  expect(radio).toBeDisabled()
  expect(radio).not.toBeChecked()
})
