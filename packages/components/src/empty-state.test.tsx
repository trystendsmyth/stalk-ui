import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { EmptyState } from './empty-state'

test('renders icon, title, description, and actions without axe violations', async () => {
  const { container } = render(
    <EmptyState.Root>
      <EmptyState.Icon>
        <svg />
      </EmptyState.Icon>
      <EmptyState.Title>No devices found</EmptyState.Title>
      <EmptyState.Description>Try widening the date range.</EmptyState.Description>
      <EmptyState.Actions>
        <button type="button">Clear filters</button>
      </EmptyState.Actions>
    </EmptyState.Root>,
  )

  expect(screen.getByRole('heading', { name: 'No devices found' })).toBeInTheDocument()
  expect(screen.getByText('Try widening the date range.')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Clear filters' })).toBeInTheDocument()
  expect((await axe(container)).violations).toHaveLength(0)
})

test('marks the icon decorative', () => {
  render(
    <EmptyState.Root>
      <EmptyState.Icon data-testid="icon">
        <svg />
      </EmptyState.Icon>
      <EmptyState.Title>Empty</EmptyState.Title>
    </EmptyState.Root>,
  )

  expect(screen.getByTestId('icon')).toHaveAttribute('aria-hidden', 'true')
})
