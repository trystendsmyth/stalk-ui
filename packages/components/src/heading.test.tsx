import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Heading } from './heading'

const levels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const

test('renders without axe violations', async () => {
  const { container } = render(<Heading as="h1">Page title</Heading>)
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
})

test.each(levels)('renders %s as the matching heading level', (level) => {
  const expectedLevel = Number(level.slice(1))

  render(<Heading as={level}>Section</Heading>)

  expect(screen.getByRole('heading', { level: expectedLevel })).toHaveTextContent('Section')
})

test('defaults to an h2', () => {
  render(<Heading>Default</Heading>)

  expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
})

test('decouples visual size from the semantic level', () => {
  render(
    <Heading as="h1" size="h4">
      Small h1
    </Heading>,
  )

  // Still an h1 for assistive tech, regardless of the size override.
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Small h1')
})

test('forwards refs and attributes', () => {
  const ref = createRef<HTMLHeadingElement>()

  render(
    <Heading ref={ref} data-testid="heading">
      Title
    </Heading>,
  )

  expect(screen.getByTestId('heading')).toBe(ref.current)
})
