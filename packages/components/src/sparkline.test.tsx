import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Sparkline } from './sparkline'

const series = [2, 4, 3, 6, 5, 8]

test('renders a labeled sparkline without axe violations', async () => {
  const { container } = render(<Sparkline data={series} aria-label="Weekly trend" />)

  const img = screen.getByRole('img', { name: 'Weekly trend' })
  expect(img.tagName.toLowerCase()).toBe('svg')
  // A line path is drawn from the data.
  expect(container.querySelector('path[d^="M"]')).not.toBeNull()
  expect((await axe(container)).violations).toHaveLength(0)
})

test('is decorative (aria-hidden, no img role) when unlabeled', () => {
  const { container } = render(<Sparkline data={series} />)

  expect(screen.queryByRole('img')).toBeNull()
  expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
})

test('draws the area and last point only when requested', () => {
  const { container, rerender } = render(<Sparkline data={series} aria-label="t" />)
  expect(container.querySelectorAll('path')).toHaveLength(1) // line only
  expect(container.querySelector('circle')).toBeNull()

  rerender(<Sparkline data={series} aria-label="t" area showLastPoint />)
  expect(container.querySelectorAll('path')).toHaveLength(2) // area + line
  expect(container.querySelector('circle')).not.toBeNull()
})
