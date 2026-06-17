import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Separator } from './separator'

test('is decorative (no separator role) by default', () => {
  const { container } = render(<Separator data-testid="sep" />)
  const element = container.querySelector('[data-testid="sep"]')
  expect(element).not.toHaveAttribute('role', 'separator')
  expect(element).toHaveAttribute('data-orientation', 'horizontal')
})

test('exposes a separator role with orientation when not decorative', () => {
  render(<Separator decorative={false} orientation="vertical" />)
  const separator = screen.getByRole('separator')
  expect(separator).toHaveAttribute('aria-orientation', 'vertical')
})

test('renders without axe violations', async () => {
  const { container } = render(<Separator decorative={false} />)
  const results = await axe(container)
  expect(results.violations).toHaveLength(0)
})

test('applies the recipe class', () => {
  const { container } = render(<Separator data-testid="sep" />)
  const element = container.querySelector('[data-testid="sep"]')
  expect(element?.className).toContain('stalk-separator')
})

test('forwards ref to the rendered element', () => {
  const ref = createRef<HTMLDivElement>()
  render(<Separator ref={ref} data-testid="sep" />)
  expect(ref.current).toBeInstanceOf(HTMLDivElement)
})
