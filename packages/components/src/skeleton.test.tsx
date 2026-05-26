import { render } from '@testing-library/react'
import { createRef } from 'react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Skeleton } from './skeleton'

test('hides itself from assistive tech', () => {
  const { container } = render(<Skeleton data-testid="sk" />)
  const element = container.querySelector('[data-testid="sk"]')
  expect(element).toHaveAttribute('aria-hidden', 'true')
})

test('renders without axe violations', async () => {
  const { container } = render(<Skeleton />)
  const results = await axe(container)
  expect(results.violations).toHaveLength(0)
})

test('applies the recipe class', () => {
  const { container } = render(<Skeleton data-testid="sk" />)
  const element = container.querySelector('[data-testid="sk"]')
  expect(element?.className).toContain('stalk-skeleton')
})

test('forwards ref to the rendered element', () => {
  const ref = createRef<HTMLSpanElement>()
  render(<Skeleton ref={ref} data-testid="sk" />)
  expect(ref.current).toBeInstanceOf(HTMLSpanElement)
})
