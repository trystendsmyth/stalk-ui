import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Dialog } from './dialog'

const renderDialog = (open = true) =>
  render(
    <Dialog.Root defaultOpen={open}>
      <Dialog.Trigger>Open settings</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Settings</Dialog.Title>
          <Dialog.Description>Manage account preferences.</Dialog.Description>
        </Dialog.Header>
        <p>Dialog content</p>
        <Dialog.Footer>
          <Dialog.Close>Close</Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>,
  )

test('renders an accessible dialog without axe violations', async () => {
  const { container } = renderDialog()
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('dialog', { name: 'Settings' })).toHaveAccessibleDescription(
    'Manage account preferences.',
  )
})

test('opens and closes with trigger and close controls', async () => {
  const user = userEvent.setup()
  renderDialog(false)

  await user.click(screen.getByRole('button', { name: 'Open settings' }))
  expect(screen.getByRole('dialog', { name: 'Settings' })).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: 'Close' }))
  expect(screen.queryByRole('dialog', { name: 'Settings' })).not.toBeInTheDocument()
})

test('applies slot classes', () => {
  renderDialog()

  expect(screen.getByRole('dialog', { name: 'Settings' })).toHaveClass('stalk-dialog__content')
  expect(screen.getByText('Settings')).toHaveClass('stalk-dialog__title')
  expect(screen.getByText('Manage account preferences.')).toHaveClass('stalk-dialog__description')
})
