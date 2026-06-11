import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Command } from './command'

// cmdk scrolls the active item into view; jsdom has no layout so stub it.
beforeAll(() => {
  Element.prototype.scrollIntoView = () => undefined
})

const renderCommand = () =>
  render(
    <Command label="Command menu">
      <Command.Input aria-label="Search commands" placeholder="Search…" />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        <Command.Group heading="Suggestions">
          <Command.Item>Calendar</Command.Item>
          <Command.Item>Settings</Command.Item>
        </Command.Group>
      </Command.List>
    </Command>,
  )

test('renders command items without axe violations', async () => {
  const { container } = renderCommand()
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByLabelText('Search commands')).toBeInTheDocument()
  expect(screen.getByText('Calendar')).toBeInTheDocument()
})

test('filters items by the search query', async () => {
  const user = userEvent.setup()
  renderCommand()

  await user.type(screen.getByLabelText('Search commands'), 'cal')

  expect(screen.getByText('Calendar')).toBeInTheDocument()
  expect(screen.queryByText('Settings')).not.toBeInTheDocument()
})

test('shows the empty state when nothing matches', async () => {
  const user = userEvent.setup()
  renderCommand()

  await user.type(screen.getByLabelText('Search commands'), 'zzzzz')

  expect(screen.getByText('No results found.')).toBeVisible()
})
