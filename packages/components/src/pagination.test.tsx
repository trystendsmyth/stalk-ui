import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Pagination } from './pagination'

const Example = () => (
  <Pagination>
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.Previous href="#prev" />
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Link href="#1">1</Pagination.Link>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Link href="#2" isActive>
          2
        </Pagination.Link>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Ellipsis />
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Next href="#next" />
      </Pagination.Item>
    </Pagination.Content>
  </Pagination>
)

test('exposes a labelled pagination landmark', () => {
  render(<Example />)
  expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument()
})

test('marks the active page with aria-current', () => {
  render(<Example />)
  expect(screen.getByText('2').closest('a')).toHaveAttribute('aria-current', 'page')
})

test('labels the previous and next controls', () => {
  render(<Example />)
  expect(screen.getByRole('link', { name: 'Previous' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Next' })).toBeInTheDocument()
})

test('renders without axe violations', async () => {
  const { container } = render(<Example />)
  const results = await axe(container)
  expect(results.violations).toHaveLength(0)
})

test('forwards ref to the nav element', () => {
  const ref = createRef<HTMLElement>()
  render(
    <Pagination ref={ref}>
      <Pagination.Content />
    </Pagination>,
  )
  expect(ref.current?.tagName).toBe('NAV')
})
