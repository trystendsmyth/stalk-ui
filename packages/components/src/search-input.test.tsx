import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { SearchInput } from './search-input'

test('renders a searchbox without axe violations', async () => {
  const { container } = render(<SearchInput aria-label="Search" />)
  expect(screen.getByRole('searchbox', { name: 'Search' })).toBeInTheDocument()
  expect((await axe(container)).violations).toHaveLength(0)
})

test('shows a clear button only when there is a value, and clears on click', async () => {
  const user = userEvent.setup()
  const onValueChange = vi.fn()
  render(<SearchInput aria-label="Search" onValueChange={onValueChange} />)

  expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument()
  await user.type(screen.getByRole('searchbox'), 'design')
  expect(onValueChange).toHaveBeenLastCalledWith('design')

  const clear = screen.getByRole('button', { name: 'Clear search' })
  await user.click(clear)
  expect(onValueChange).toHaveBeenLastCalledWith('')
  expect(screen.getByRole('searchbox')).toHaveValue('')
})

test('clears on Escape', async () => {
  const user = userEvent.setup()
  const onValueChange = vi.fn()
  render(<SearchInput aria-label="Search" onValueChange={onValueChange} />)
  const field = screen.getByRole('searchbox')
  await user.type(field, 'abc')
  await user.type(field, '{Escape}')
  expect(onValueChange).toHaveBeenLastCalledWith('')
})
