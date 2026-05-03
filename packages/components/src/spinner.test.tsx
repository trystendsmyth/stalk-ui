import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Spinner } from './spinner'

const sizes = [
  ['sm', 16],
  ['md', 22],
  ['lg', 28],
  ['xl', 34],
] as const

test('renders with status role and default aria-label', () => {
  render(<Spinner />)
  expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument()
})

test('accepts a custom aria-label', () => {
  render(<Spinner aria-label="Saving changes" />)
  expect(screen.getByRole('status', { name: 'Saving changes' })).toBeInTheDocument()
})

test.each(sizes)('renders size=%s at %spx', (size, box) => {
  const { container } = render(<Spinner size={size} />)
  const svg = container.querySelector('svg')
  expect(svg).toHaveAttribute('width', String(box))
  expect(svg).toHaveAttribute('height', String(box))
})

test('forwards ref to the wrapper element', () => {
  const ref = createRef<HTMLSpanElement>()
  render(<Spinner ref={ref} />)
  expect(ref.current).toBe(screen.getByRole('status'))
})

test('passes axe with default configuration', async () => {
  const { container } = render(<Spinner />)
  const results = await axe(container)
  expect(results.violations).toHaveLength(0)
})
