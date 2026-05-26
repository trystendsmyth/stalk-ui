import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { Menubar } from './menubar'

const renderMenubar = (onSelect = vi.fn()) =>
  render(
    <Menubar>
      <Menubar.Menu>
        <Menubar.Trigger>File</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item onSelect={onSelect}>
            New tab <Menubar.Shortcut>⌘T</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item disabled>Print</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>Edit</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>Undo</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar>,
  )

test('renders an accessible menubar without axe violations', async () => {
  const { container } = renderMenubar()
  const results = await axe(container)
  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('menubar')).toBeInTheDocument()
  expect(screen.getByRole('menuitem', { name: 'File' })).toBeInTheDocument()
})

test('opens a menu on trigger click and selects an item', async () => {
  const user = userEvent.setup()
  const onSelect = vi.fn()
  renderMenubar(onSelect)

  await user.click(screen.getByRole('menuitem', { name: 'File' }))
  const item = await screen.findByRole('menuitem', { name: /new tab/i })
  await user.click(item)

  expect(onSelect).toHaveBeenCalledTimes(1)
})

test('moves focus between triggers with arrow keys', async () => {
  const user = userEvent.setup()
  renderMenubar()

  const fileTrigger = screen.getByRole('menuitem', { name: 'File' })
  fileTrigger.focus()
  await user.keyboard('{ArrowRight}')

  expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus()
})
