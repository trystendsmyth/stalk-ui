import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterAll, beforeAll, expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Tooltip } from './tooltip'

const originalResizeObserver = globalThis.ResizeObserver

class ResizeObserverMock implements ResizeObserver {
  disconnect = () => undefined

  observe = () => undefined

  unobserve = () => undefined
}

beforeAll(() => {
  globalThis.ResizeObserver = ResizeObserverMock
})

afterAll(() => {
  globalThis.ResizeObserver = originalResizeObserver
})

const renderTooltip = (open = true) =>
  render(
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root defaultOpen={open}>
        <Tooltip.Trigger>Help</Tooltip.Trigger>
        <Tooltip.Content>Helpful context</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>,
  )

test('renders an accessible tooltip without axe violations', async () => {
  const { container } = renderTooltip()
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('tooltip')).toBeInTheDocument()
})

test('opens on hover', async () => {
  const user = userEvent.setup()
  renderTooltip(false)

  await user.hover(screen.getByRole('button', { name: 'Help' }))

  expect(await screen.findByRole('tooltip')).toHaveTextContent('Helpful context')
})

test('renders custom content', () => {
  render(
    <Tooltip.Provider>
      <Tooltip.Root defaultOpen>
        <Tooltip.Trigger>Help</Tooltip.Trigger>
        <Tooltip.Content className="custom-tooltip">Helpful context</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>,
  )

  expect(screen.getByRole('tooltip')).toHaveTextContent('Helpful context')
})
