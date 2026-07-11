import { useState } from 'react'
import { css } from 'styled-system/css'

import { Sortable } from './sortable'

import type { SortableId } from './sortable'
import type { Meta, StoryObj } from '@storybook/react-vite'

interface Task {
  id: SortableId
  label: string
}

const initialTasks: Task[] = [
  { id: 'a', label: 'Draft the RFC' },
  { id: 'b', label: 'Review with the team' },
  { id: 'c', label: 'Prototype the API' },
  { id: 'd', label: 'Write the migration guide' },
]

const meta = {
  title: 'Components/Tables & Lists/Sortable',
  component: Sortable,
  tags: ['autodocs', 'stable'],
  // Each story renders its own controlled list; these defaults satisfy the
  // required props so stories can be `render`-only.
  args: {
    items: initialTasks,
    onReorder: () => undefined,
    children: null,
  },
  argTypes: {
    items: { table: { disable: true } },
    onReorder: { table: { disable: true } },
    children: { table: { disable: true } },
  },
} satisfies Meta<typeof Sortable<Task>>

export default meta

type Story = StoryObj<typeof meta>

const frame = css({ w: '360px' })
const label = css({ flex: '1' })

export const Default: Story = {
  render: () => {
    const [tasks, setTasks] = useState(initialTasks)
    return (
      <div className={frame}>
        <Sortable items={tasks} onReorder={setTasks}>
          {tasks.map((task, index) => (
            <Sortable.Item key={task.id} id={task.id} index={index}>
              <Sortable.Handle />
              <span className={label}>{task.label}</span>
            </Sortable.Item>
          ))}
        </Sortable>
      </div>
    )
  },
}

// The whole item is draggable when no `Sortable.Handle` is rendered.
export const WithoutHandle: Story = {
  render: () => {
    const [tasks, setTasks] = useState(initialTasks)
    return (
      <div className={frame}>
        <Sortable items={tasks} onReorder={setTasks}>
          {tasks.map((task, index) => (
            <Sortable.Item key={task.id} id={task.id} index={index}>
              <span className={label}>{task.label}</span>
            </Sortable.Item>
          ))}
        </Sortable>
      </div>
    )
  },
}

// The primitive composes into a board: one `Sortable` per column. (A full Kanban
// component is intentionally left to consumers.)
export const KanbanShaped: Story = {
  render: () => {
    const [todo, setTodo] = useState<Task[]>([
      { id: 't1', label: 'Spec the feature' },
      { id: 't2', label: 'Design review' },
    ])
    const [done, setDone] = useState<Task[]>([{ id: 'd1', label: 'Kickoff' }])
    const column = css({
      bgColor: 'bg.subtle',
      border: 'default',
      minH: '160px',
      p: '12',
      rounded: 'lg',
      w: '240px',
    })
    const heading = css({ color: 'fg.muted', mb: '8', textStyle: 'bodySm' })

    return (
      <div className={css({ display: 'flex', gap: '16' })}>
        <div className={column}>
          <p className={heading}>To do</p>
          <Sortable items={todo} onReorder={setTodo}>
            {todo.map((task, index) => (
              <Sortable.Item key={task.id} id={task.id} index={index}>
                <Sortable.Handle />
                <span className={label}>{task.label}</span>
              </Sortable.Item>
            ))}
          </Sortable>
        </div>
        <div className={column}>
          <p className={heading}>Done</p>
          <Sortable items={done} onReorder={setDone}>
            {done.map((task, index) => (
              <Sortable.Item key={task.id} id={task.id} index={index}>
                <Sortable.Handle />
                <span className={label}>{task.label}</span>
              </Sortable.Item>
            ))}
          </Sortable>
        </div>
      </div>
    )
  },
}
