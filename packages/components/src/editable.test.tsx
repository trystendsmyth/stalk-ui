import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { Editable } from './editable'

test('renders a preview and passes axe', async () => {
  const { container } = render(<Editable aria-label="Project name" defaultValue="Alpha notes" />)

  expect(screen.getByRole('button', { name: 'Project name' })).toHaveTextContent('Alpha notes')
  expect((await axe(container)).violations).toHaveLength(0)
})

test('activating edits, Enter commits', async () => {
  const user = userEvent.setup()
  const onSubmit = vi.fn()
  render(<Editable aria-label="Project name" defaultValue="Alpha notes" onSubmit={onSubmit} />)

  await user.click(screen.getByRole('button', { name: 'Project name' }))
  const input = screen.getByRole('textbox', { name: 'Project name' })
  await user.clear(input)
  await user.type(input, 'Beta notes{Enter}')

  expect(onSubmit).toHaveBeenCalledWith('Beta notes')
  expect(screen.getByRole('button', { name: 'Project name' })).toHaveTextContent('Beta notes')
})

test('Escape cancels without committing', async () => {
  const user = userEvent.setup()
  const onSubmit = vi.fn()
  render(<Editable aria-label="Project name" defaultValue="Alpha notes" onSubmit={onSubmit} />)

  await user.click(screen.getByRole('button', { name: 'Project name' }))
  await user.type(screen.getByRole('textbox', { name: 'Project name' }), 'X{Escape}')

  expect(onSubmit).not.toHaveBeenCalled()
  expect(screen.getByRole('button', { name: 'Project name' })).toHaveTextContent('Alpha notes')
})

test('shows the placeholder when empty', () => {
  render(<Editable aria-label="Note" placeholder="Add a note" />)

  expect(screen.getByRole('button', { name: 'Note' })).toHaveTextContent('Add a note')
  expect(screen.getByRole('button', { name: 'Note' })).toHaveAttribute('data-placeholder')
})
