import '@testing-library/jest-dom/vitest'

import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { DropdownMenu } from './dropdown-menu'

afterEach(() => {
  cleanup()
})

const renderMenu = (open = true, onSelect = vi.fn()) =>
  render(
    <DropdownMenu.Root defaultOpen={open}>
      <DropdownMenu.Trigger>Open menu</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>Actions</DropdownMenu.Label>
        <DropdownMenu.Item onSelect={onSelect}>
          Edit
          <DropdownMenu.Shortcut>⌘E</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item disabled>Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>,
  )

test('renders an accessible menu without axe violations', async () => {
  const { container } = renderMenu()
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('menu')).toHaveClass('stalk-dropdown-menu__content')
  expect(screen.getByRole('menuitem', { name: /edit/i })).toHaveClass('stalk-dropdown-menu__item')
})

test('opens from the trigger and selects an item', async () => {
  const user = userEvent.setup()
  const onSelect = vi.fn()
  renderMenu(false, onSelect)

  await user.click(screen.getByRole('button', { name: 'Open menu' }))
  await user.click(screen.getByRole('menuitem', { name: /edit/i }))

  expect(onSelect).toHaveBeenCalledTimes(1)
})

test('applies supporting slot classes', () => {
  renderMenu()

  expect(screen.getByText('Actions')).toHaveClass('stalk-dropdown-menu__label')
  expect(screen.getByText('⌘E')).toHaveClass('stalk-dropdown-menu__shortcut')
  expect(screen.getByRole('separator')).toHaveClass('stalk-dropdown-menu__separator')
})
