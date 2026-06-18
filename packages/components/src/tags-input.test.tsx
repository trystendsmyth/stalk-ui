import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { TagsInput } from './tags-input'

test('renders existing tags without axe violations', async () => {
  const { container } = render(
    <TagsInput aria-label="Tags" defaultValue={['design', 'engineering']} />,
  )
  expect(screen.getByText('design')).toBeInTheDocument()
  expect(screen.getByText('engineering')).toBeInTheDocument()
  expect((await axe(container)).violations).toHaveLength(0)
})

test('adds a tag on Enter', async () => {
  const user = userEvent.setup()
  const onValueChange = vi.fn()
  render(<TagsInput aria-label="Tags" onValueChange={onValueChange} />)
  await user.type(screen.getByRole('textbox'), 'product{Enter}')
  expect(onValueChange).toHaveBeenLastCalledWith(['product'])
  expect(screen.getByText('product')).toBeInTheDocument()
})

test('removes the last tag on Backspace when the field is empty', async () => {
  const user = userEvent.setup()
  const onValueChange = vi.fn()
  render(<TagsInput aria-label="Tags" defaultValue={['a', 'b']} onValueChange={onValueChange} />)
  await user.type(screen.getByRole('textbox'), '{Backspace}')
  expect(onValueChange).toHaveBeenLastCalledWith(['a'])
})

test('removes a tag via its remove button', async () => {
  const user = userEvent.setup()
  const onValueChange = vi.fn()
  render(<TagsInput aria-label="Tags" defaultValue={['a', 'b']} onValueChange={onValueChange} />)
  await user.click(screen.getByRole('button', { name: 'Remove: a' }))
  expect(onValueChange).toHaveBeenLastCalledWith(['b'])
})

test('formats each tag via formatTag and rejects empty results', async () => {
  const user = userEvent.setup()
  const onValueChange = vi.fn()
  render(
    <TagsInput
      aria-label="Emails"
      formatTag={(v) => (v.includes('@') ? v.trim().toLowerCase() : '')}
      onValueChange={onValueChange}
    />,
  )
  const field = screen.getByRole('textbox')
  // Rejected: no '@'.
  await user.type(field, 'not-an-email{Enter}')
  expect(onValueChange).not.toHaveBeenCalled()
  // Formatted: trimmed + lowercased.
  await user.type(field, 'ADA@Example.com{Enter}')
  expect(onValueChange).toHaveBeenLastCalledWith(['ada@example.com'])
  expect(screen.getByText('ada@example.com')).toBeInTheDocument()
})

test('ignores duplicates by default', async () => {
  const user = userEvent.setup()
  const onValueChange = vi.fn()
  render(<TagsInput aria-label="Tags" defaultValue={['a']} onValueChange={onValueChange} />)
  await user.type(screen.getByRole('textbox'), 'a{Enter}')
  expect(onValueChange).not.toHaveBeenCalled()
})
