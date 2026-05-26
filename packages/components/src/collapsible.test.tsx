import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Collapsible } from './collapsible'

const renderCollapsible = (defaultOpen = false) =>
  render(
    <Collapsible defaultOpen={defaultOpen}>
      <Collapsible.Trigger>Toggle panel</Collapsible.Trigger>
      <Collapsible.Content>Hidden content</Collapsible.Content>
    </Collapsible>,
  )

test('renders without axe violations', async () => {
  const { container } = renderCollapsible(true)
  const results = await axe(container)
  expect(results.violations).toHaveLength(0)
})

test('toggles open state on click', async () => {
  const user = userEvent.setup()
  renderCollapsible()

  const trigger = screen.getByRole('button', { name: 'Toggle panel' })
  expect(trigger).toHaveAttribute('aria-expanded', 'false')
  expect(screen.queryByText('Hidden content')).not.toBeInTheDocument()

  await user.click(trigger)
  expect(trigger).toHaveAttribute('aria-expanded', 'true')
  expect(screen.getByText('Hidden content')).toBeInTheDocument()
})

test('applies slot classes', () => {
  renderCollapsible()
  expect(screen.getByRole('button', { name: 'Toggle panel' })).toHaveClass(
    'stalk-collapsible__trigger',
  )
})
