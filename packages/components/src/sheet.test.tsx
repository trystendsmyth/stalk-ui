import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Sheet } from './sheet'

const renderSheet = (open = true) =>
  render(
    <Sheet.Root defaultOpen={open}>
      <Sheet.Trigger>Open profile</Sheet.Trigger>
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Edit profile</Sheet.Title>
          <Sheet.Description>Update your details.</Sheet.Description>
        </Sheet.Header>
        <p>Sheet body</p>
        <Sheet.Footer>
          <Sheet.Close>Close</Sheet.Close>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>,
  )

test('renders an accessible sheet without axe violations', async () => {
  const { container } = renderSheet()
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('dialog', { name: 'Edit profile' })).toHaveAccessibleDescription(
    'Update your details.',
  )
})

test('opens and closes with trigger and close controls', async () => {
  const user = userEvent.setup()
  renderSheet(false)

  await user.click(screen.getByRole('button', { name: 'Open profile' }))
  expect(screen.getByRole('dialog', { name: 'Edit profile' })).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: 'Close' }))
  expect(screen.queryByRole('dialog', { name: 'Edit profile' })).not.toBeInTheDocument()
})

test('applies side-specific slot classes', () => {
  renderSheet()

  const panel = screen.getByRole('dialog', { name: 'Edit profile' })
  expect(panel).toHaveClass('stalk-sheet__content')
  expect(panel.className).toContain('side')
})
