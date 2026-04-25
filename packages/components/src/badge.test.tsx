import '@testing-library/jest-dom/vitest'

import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Badge } from './badge'

afterEach(() => {
  cleanup()
})

const variants = ['solid', 'subtle', 'outline'] as const

test.each(variants)('renders %s variant without axe violations', async (variant) => {
  const { container } = render(<Badge variant={variant}>Published</Badge>)
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByText('Published')).toHaveClass(`stalk-badge--${variant}`)
})

test('renders size classes', () => {
  render(
    <>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
    </>,
  )

  expect(screen.getByText('Small')).toHaveClass('stalk-badge--sm')
  expect(screen.getByText('Medium')).toHaveClass('stalk-badge--md')
})

test('merges custom class names and attributes', () => {
  render(
    <Badge className="custom-badge" data-testid="badge">
      Beta
    </Badge>,
  )

  expect(screen.getByTestId('badge')).toHaveClass('stalk-badge', 'custom-badge')
})
