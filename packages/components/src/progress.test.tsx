import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Progress } from './progress'

test('exposes progressbar role and accessible name', () => {
  render(<Progress aria-label="Upload" value={42} />)
  expect(screen.getByRole('progressbar', { name: 'Upload' })).toBeInTheDocument()
})

test('renders without axe violations', async () => {
  const { container } = render(<Progress aria-label="Upload" value={42} />)
  const results = await axe(container)
  expect(results.violations).toHaveLength(0)
})

test('reports value to assistive tech', () => {
  render(<Progress aria-label="Sync" max={200} value={50} />)
  const bar = screen.getByRole('progressbar', { name: 'Sync' })
  expect(bar).toHaveAttribute('aria-valuemax', '200')
  expect(bar).toHaveAttribute('aria-valuenow', '50')
})

test('treats missing value as indeterminate', () => {
  render(<Progress aria-label="Loading" />)
  const bar = screen.getByRole('progressbar', { name: 'Loading' })
  expect(bar).not.toHaveAttribute('aria-valuenow')
})

test('forwards ref to the root element', () => {
  const ref = createRef<HTMLDivElement>()
  render(<Progress ref={ref} aria-label="Upload" value={10} />)
  expect(ref.current).toBe(screen.getByRole('progressbar'))
})
