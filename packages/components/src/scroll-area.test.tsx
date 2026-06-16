import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { ScrollArea } from './scroll-area'

test('renders viewport content', () => {
  render(
    <ScrollArea style={{ height: 120, width: 200 }}>
      <p>Scrollable content</p>
    </ScrollArea>,
  )
  expect(screen.getByText('Scrollable content')).toBeInTheDocument()
})

test('renders without axe violations', async () => {
  const { container } = render(
    <ScrollArea style={{ height: 120, width: 200 }}>
      <p>Scrollable content</p>
    </ScrollArea>,
  )
  const results = await axe(container)
  expect(results.violations).toHaveLength(0)
})

test('applies the root recipe class', () => {
  const { container } = render(
    <ScrollArea data-testid="sa">
      <p>content</p>
    </ScrollArea>,
  )
  const element = container.querySelector('[data-testid="sa"]')
  expect(element?.className).toContain('stalk-scroll-area__root')
})

test('renders a viewport that carries the recipe class', () => {
  const { container } = render(
    <ScrollArea>
      <p>content</p>
    </ScrollArea>,
  )
  const viewport = container.querySelector('[data-radix-scroll-area-viewport]')
  expect(viewport?.className).toContain('stalk-scroll-area__viewport')
})

test('forwards ref to the root element', () => {
  const ref = createRef<HTMLDivElement>()
  render(
    <ScrollArea ref={ref}>
      <p>content</p>
    </ScrollArea>,
  )
  expect(ref.current).toBeInstanceOf(HTMLDivElement)
})
