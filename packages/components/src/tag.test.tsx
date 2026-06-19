import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { Tag } from './tag'

const variants = ['solid', 'subtle', 'outline'] as const

test.each(variants)('renders %s variant without axe violations', async (variant) => {
  const { container } = render(
    <Tag variant={variant}>
      <Tag.Label>Frontend</Tag.Label>
    </Tag>,
  )
  const results = await axe(container)
  expect(results.violations).toHaveLength(0)
  expect(screen.getByText('Frontend')).toBeInTheDocument()
})

test('renders a count via Tag.Count', () => {
  render(
    <Tag>
      <Tag.Label>Errors</Tag.Label>
      <Tag.Count>42</Tag.Count>
    </Tag>,
  )
  expect(screen.getByText('42')).toBeInTheDocument()
})

test('renders an avatar image with the provided src', () => {
  render(
    <Tag>
      <Tag.Avatar alt="Ada" src="/ada.png" />
      <Tag.Label>Ada</Tag.Label>
    </Tag>,
  )
  expect(screen.getByRole('img', { name: 'Ada' })).toHaveAttribute('src', '/ada.png')
})

test('renders avatar fallback children when no src is provided', () => {
  render(
    <Tag>
      <Tag.Avatar>AB</Tag.Avatar>
      <Tag.Label>Ada</Tag.Label>
    </Tag>,
  )
  expect(screen.getByText('AB')).toBeInTheDocument()
})

test('Tag.Close inherits the root onClose and closeAriaLabel', async () => {
  const user = userEvent.setup()
  const onClose = vi.fn()
  render(
    <Tag onClose={onClose} closeAriaLabel="Dismiss tag">
      <Tag.Label>Removable</Tag.Label>
      <Tag.Close />
    </Tag>,
  )
  await user.click(screen.getByRole('button', { name: 'Dismiss tag' }))
  expect(onClose).toHaveBeenCalledTimes(1)
})

test('close button click does not bubble to an interactive root', async () => {
  const user = userEvent.setup()
  const onClick = vi.fn()
  const onClose = vi.fn()
  render(
    <Tag onClick={onClick} onClose={onClose}>
      <Tag.Label>Removable</Tag.Label>
      <Tag.Close />
    </Tag>,
  )
  await user.click(screen.getByRole('button', { name: 'Remove' }))
  expect(onClose).toHaveBeenCalledTimes(1)
  expect(onClick).not.toHaveBeenCalled()
})

test('is keyboard activatable when interactive', async () => {
  const user = userEvent.setup()
  const onClick = vi.fn()
  render(
    <Tag onClick={onClick}>
      <Tag.Label>Click me</Tag.Label>
    </Tag>,
  )
  const tag = screen.getByRole('button', { name: 'Click me' })
  tag.focus()
  await user.keyboard('{Enter}')
  await user.keyboard(' ')
  expect(onClick).toHaveBeenCalledTimes(2)
})

test('disabled tag is not interactive and disables its close button', async () => {
  const user = userEvent.setup()
  const onClick = vi.fn()
  const onClose = vi.fn()
  render(
    <Tag disabled onClick={onClick} onClose={onClose}>
      <Tag.Label>Disabled</Tag.Label>
      <Tag.Close />
    </Tag>,
  )
  // No clickable role=button is exposed for a disabled chip.
  expect(screen.queryByRole('button', { name: 'Disabled' })).not.toBeInTheDocument()
  const close = screen.getByRole('button', { name: 'Remove' })
  expect(close).toBeDisabled()
  await user.click(close)
  expect(onClose).not.toHaveBeenCalled()
  expect(onClick).not.toHaveBeenCalled()
})

test('forwards refs and attributes', () => {
  const ref = createRef<HTMLSpanElement>()
  render(
    <Tag ref={ref} data-testid="tag">
      <Tag.Label>Beta</Tag.Label>
    </Tag>,
  )
  expect(screen.getByTestId('tag')).toBe(ref.current)
})
