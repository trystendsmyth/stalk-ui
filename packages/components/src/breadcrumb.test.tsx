import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Breadcrumb } from './breadcrumb'

const Example = () => (
  <Breadcrumb>
    <Breadcrumb.List>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="#home">Home</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Page>Current</Breadcrumb.Page>
      </Breadcrumb.Item>
    </Breadcrumb.List>
  </Breadcrumb>
)

test('exposes a labelled navigation landmark', () => {
  render(<Example />)
  expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()
})

test('marks the current page with aria-current', () => {
  render(<Example />)
  const current = screen.getByText('Current')
  expect(current).toHaveAttribute('aria-current', 'page')
})

test('hides separators from assistive tech', () => {
  const { container } = render(<Example />)
  const separator = container.querySelector('.stalk-breadcrumb__separator')
  expect(separator).toHaveAttribute('aria-hidden', 'true')
})

test('ellipsis renders a visually-hidden label', () => {
  render(<Breadcrumb.Ellipsis label="More crumbs" />)
  expect(screen.getByText('More crumbs')).toBeInTheDocument()
})

test('renders without axe violations', async () => {
  const { container } = render(<Example />)
  const results = await axe(container)
  expect(results.violations).toHaveLength(0)
})

test('forwards ref to the nav element', () => {
  const ref = createRef<HTMLElement>()
  render(
    <Breadcrumb ref={ref}>
      <Breadcrumb.List />
    </Breadcrumb>,
  )
  expect(ref.current?.tagName).toBe('NAV')
})
