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

test('supports a non-modal dialog without the blocking overlay', async () => {
  const { container } = render(
    <Dialog.Root defaultOpen modal={false}>
      <Dialog.Trigger>Open panel</Dialog.Trigger>
      <Dialog.Content overlay={false}>
        <Dialog.Header>
          <Dialog.Title>Run details</Dialog.Title>
          <Dialog.Description>Live, non-blocking panel.</Dialog.Description>
        </Dialog.Header>
        <p>Panel content</p>
      </Dialog.Content>
    </Dialog.Root>,
  )

  const dialog = screen.getByRole('dialog', { name: 'Run details' })
  // Radix marks modal dialogs aria-modal="true"; non-modal omits it so the page
  // behind stays in the a11y tree and interactive.
  expect(dialog).not.toHaveAttribute('aria-modal', 'true')
  expect((await axe(container)).violations).toHaveLength(0)
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
