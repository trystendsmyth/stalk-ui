import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { Tour } from './tour'

const steps = [
  { target: '#queue', title: 'Triage queue', description: 'Work items land here.' },
  { target: '#filters', title: 'Filters' },
]

const Harness = ({ onOpenChange = vi.fn() }: { onOpenChange?: (open: boolean) => void }) => (
  <div>
    <div id="queue">queue</div>
    <div id="filters">filters</div>
    <Tour open steps={steps} onOpenChange={onOpenChange} />
  </div>
)

test('renders the active step card without axe violations', async () => {
  render(<Harness />)
  const dialog = screen.getByRole('dialog', { name: 'Triage queue' })

  expect(dialog).toBeInTheDocument()
  expect(screen.getByText('1 / 2')).toBeInTheDocument()
  expect((await axe(dialog)).violations).toHaveLength(0)
})

test('next/back walk the steps; the last step closes with the done label', async () => {
  const user = userEvent.setup()
  const onOpenChange = vi.fn()
  render(<Harness onOpenChange={onOpenChange} />)

  await user.click(screen.getByRole('button', { name: 'Next' }))
  expect(screen.getByText('Filters')).toBeInTheDocument()
  expect(screen.getByText('2 / 2')).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: 'Back' }))
  expect(screen.getByText('Triage queue')).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: 'Next' }))
  await user.click(screen.getByRole('button', { name: 'Done' }))
  expect(onOpenChange).toHaveBeenCalledWith(false)
})

test('skip and Escape close the tour', async () => {
  const user = userEvent.setup()
  const onOpenChange = vi.fn()
  render(<Harness onOpenChange={onOpenChange} />)

  await user.click(screen.getByRole('button', { name: 'Skip' }))
  expect(onOpenChange).toHaveBeenCalledWith(false)

  onOpenChange.mockClear()
  await user.keyboard('{Escape}')
  expect(onOpenChange).toHaveBeenCalledWith(false)
})

test('renders nothing when closed', () => {
  render(
    <div>
      <div id="queue" />
      <Tour open={false} steps={steps} onOpenChange={vi.fn()} />
    </div>,
  )

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
