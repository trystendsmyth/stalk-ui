import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { Editable } from './editable'

test('renders a preview and passes axe', async () => {
  const { container } = render(<Editable aria-label="Site name" defaultValue="North field" />)

  expect(screen.getByRole('button', { name: 'Site name' })).toHaveTextContent('North field')
  expect((await axe(container)).violations).toHaveLength(0)
})

test('activating edits, Enter commits', async () => {
  const user = userEvent.setup()
  const onSubmit = vi.fn()
  render(<Editable aria-label="Site name" defaultValue="North field" onSubmit={onSubmit} />)

  await user.click(screen.getByRole('button', { name: 'Site name' }))
  const input = screen.getByRole('textbox', { name: 'Site name' })
  await user.clear(input)
  await user.type(input, 'South field{Enter}')

  expect(onSubmit).toHaveBeenCalledWith('South field')
  expect(screen.getByRole('button', { name: 'Site name' })).toHaveTextContent('South field')
})

test('Escape cancels without committing', async () => {
  const user = userEvent.setup()
  const onSubmit = vi.fn()
  render(<Editable aria-label="Site name" defaultValue="North field" onSubmit={onSubmit} />)

  await user.click(screen.getByRole('button', { name: 'Site name' }))
  await user.type(screen.getByRole('textbox', { name: 'Site name' }), 'X{Escape}')

  expect(onSubmit).not.toHaveBeenCalled()
  expect(screen.getByRole('button', { name: 'Site name' })).toHaveTextContent('North field')
})

test('shows the placeholder when empty', () => {
  render(<Editable aria-label="Note" placeholder="Add a note" />)

  expect(screen.getByRole('button', { name: 'Note' })).toHaveTextContent('Add a note')
  expect(screen.getByRole('button', { name: 'Note' })).toHaveAttribute('data-placeholder')
})
