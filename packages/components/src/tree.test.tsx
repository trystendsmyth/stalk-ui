import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { Tree } from './tree'

const nodes = [
  {
    id: 'src',
    label: 'src',
    children: [
      { id: 'app-tsx', label: 'App.tsx' },
      { id: 'index-ts', label: 'index.ts' },
    ],
  },
  { id: 'docs', label: 'docs' },
]

test('renders a WAI-ARIA tree without axe violations', async () => {
  const { container } = render(<Tree aria-label="Files" defaultExpanded={['src']} nodes={nodes} />)

  expect(screen.getByRole('tree', { name: 'Files' })).toBeInTheDocument()
  expect(screen.getAllByRole('treeitem')).toHaveLength(4)
  expect(screen.getByRole('group')).toBeInTheDocument()
  expect((await axe(container)).violations).toHaveLength(0)
})

test('collapsed branches hide their children; click expands and selects', async () => {
  const user = userEvent.setup()
  const onSelectedChange = vi.fn()
  render(<Tree aria-label="Files" nodes={nodes} onSelectedChange={onSelectedChange} />)

  expect(screen.queryByText('App.tsx')).not.toBeInTheDocument()
  await user.click(screen.getByText('src'))

  expect(screen.getByText('App.tsx')).toBeInTheDocument()
  expect(onSelectedChange).toHaveBeenCalledWith(['src'])
})

test('arrow keys walk visible rows; Right expands; Enter selects', async () => {
  const user = userEvent.setup()
  const onSelectedChange = vi.fn()
  render(<Tree aria-label="Files" nodes={nodes} onSelectedChange={onSelectedChange} />)

  const srcBranch = screen.getByRole('treeitem', { name: /src/ })
  srcBranch.focus()

  await user.keyboard('{ArrowRight}')
  expect(srcBranch).toHaveAttribute('aria-expanded', 'true')

  await user.keyboard('{ArrowDown}')
  expect(screen.getByRole('treeitem', { name: 'App.tsx' })).toHaveFocus()

  await user.keyboard('{Enter}')
  expect(onSelectedChange).toHaveBeenCalledWith(['app-tsx'])

  await user.keyboard('{ArrowLeft}')
  expect(srcBranch).toHaveFocus()
})

test('marks the selected row', () => {
  render(<Tree aria-label="Files" nodes={nodes} selected={['docs']} />)

  expect(screen.getByRole('treeitem', { name: 'docs' })).toHaveAttribute('aria-selected', 'true')
})

test('multiple mode toggles rows and supports Ctrl+A over visible rows', async () => {
  const user = userEvent.setup()
  const onSelectedChange = vi.fn()
  render(
    <Tree
      aria-label="Files"
      nodes={nodes}
      selectionMode="multiple"
      onSelectedChange={onSelectedChange}
    />,
  )

  expect(screen.getByRole('tree')).toHaveAttribute('aria-multiselectable', 'true')

  const srcBranch = screen.getByRole('treeitem', { name: /src/ })
  srcBranch.focus()
  await user.keyboard('{Enter}')
  expect(onSelectedChange).toHaveBeenLastCalledWith(['src'])

  // Shift+ArrowDown extends the selection to the next row.
  await user.keyboard('{Shift>}{ArrowDown}{/Shift}')
  expect(onSelectedChange).toHaveBeenLastCalledWith(['src', 'app-tsx'])

  await user.keyboard('{Control>}a{/Control}')
  expect(onSelectedChange).toHaveBeenLastCalledWith(['src', 'app-tsx', 'index-ts', 'docs'])
})

test('multiple mode: plain click toggles membership', async () => {
  const user = userEvent.setup()
  const onSelectedChange = vi.fn()
  render(
    <Tree
      aria-label="Files"
      nodes={nodes}
      selectionMode="multiple"
      onSelectedChange={onSelectedChange}
    />,
  )

  await user.click(screen.getByText('docs'))
  expect(onSelectedChange).toHaveBeenLastCalledWith(['docs'])

  await user.click(screen.getByText('docs'))
  expect(onSelectedChange).toHaveBeenLastCalledWith([])
})

test('typeahead jumps focus to the next matching visible row', async () => {
  const user = userEvent.setup()
  render(<Tree aria-label="Files" nodes={nodes} />)

  screen.getByRole('treeitem', { name: /src/ }).focus()
  await user.keyboard('d')
  expect(screen.getByRole('treeitem', { name: 'docs' })).toHaveFocus()
})

test('"*" expands all sibling branches', async () => {
  const user = userEvent.setup()
  const many = [
    { id: 'a', label: 'A', children: [{ id: 'a-1', label: 'A1' }] },
    { id: 'b', label: 'B', children: [{ id: 'b-1', label: 'B1' }] },
  ]
  render(<Tree aria-label="Files" nodes={many} />)

  // Grab both rows before expanding: an expanded branch's accessible name
  // grows to include its children.
  const branchA = screen.getByRole('treeitem', { name: 'A' })
  const branchB = screen.getByRole('treeitem', { name: 'B' })
  branchA.focus()
  await user.keyboard('*')

  expect(branchA).toHaveAttribute('aria-expanded', 'true')
  expect(branchB).toHaveAttribute('aria-expanded', 'true')
})

test('guides variant applies the guide recipe class', () => {
  render(<Tree aria-label="Files" defaultExpanded={['src']} guides nodes={nodes} />)

  expect(screen.getByRole('group')).toHaveClass('stalk-tree__group--guides')
})

test('variant, size, and radius apply their recipe classes (ghost/md/sm defaults)', () => {
  const { rerender } = render(<Tree aria-label="Files" nodes={nodes} />)
  const row = () => screen.getByRole('tree').querySelector('[data-tree-row]')

  expect(row()).toHaveClass(
    'stalk-tree__row--ghost',
    'stalk-tree__row--md',
    'stalk-tree__row--radius-sm',
  )

  rerender(<Tree aria-label="Files" nodes={nodes} radius="full" size="micro" variant="solid" />)
  expect(row()).toHaveClass(
    'stalk-tree__row--solid',
    'stalk-tree__row--micro',
    'stalk-tree__row--radius-full',
  )

  rerender(<Tree aria-label="Files" fullWidth nodes={nodes} />)
  expect(row()).toHaveClass('stalk-tree__row--full-width')
})
