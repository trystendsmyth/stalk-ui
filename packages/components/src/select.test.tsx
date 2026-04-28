import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterAll, beforeAll, expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Select } from './select'

import type { SelectTriggerProps } from './select'

const originalHasPointerCapture = Object.getOwnPropertyDescriptor(
  Element.prototype,
  'hasPointerCapture',
)
const originalReleasePointerCapture = Object.getOwnPropertyDescriptor(
  Element.prototype,
  'releasePointerCapture',
)

beforeAll(() => {
  Object.defineProperty(Element.prototype, 'hasPointerCapture', {
    configurable: true,
    value: () => false,
  })
  Object.defineProperty(Element.prototype, 'releasePointerCapture', {
    configurable: true,
    value: () => undefined,
  })
})

afterAll(() => {
  if (originalHasPointerCapture === undefined) {
    Reflect.deleteProperty(Element.prototype, 'hasPointerCapture')
  } else {
    Object.defineProperty(Element.prototype, 'hasPointerCapture', originalHasPointerCapture)
  }

  if (originalReleasePointerCapture === undefined) {
    Reflect.deleteProperty(Element.prototype, 'releasePointerCapture')
  } else {
    Object.defineProperty(Element.prototype, 'releasePointerCapture', originalReleasePointerCapture)
  }
})

const sizes = ['sm', 'md', 'lg'] as const

const renderSelect = (triggerProps: SelectTriggerProps = {}) => (
  <Select.Root>
    <Select.Trigger {...triggerProps}>
      <Select.Value placeholder="Choose a status" />
    </Select.Trigger>
    <Select.Content>
      <Select.Item value="draft">Draft</Select.Item>
      <Select.Item value="published">Published</Select.Item>
    </Select.Content>
  </Select.Root>
)

test.each(sizes)('renders %s size without axe violations', async (size) => {
  const { container } = render(renderSelect({ 'aria-label': `${size} select`, size }))
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('combobox', { name: `${size} select` })).toBeInTheDocument()
})

test('supports label, description, and user selection', async () => {
  const user = userEvent.setup()

  render(
    <>
      <span id="status-label">Status</span>
      <p id="status-description">Controls publishing state.</p>
      <Select.Root>
        <Select.Trigger aria-describedby="status-description" aria-labelledby="status-label">
          <Select.Value placeholder="Choose a status" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="draft">Draft</Select.Item>
          <Select.Item value="published">Published</Select.Item>
        </Select.Content>
      </Select.Root>
    </>,
  )

  const select = screen.getByRole('combobox', { name: 'Status' })
  await user.click(select)
  await user.click(screen.getByRole('option', { name: 'Published' }))

  expect(select).toHaveAccessibleDescription('Controls publishing state.')
  expect(select).toHaveTextContent('Published')
})

test('marks invalid fields for assistive technology', () => {
  render(renderSelect({ invalid: true, 'aria-label': 'Status' }))

  const select = screen.getByRole('combobox', { name: 'Status' })
  expect(select).toHaveAttribute('aria-invalid', 'true')
  expect(select).toHaveAttribute('data-invalid', '')
})

test('does not accept changes while disabled', async () => {
  const user = userEvent.setup()

  render(renderSelect({ disabled: true, 'aria-label': 'Disabled select' }))

  const select = screen.getByRole('combobox', { name: 'Disabled select' })
  await user.click(select)

  expect(select).toBeDisabled()
  expect(screen.queryByRole('option', { name: 'Published' })).not.toBeInTheDocument()
})
