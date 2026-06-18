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

test('ignores duplicates by default', async () => {
  const user = userEvent.setup()
  const onValueChange = vi.fn()
  render(<TagsInput aria-label="Tags" defaultValue={['a']} onValueChange={onValueChange} />)
  await user.type(screen.getByRole('textbox'), 'a{Enter}')
  expect(onValueChange).not.toHaveBeenCalled()
})
