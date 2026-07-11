import { render, screen } from '@testing-library/react'
import { useState } from 'react'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { Sortable } from './sortable'

import type { SortableId } from './sortable'

interface Task {
  id: SortableId
  label: string
}

const tasks: Task[] = [
  { id: 'a', label: 'First' },
  { id: 'b', label: 'Second' },
  { id: 'c', label: 'Third' },
]

const List = ({ onReorder }: { onReorder?: (items: Task[]) => void }) => {
  const [items, setItems] = useState(tasks)
  return (
    <Sortable
      items={items}
      onReorder={(next) => {
        setItems(next)
        onReorder?.(next)
      }}
      aria-label="Tasks"
    >
      {items.map((task, index) => (
        <Sortable.Item key={task.id} id={task.id} index={index}>
          <Sortable.Handle />
          <span>{task.label}</span>
        </Sortable.Item>
      ))}
    </Sortable>
  )
}

test('renders an accessible list with labelled drag handles', async () => {
  const { container } = render(<List />)

  expect(screen.getByText('First')).toBeInTheDocument()
  const handles = screen.getAllByRole('button', { name: 'Drag to reorder' })
  expect(handles).toHaveLength(3)
  expect((await axe(container)).violations).toHaveLength(0)
})

test('the whole item is draggable when no handle is rendered', () => {
  render(
    <Sortable items={tasks} onReorder={vi.fn()} aria-label="Tasks">
      {tasks.map((task, index) => (
        <Sortable.Item key={task.id} id={task.id} index={index}>
          <span>{task.label}</span>
        </Sortable.Item>
      ))}
    </Sortable>,
  )

  expect(screen.queryByRole('button', { name: 'Drag to reorder' })).not.toBeInTheDocument()
  expect(screen.getByText('Second')).toBeInTheDocument()
})

test('throws when Handle is rendered outside an Item', () => {
  const restore = console.error
  console.error = () => undefined
  expect(() => render(<Sortable.Handle />)).toThrow(/must be rendered inside/)
  console.error = restore
})
