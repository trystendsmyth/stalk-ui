import { render } from '@testing-library/react'
import { createRef } from 'react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { AspectRatio } from './aspect-ratio'

test('applies the requested ratio as the CSS aspect-ratio', () => {
  const { container } = render(
    <AspectRatio data-testid="ar" ratio={16 / 9}>
      <span>content</span>
    </AspectRatio>,
  )
  const element = container.querySelector<HTMLDivElement>('[data-testid="ar"]')
  // jsdom normalizes the `aspect-ratio` shorthand to `<number> / 1`.
  expect(element?.style.aspectRatio).toBe(`${String(16 / 9)} / 1`)
})

test('defaults to a square ratio', () => {
  const { container } = render(<AspectRatio data-testid="ar" />)
  const element = container.querySelector<HTMLDivElement>('[data-testid="ar"]')
  expect(element?.style.aspectRatio).toBe('1 / 1')
})

test('renders the child element directly when asChild is set', () => {
  const { container } = render(
    <AspectRatio asChild ratio={4 / 3}>
      <section data-testid="ar">panel</section>
    </AspectRatio>,
  )
  const element = container.querySelector<HTMLElement>('[data-testid="ar"]')
  expect(element?.tagName).toBe('SECTION')
  expect(element?.style.aspectRatio).toBe(`${String(4 / 3)} / 1`)
})

test('renders without axe violations', async () => {
  const { container } = render(
    <AspectRatio ratio={1}>
      <img alt="Decorative tile" src="data:," />
    </AspectRatio>,
  )
  const results = await axe(container)
  expect(results.violations).toHaveLength(0)
})

test('wraps children in the ratio frame by default', () => {
  const { container } = render(
    <AspectRatio data-testid="ar">
      <span>framed</span>
    </AspectRatio>,
  )
  const element = container.querySelector<HTMLDivElement>('[data-testid="ar"]')
  expect(element?.tagName).toBe('DIV')
  expect(element).toContainHTML('<span>framed</span>')
  expect(element?.style.aspectRatio).toBe('1 / 1')
})

test('forwards ref to the rendered element', () => {
  const ref = createRef<HTMLDivElement>()
  render(<AspectRatio ref={ref} data-testid="ar" />)
  expect(ref.current).toBeInstanceOf(HTMLDivElement)
})
