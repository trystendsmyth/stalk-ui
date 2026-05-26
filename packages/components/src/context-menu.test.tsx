import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { ContextMenu } from './context-menu'

const renderMenu = (onSelect = vi.fn()) =>
  render(
    <ContextMenu>
      <ContextMenu.Trigger>Right click target</ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Label>Actions</ContextMenu.Label>
        <ContextMenu.Item onSelect={onSelect}>
          Cut
          <ContextMenu.Shortcut>⌘X</ContextMenu.Shortcut>
        </ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item disabled>Paste</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>,
  )

test('opens on right-click and selects an item', async () => {
  const user = userEvent.setup()
  const onSelect = vi.fn()
  renderMenu(onSelect)

  await user.pointer({ keys: '[MouseRight]', target: screen.getByText('Right click target') })

  const cutItem = screen.getByRole('menuitem', { name: /cut/i })
  await user.click(cutItem)

  expect(onSelect).toHaveBeenCalledTimes(1)
})

test('renders an accessible menu without axe violations', async () => {
  const user = userEvent.setup()
  const { container } = renderMenu()

  await user.pointer({ keys: '[MouseRight]', target: screen.getByText('Right click target') })

  const results = await axe(container)
  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('menu')).toBeInTheDocument()
})

test('renders supporting content', async () => {
  const user = userEvent.setup()
  renderMenu()

  await user.pointer({ keys: '[MouseRight]', target: screen.getByText('Right click target') })

  expect(screen.getByText('Actions')).toBeInTheDocument()
  expect(screen.getByText('⌘X')).toBeInTheDocument()
  expect(screen.getByRole('separator')).toBeInTheDocument()
})
