import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { HoverCard } from './hover-card'

const renderHoverCard = (open = true) =>
  render(
    <HoverCard.Root defaultOpen={open} openDelay={0} closeDelay={0}>
      <HoverCard.Trigger href="#">@ada</HoverCard.Trigger>
      <HoverCard.Content>
        <p>Ada Lovelace — first computer programmer.</p>
      </HoverCard.Content>
    </HoverCard.Root>,
  )

test('renders hover card content without axe violations', async () => {
  const { container } = renderHoverCard()
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  const text = screen.getByText('Ada Lovelace — first computer programmer.')
  expect(text.closest('.stalk-hover-card__content')).not.toBeNull()
})

test('opens on pointer hover and closes on leave', async () => {
  const user = userEvent.setup()
  renderHoverCard(false)

  expect(screen.queryByText(/first computer programmer/)).not.toBeInTheDocument()

  await user.hover(screen.getByRole('link', { name: '@ada' }))
  expect(await screen.findByText(/first computer programmer/)).toBeInTheDocument()

  await user.unhover(screen.getByRole('link', { name: '@ada' }))
  await waitFor(() => {
    expect(screen.queryByText(/first computer programmer/)).not.toBeInTheDocument()
  })
})
