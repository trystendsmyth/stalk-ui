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
  expect(screen.getByRole('menu')).toBeInTheDocument()
  expect(screen.getByRole('menuitem', { name: /edit/i })).toBeInTheDocument()
})

test('opens from the trigger and selects an item', async () => {
  const user = userEvent.setup()
  const onSelect = vi.fn()
  renderMenu(false, onSelect)

  await user.click(screen.getByRole('button', { name: 'Open menu' }))
  await user.click(screen.getByRole('menuitem', { name: /edit/i }))

  expect(onSelect).toHaveBeenCalledTimes(1)
})

test('renders supporting content', () => {
  renderMenu()

  expect(screen.getByText('Actions')).toBeInTheDocument()
  expect(screen.getByText('⌘E')).toBeInTheDocument()
  expect(screen.getByRole('separator')).toBeInTheDocument()
})

test('supports checkbox and radio menu items', () => {
  render(
    <DropdownMenu.Root defaultOpen>
      <DropdownMenu.Trigger>Open menu</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.CheckboxItem checked>Show sidebar</DropdownMenu.CheckboxItem>
        <DropdownMenu.RadioGroup value="compact">
          <DropdownMenu.RadioItem value="compact">Compact</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="comfortable">Comfortable</DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>,
  )

  expect(screen.getByRole('menuitemcheckbox', { name: 'Show sidebar' })).toBeChecked()
  expect(screen.getByRole('menuitemradio', { name: 'Compact' })).toBeChecked()
  expect(screen.getByRole('menuitemradio', { name: 'Comfortable' })).not.toBeChecked()
})
