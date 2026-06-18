import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { NumberInput } from './number-input'

test('renders a spinbutton without axe violations', async () => {
  const { container } = render(<NumberInput aria-label="Quantity" defaultValue={1} />)
  expect(screen.getByRole('spinbutton', { name: 'Quantity' })).toBeInTheDocument()
  expect((await axe(container)).violations).toHaveLength(0)
})

test('increments and decrements via the stepper buttons', async () => {
  const user = userEvent.setup()
  const onValueChange = vi.fn()
  render(<NumberInput aria-label="Quantity" defaultValue={1} onValueChange={onValueChange} />)
  await user.click(screen.getByRole('button', { name: 'Increment' }))
  expect(onValueChange).toHaveBeenLastCalledWith(2)
  await user.click(screen.getByRole('button', { name: 'Decrement' }))
  expect(onValueChange).toHaveBeenLastCalledWith(1)
})

test('steps with ArrowUp / ArrowDown', async () => {
  const user = userEvent.setup()
  const onValueChange = vi.fn()
  render(
    <NumberInput aria-label="Quantity" defaultValue={5} onValueChange={onValueChange} step={2} />,
  )
  const field = screen.getByRole('spinbutton')
  field.focus()
  await user.keyboard('{ArrowUp}')
  expect(onValueChange).toHaveBeenLastCalledWith(7)
  await user.keyboard('{ArrowDown}')
  expect(onValueChange).toHaveBeenLastCalledWith(5)
})

test('clamps to max on blur and reflects aria-valuenow', async () => {
  const user = userEvent.setup()
  const onValueChange = vi.fn()
  render(<NumberInput aria-label="Quantity" max={10} min={0} onValueChange={onValueChange} />)
  const field = screen.getByRole('spinbutton')
  await user.type(field, '99')
  await user.tab()
  expect(onValueChange).toHaveBeenLastCalledWith(10)
  expect(field).toHaveAttribute('aria-valuenow', '10')
})

test('disables increment at max and decrement at min', () => {
  render(<NumberInput aria-label="Quantity" max={3} min={0} value={3} />)
  expect(screen.getByRole('button', { name: 'Increment' })).toBeDisabled()
  expect(screen.getByRole('button', { name: 'Decrement' })).not.toBeDisabled()
})
