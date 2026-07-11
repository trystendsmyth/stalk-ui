import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { installVirtualLayoutMocks } from './test/virtual-layout'
import { VirtualList } from './virtual-list'

let restoreLayout: () => void
beforeEach(() => {
  restoreLayout = installVirtualLayoutMocks({ itemSize: 48, viewport: 200 })
})
afterEach(() => {
  restoreLayout()
})

interface Row {
  id: number
  label: string
}

const makeRows = (count: number): Row[] =>
  Array.from({ length: count }, (_, index) => ({ id: index, label: `Item ${String(index + 1)}` }))

const renderList = (count: number) =>
  render(
    <VirtualList items={makeRows(count)} estimateSize={() => 48} getItemKey={(row) => row.id}>
      {(row, virtualItem) => (
        <VirtualList.Item key={row.id} virtualItem={virtualItem} data-testid="row">
          {row.label}
        </VirtualList.Item>
      )}
    </VirtualList>,
  )

test('renders without axe violations', async () => {
  const { container } = renderList(20)
  expect((await axe(container)).violations).toHaveLength(0)
})

// JSDOM reports a 0px viewport (no layout engine), so the virtualizer keeps the
// window tiny. That is exactly what proves windowing: 5000 rows must not all mount.
test('only renders a windowed subset of a large backlog', () => {
  renderList(5_000)
  const rendered = screen.getAllByTestId('row')
  expect(rendered.length).toBeGreaterThan(0)
  expect(rendered.length).toBeLessThan(200)
})

test('throws when Item is rendered outside a VirtualList', () => {
  // Suppress React's error-boundary console noise for the expected throw.
  const restore = console.error
  console.error = () => undefined
  expect(() =>
    render(
      <VirtualList.Item virtualItem={{ index: 0, start: 0, size: 48, end: 48, key: 0, lane: 0 }}>
        orphan
      </VirtualList.Item>,
    ),
  ).toThrow(/must be rendered inside/)
  console.error = restore
})
