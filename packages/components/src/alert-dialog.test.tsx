import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { AlertDialog } from './alert-dialog'

const renderAlertDialog = (open = true) =>
  render(
    <AlertDialog.Root defaultOpen={open}>
      <AlertDialog.Trigger>Delete project</AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Delete this project?</AlertDialog.Title>
          <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action>Delete</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>,
  )

test('renders an accessible alert dialog without axe violations', async () => {
  const { container } = renderAlertDialog()
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(
    screen.getByRole('alertdialog', { name: 'Delete this project?' }),
  ).toHaveAccessibleDescription('This action cannot be undone.')
})

test('closes via the cancel action', async () => {
  const user = userEvent.setup()
  renderAlertDialog(false)

  await user.click(screen.getByRole('button', { name: 'Delete project' }))
  expect(screen.getByRole('alertdialog', { name: 'Delete this project?' })).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: 'Cancel' }))
  expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
})

test('applies slot classes', () => {
  renderAlertDialog()

  expect(screen.getByRole('alertdialog', { name: 'Delete this project?' })).toHaveClass(
    'stalk-alert-dialog__content',
  )
  expect(screen.getByText('This action cannot be undone.')).toHaveClass(
    'stalk-alert-dialog__description',
  )
})
