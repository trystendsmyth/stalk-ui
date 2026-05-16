import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Avatar, AvatarFallback, AvatarImage, AvatarRoot } from './avatar'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const

test.each(sizes)('renders %s size without axe violations', async (size) => {
  const { container } = render(<Avatar name="Ada Lovelace" size={size} />)
  const results = await axe(container)
  expect(results.violations).toHaveLength(0)
})

test('renders initials derived from name', () => {
  render(<Avatar name="Ada Lovelace" />)
  expect(screen.getByText('AL')).toBeInTheDocument()
})

test('derives initials from a single-word name', () => {
  render(<Avatar name="grace" />)
  expect(screen.getByText('gr')).toBeInTheDocument()
})

test('derives initials from alt when name is missing', () => {
  render(<Avatar alt="Linus Torvalds" />)
  expect(screen.getByText('LT')).toBeInTheDocument()
})

test('prefers custom fallback over derived initials', () => {
  render(<Avatar fallback="?" name="Ada Lovelace" />)
  expect(screen.getByText('?')).toBeInTheDocument()
  expect(screen.queryByText('AL')).not.toBeInTheDocument()
})

test('supports compositional API', () => {
  render(
    <AvatarRoot data-testid="avatar" tone="success">
      <AvatarImage alt="Ada" src="https://example.invalid/x.png" />
      <AvatarFallback>AL</AvatarFallback>
    </AvatarRoot>,
  )
  expect(screen.getByTestId('avatar')).toBeInTheDocument()
})

test('forwards refs', () => {
  const ref = createRef<HTMLSpanElement>()
  render(<Avatar ref={ref} data-testid="avatar" name="Ada" />)
  expect(screen.getByTestId('avatar')).toBe(ref.current)
})
