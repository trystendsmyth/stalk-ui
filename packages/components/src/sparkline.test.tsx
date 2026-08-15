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

test('bars variant draws one zero-anchored rect per point, without axe violations', async () => {
  const { container } = render(
    <Sparkline variant="bars" data={[0, 5, 10]} width={32} height={20} aria-label="Daily count" />,
  )

  const bars = [...container.querySelectorAll('rect')]
  expect(bars).toHaveLength(3)
  expect(container.querySelector('path')).toBeNull()
  // Domain is zero-anchored (0 → 10): heights scale from the baseline, and a
  // zero value still renders a 1px hairline tick.
  const heights = bars.map((bar) => Number(bar.getAttribute('height')))
  expect(heights).toEqual([1, 10, 20])
  expect((await axe(container)).violations).toHaveLength(0)
})

test('bars variant diverges around zero for negative values', () => {
  const { container } = render(
    <Sparkline variant="bars" data={[10, -10]} width={20} height={20} aria-label="t" />,
  )

  const [up, down] = [...container.querySelectorAll('rect')]
  // Baseline sits mid-height; the positive bar rises to the top, the negative hangs below.
  expect(up).toHaveAttribute('y', '0.00')
  expect(up).toHaveAttribute('height', '10.00')
  expect(down).toHaveAttribute('y', '10.00')
  expect(down).toHaveAttribute('height', '10.00')
})

test('highlightLast fades every bar but the last', () => {
  const { container } = render(
    <Sparkline variant="bars" data={[2, 4, 6]} highlightLast aria-label="t" />,
  )

  const classes = [...container.querySelectorAll('rect')].map((bar) => bar.getAttribute('class'))
  expect(classes[0]).toContain('barMuted')
  expect(classes[1]).toContain('barMuted')
  expect(classes[2]).toContain('bar')
  expect(classes[2]).not.toContain('barMuted')
})
