import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Timeline } from './timeline'

const renderFeed = () =>
  render(
    <Timeline.Root aria-label="Activity">
      <Timeline.Item tone="success">
        <Timeline.Content>
          <Timeline.Time dateTime="2026-07-01T10:00">2h ago</Timeline.Time>
          <Timeline.Title>Deploy finished</Timeline.Title>
          <Timeline.Description>Build #424 promoted to production.</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item tone="danger">
        <Timeline.Content>
          <Timeline.Title>Alert raised</Timeline.Title>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline.Root>,
  )

test('renders an accessible list of events', async () => {
  const { container } = renderFeed()

  expect(screen.getByRole('list', { name: 'Activity' })).toBeInTheDocument()
  expect(screen.getAllByRole('listitem')).toHaveLength(2)
  expect(screen.getByText('Deploy finished')).toBeInTheDocument()
  expect((await axe(container)).violations).toHaveLength(0)
})

test('orientation="horizontal" applies the horizontal recipe variant', () => {
  render(
    <Timeline.Root aria-label="Progress" orientation="horizontal">
      <Timeline.Item>
        <Timeline.Content>
          <Timeline.Title>Ordered</Timeline.Title>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline.Root>,
  )

  expect(screen.getByRole('list', { name: 'Progress' })).toHaveClass(
    'stalk-timeline__root--horizontal',
  )
})

test('tones the item dot and hides the rail from assistive tech', () => {
  const { container } = renderFeed()
  const rails = container.querySelectorAll('[aria-hidden="true"]')

  expect(rails.length).toBeGreaterThan(0)
  expect(container.innerHTML).toContain('color-palette_success')
  expect(container.innerHTML).toContain('color-palette_danger')
})
