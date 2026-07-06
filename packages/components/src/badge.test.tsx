import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Badge } from './badge'

const variants = ['solid', 'subtle', 'outline'] as const

test.each(variants)('renders %s variant without axe violations', async (variant) => {
  const { container } = render(<Badge variant={variant}>Published</Badge>)
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByText('Published')).toBeInTheDocument()
})

test('renders each size', () => {
  render(
    <>
      <Badge size="micro">Micro</Badge>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </>,
  )

  expect(screen.getByText('Micro')).toBeInTheDocument()
  expect(screen.getByText('Small')).toBeInTheDocument()
  expect(screen.getByText('Medium')).toBeInTheDocument()
  expect(screen.getByText('Large')).toBeInTheDocument()
})

test('renders the neutral tone', async () => {
  const { container } = render(<Badge tone="neutral">Vendor-reported</Badge>)

  expect(screen.getByText('Vendor-reported').className).toContain('color-palette_neutral')
  expect((await axe(container)).violations).toHaveLength(0)
})

test('forwards refs and attributes', () => {
  const ref = createRef<HTMLSpanElement>()

  render(
    <Badge ref={ref} data-testid="badge">
      Beta
    </Badge>,
  )

  expect(screen.getByTestId('badge')).toBe(ref.current)
})
