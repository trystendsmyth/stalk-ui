import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { Rating } from './rating'

test('renders a radiogroup of stars without axe violations', async () => {
  const { container } = render(<Rating aria-label="Quality" defaultValue={3} />)

  expect(screen.getByRole('radiogroup', { name: 'Quality' })).toBeInTheDocument()
  expect(screen.getAllByRole('radio')).toHaveLength(5)
  expect(screen.getByRole('radio', { name: '3 stars' })).toHaveAttribute('aria-checked', 'true')
  expect((await axe(container)).violations).toHaveLength(0)
})

test('click selects; arrows adjust from the current value', async () => {
  const user = userEvent.setup()
  const onChange = vi.fn()
  render(<Rating aria-label="Quality" defaultValue={2} onChange={onChange} />)

  await user.click(screen.getByRole('radio', { name: '4 stars' }))
  expect(onChange).toHaveBeenLastCalledWith(4)

  screen.getByRole('radio', { name: '4 stars' }).focus()
  await user.keyboard('{ArrowRight}')
  expect(onChange).toHaveBeenLastCalledWith(5)
})

test('readOnly ignores interaction', async () => {
  const user = userEvent.setup()
  const onChange = vi.fn()
  render(<Rating aria-label="Quality" readOnly value={4} onChange={onChange} />)

  await user.click(screen.getByRole('radio', { name: '2 stars' }))
  expect(onChange).not.toHaveBeenCalled()
})

test('marks active items for the fill styling', () => {
  render(<Rating aria-label="Quality" value={2} />)

  expect(screen.getByRole('radio', { name: '1 star' })).toHaveAttribute('data-active')
  expect(screen.getByRole('radio', { name: '2 stars' })).toHaveAttribute('data-active')
  expect(screen.getByRole('radio', { name: '3 stars' })).not.toHaveAttribute('data-active')
})
