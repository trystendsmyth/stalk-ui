import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { HeatMap } from './heatmap'

const rows = ['A', 'B']
const columns = ['X', 'Y']
const values: Record<string, Record<string, number | null>> = {
  A: { X: 10, Y: 90 },
  B: { X: 50, Y: null },
}

const renderHeatMap = (extra?: Partial<Parameters<typeof HeatMap>[0]>) =>
  render(
    <HeatMap
      rows={rows}
      columns={columns}
      cell={(row, column) => values[row]?.[column] ?? null}
      aria-label="Sample grid"
      {...extra}
    />,
  )

test('renders an accessible labeled matrix without axe violations', async () => {
  const { container } = renderHeatMap()

  expect(screen.getByRole('table', { name: 'Sample grid' })).toBeInTheDocument()
  expect(screen.getByRole('columnheader', { name: 'X' })).toBeInTheDocument()
  expect(screen.getByRole('rowheader', { name: 'A' })).toBeInTheDocument()
  expect((await axe(container)).violations).toHaveLength(0)
})

test('buckets sequential values into ramp levels and labels them', () => {
  renderHeatMap()

  // Low value → low level, high value → high level.
  const low = screen.getByLabelText('A, X: 10')
  const high = screen.getByLabelText('A, Y: 90')
  expect(Number(low.getAttribute('data-level'))).toBeLessThan(
    Number(high.getAttribute('data-level')),
  )
  expect(high).toHaveAttribute('title', 'A, Y: 90')
})

test('marks missing data as empty', () => {
  renderHeatMap({ emptyLabel: 'No reading' })

  const empty = screen.getByLabelText('B, Y: No reading')
  expect(empty).toHaveAttribute('data-empty')
  expect(empty).not.toHaveAttribute('data-level')
})

test('splits diverging values around the midpoint', () => {
  render(
    <HeatMap
      rows={['R']}
      columns={['neg', 'zero', 'pos']}
      scale="diverging"
      midpoint={0}
      cell={(_row, column) => (column === 'neg' ? -8 : column === 'pos' ? 8 : 0)}
      aria-label="Diverging"
    />,
  )

  expect(screen.getByLabelText('R, neg: -8')).toHaveAttribute('data-tone', 'neg')
  expect(screen.getByLabelText('R, zero: 0')).toHaveAttribute('data-tone', 'mid')
  expect(screen.getByLabelText('R, pos: 8')).toHaveAttribute('data-tone', 'pos')
})

test('makes cells focusable when inspectable', () => {
  renderHeatMap({ inspectable: true })

  expect(screen.getByLabelText('A, X: 10')).toHaveAttribute('tabindex', '0')
})
