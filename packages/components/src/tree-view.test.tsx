import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { TreeView } from './tree-view'

const nodes = [
  {
    id: 'site-a',
    label: 'Site A',
    children: [
      { id: 'inv-1', label: 'Inverter 1' },
      { id: 'inv-2', label: 'Inverter 2' },
    ],
  },
  { id: 'site-b', label: 'Site B' },
]

test('renders a WAI-ARIA tree without axe violations', async () => {
  const { container } = render(
    <TreeView aria-label="Devices" defaultExpanded={['site-a']} nodes={nodes} />,
  )

  expect(screen.getByRole('tree', { name: 'Devices' })).toBeInTheDocument()
  expect(screen.getAllByRole('treeitem')).toHaveLength(4)
  expect(screen.getByRole('group')).toBeInTheDocument()
  expect((await axe(container)).violations).toHaveLength(0)
})

test('collapsed branches hide their children; click expands and selects', async () => {
  const user = userEvent.setup()
  const onSelect = vi.fn()
  render(<TreeView aria-label="Devices" nodes={nodes} onSelect={onSelect} />)

  expect(screen.queryByText('Inverter 1')).not.toBeInTheDocument()
  await user.click(screen.getByText('Site A'))

  expect(screen.getByText('Inverter 1')).toBeInTheDocument()
  expect(onSelect).toHaveBeenCalledWith('site-a')
})

test('arrow keys walk visible rows; Right expands; Enter selects', async () => {
  const user = userEvent.setup()
  const onSelect = vi.fn()
  render(<TreeView aria-label="Devices" nodes={nodes} onSelect={onSelect} />)

  const siteA = screen.getByRole('treeitem', { name: /Site A/ })
  siteA.focus()

  await user.keyboard('{ArrowRight}')
  expect(siteA).toHaveAttribute('aria-expanded', 'true')

  await user.keyboard('{ArrowDown}')
  expect(screen.getByRole('treeitem', { name: 'Inverter 1' })).toHaveFocus()

  await user.keyboard('{Enter}')
  expect(onSelect).toHaveBeenCalledWith('inv-1')

  await user.keyboard('{ArrowLeft}')
  expect(siteA).toHaveFocus()
})

test('marks the selected row', () => {
  render(<TreeView aria-label="Devices" nodes={nodes} selected="site-b" />)

  expect(screen.getByRole('treeitem', { name: 'Site B' })).toHaveAttribute('aria-selected', 'true')
})
