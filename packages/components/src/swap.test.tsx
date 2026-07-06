import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Swap } from './swap'

test('shows the active side and hides the inactive one from assistive tech', async () => {
  const { container, rerender } = render(
    <button type="button" aria-label="Toggle theme">
      <Swap off={<span>moon</span>} on={<span>sun</span>} swap />
    </button>,
  )

  expect(screen.getByText('sun').closest('[data-state]')).toHaveAttribute('data-state', 'open')
  expect(screen.getByText('moon').closest('[data-state]')).toHaveAttribute('aria-hidden', 'true')
  expect(container.querySelector('[data-swap]')).toHaveAttribute('data-swap', 'on')
  expect((await axe(container)).violations).toHaveLength(0)

  rerender(
    <button type="button" aria-label="Toggle theme">
      <Swap off={<span>moon</span>} on={<span>sun</span>} swap={false} />
    </button>,
  )
  expect(screen.getByText('moon').closest('[data-state]')).toHaveAttribute('data-state', 'open')
  expect(screen.getByText('sun').closest('[data-state]')).toHaveAttribute('aria-hidden', 'true')
  expect(container.querySelector('[data-swap]')).toHaveAttribute('data-swap', 'off')
})

test('effect variant applies its recipe class', () => {
  const { container, rerender } = render(<Swap effect="rotate" off="B" on="A" swap />)
  expect(container.querySelector('[data-swap]')).toHaveClass('stalk-swap__root--rotate')

  rerender(<Swap effect="scale" off="B" on="A" swap />)
  expect(container.querySelector('[data-swap]')).toHaveClass('stalk-swap__root--scale')
})
