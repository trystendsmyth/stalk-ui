import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Card } from './card'

const renderCard = () =>
  render(
    <Card.Root>
      <Card.Header>
        <Card.Title>Project settings</Card.Title>
        <Card.Description>Manage how this project is shared.</Card.Description>
        <Card.Action>
          <button type="button">Upgrade</button>
        </Card.Action>
      </Card.Header>
      <Card.Content>Card body content.</Card.Content>
      <Card.Footer>
        <button type="button">Save</button>
      </Card.Footer>
    </Card.Root>,
  )

test('renders card content without axe violations', async () => {
  const { container } = renderCard()
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('heading', { name: 'Project settings' })).toBeInTheDocument()
  expect(screen.getByText('Manage how this project is shared.')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Upgrade' })).toBeInTheDocument()
})

test('applies slot classes', () => {
  renderCard()

  expect(screen.getByRole('heading', { name: 'Project settings' })).toHaveClass('stalk-card__title')
  expect(screen.getByText('Card body content.')).toHaveClass('stalk-card__content')
})

test('throws when subcomponents render outside the root', () => {
  expect(() => render(<Card.Title>Detached</Card.Title>)).toThrow(
    /must be rendered inside <CardRoot>/,
  )
})
