import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { Tag } from './tag'

const variants = ['solid', 'subtle', 'outline'] as const

test.each(variants)('renders %s variant without axe violations', async (variant) => {
  const { container } = render(<Tag variant={variant}>Frontend</Tag>)
  const results = await axe(container)
  expect(results.violations).toHaveLength(0)
  expect(screen.getByText('Frontend')).toBeInTheDocument()
})

test('renders a count when provided', () => {
  render(<Tag count={42}>Errors</Tag>)
  expect(screen.getByText('42')).toBeInTheDocument()
})

test('does not render count when nullish or empty', () => {
  render(
    <>
      <Tag>NoCount</Tag>
      <Tag count="">Empty</Tag>
    </>,
  )
  expect(screen.queryByText('0')).not.toBeInTheDocument()
})

test('invokes onClose when the close button is clicked', async () => {
  const user = userEvent.setup()
  const onClose = vi.fn()
  render(
    <Tag onClose={onClose} closeAriaLabel="Dismiss tag">
      Removable
    </Tag>,
  )
  await user.click(screen.getByRole('button', { name: 'Dismiss tag' }))
  expect(onClose).toHaveBeenCalledTimes(1)
})

test('close button click does not bubble to onClick', async () => {
  const user = userEvent.setup()
  const onClick = vi.fn()
  const onClose = vi.fn()
  render(
    <Tag onClick={onClick} onClose={onClose}>
      Removable
    </Tag>,
  )
  await user.click(screen.getByRole('button', { name: 'Remove' }))
  expect(onClose).toHaveBeenCalledTimes(1)
  expect(onClick).not.toHaveBeenCalled()
})

test('is keyboard activatable when interactive', async () => {
  const user = userEvent.setup()
  const onClick = vi.fn()
  render(<Tag onClick={onClick}>Click me</Tag>)
  const tag = screen.getByRole('button', { name: 'Click me' })
  tag.focus()
  await user.keyboard('{Enter}')
  await user.keyboard(' ')
  expect(onClick).toHaveBeenCalledTimes(2)
})

test('forwards refs and attributes', () => {
  const ref = createRef<HTMLSpanElement>()
  render(
    <Tag ref={ref} data-testid="tag">
      Beta
    </Tag>,
  )
  expect(screen.getByTestId('tag')).toBe(ref.current)
})
