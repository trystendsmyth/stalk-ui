import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Link } from './link'

const underlines = ['none', 'hover', 'always'] as const

test.each(underlines)('renders %s underline without axe violations', async (underline) => {
  const { container } = render(
    <Link href="https://example.com" underline={underline}>
      Example
    </Link>,
  )
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('link', { name: 'Example' })).toHaveAttribute(
    'href',
    'https://example.com',
  )
})

test('renders the child element when asChild is set', () => {
  render(
    <Link asChild>
      <button type="button">Trigger</button>
    </Link>,
  )

  // Slot merges props onto the child, so it stays a button — not an anchor.
  expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument()
  expect(screen.queryByRole('link')).not.toBeInTheDocument()
})

test('forwards refs and attributes', () => {
  const ref = createRef<HTMLAnchorElement>()

  render(
    <Link ref={ref} href="#" data-testid="link">
      Docs
    </Link>,
  )

  expect(screen.getByTestId('link')).toBe(ref.current)
})
