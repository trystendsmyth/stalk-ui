import '@testing-library/jest-dom/vitest'

import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterAll, afterEach, beforeAll, expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Popover } from './popover'

const originalResizeObserver = globalThis.ResizeObserver

class ResizeObserverMock implements ResizeObserver {
  disconnect = () => undefined

  observe = () => undefined

  unobserve = () => undefined
}

beforeAll(() => {
  globalThis.ResizeObserver = ResizeObserverMock
})

afterEach(() => {
  cleanup()
})

afterAll(() => {
  globalThis.ResizeObserver = originalResizeObserver
})

const renderPopover = (open = true) =>
  render(
    <Popover.Root defaultOpen={open}>
      <Popover.Trigger>Open popover</Popover.Trigger>
      <Popover.Content aria-label="Project actions">
        <p>Manage this project.</p>
        <Popover.Close>Close</Popover.Close>
      </Popover.Content>
    </Popover.Root>,
  )

test('renders an accessible popover without axe violations', async () => {
  const { container } = renderPopover()
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('dialog', { name: 'Project actions' })).toBeInTheDocument()
})

test('opens and closes from trigger controls', async () => {
  const user = userEvent.setup()
  renderPopover(false)

  await user.click(screen.getByRole('button', { name: 'Open popover' }))
  expect(screen.getByRole('dialog', { name: 'Project actions' })).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: 'Close' }))
  expect(screen.queryByRole('dialog', { name: 'Project actions' })).not.toBeInTheDocument()
})

test('renders custom content', () => {
  render(
    <Popover.Root defaultOpen>
      <Popover.Trigger>Open popover</Popover.Trigger>
      <Popover.Content aria-label="Project actions" className="custom-popover">
        Manage this project.
      </Popover.Content>
    </Popover.Root>,
  )

  expect(screen.getByRole('dialog', { name: 'Project actions' })).toHaveTextContent(
    'Manage this project.',
  )
})
