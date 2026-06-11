import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { DataList } from './data-list'

const renderDataList = () =>
  render(
    <DataList.Root>
      <DataList.Item>
        <DataList.Label>Status</DataList.Label>
        <DataList.Value>Authorized</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Owner</DataList.Label>
        <DataList.Value>Ada Lovelace</DataList.Value>
      </DataList.Item>
    </DataList.Root>,
  )

test('renders label/value pairs without axe violations', async () => {
  const { container } = renderDataList()
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByText('Status')).toBeInTheDocument()
  expect(screen.getByText('Authorized')).toBeInTheDocument()
})

test('applies slot classes', () => {
  renderDataList()

  expect(screen.getByText('Status')).toHaveClass('stalk-data-list__label')
  expect(screen.getByText('Authorized')).toHaveClass('stalk-data-list__value')
})

test('tints the label when a tone is set', () => {
  render(
    <DataList.Root>
      <DataList.Item>
        <DataList.Label tone="success">Status</DataList.Label>
        <DataList.Value>Authorized</DataList.Value>
      </DataList.Item>
    </DataList.Root>,
  )

  expect(screen.getByText('Status')).toHaveClass('color-palette_success')
})

test('throws when subcomponents render outside the root', () => {
  expect(() => render(<DataList.Label>Detached</DataList.Label>)).toThrow(
    /must be rendered inside <DataListRoot>/,
  )
})
