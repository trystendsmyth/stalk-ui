import '@testing-library/jest-dom/vitest'

import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Select } from './select'

afterEach(() => {
  cleanup()
})

const sizes = ['sm', 'md', 'lg'] as const

const options = (
  <>
    <option value="">Choose a status</option>
    <option value="draft">Draft</option>
    <option value="published">Published</option>
  </>
)

test.each(sizes)('renders %s size without axe violations', async (size) => {
  const { container } = render(
    <Select aria-label={`${size} select`} size={size}>
      {options}
    </Select>,
  )
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('combobox', { name: `${size} select` })).toHaveClass(
    `stalk-select--${size}`,
  )
})

test('supports label, description, and user selection', async () => {
  const user = userEvent.setup()

  render(
    <>
      <label htmlFor="status">Status</label>
      <p id="status-description">Controls publishing state.</p>
      <Select id="status" aria-describedby="status-description">
        {options}
      </Select>
    </>,
  )

  const select = screen.getByRole('combobox', { name: 'Status' })
  await user.selectOptions(select, 'published')

  expect(select).toHaveAccessibleDescription('Controls publishing state.')
  expect(select).toHaveValue('published')
})

test('marks invalid fields for assistive technology', () => {
  render(
    <Select invalid aria-label="Status">
      {options}
    </Select>,
  )

  const select = screen.getByRole('combobox', { name: 'Status' })
  expect(select).toBeInvalid()
  expect(select).toHaveClass('stalk-select--invalid')
})

test('does not accept changes while disabled', async () => {
  const user = userEvent.setup()

  render(
    <Select disabled aria-label="Disabled select">
      {options}
    </Select>,
  )

  const select = screen.getByRole('combobox', { name: 'Disabled select' })
  await user.selectOptions(select, 'published')

  expect(select).toBeDisabled()
  expect(select).toHaveValue('')
})
