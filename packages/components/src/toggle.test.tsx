import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { Toggle, ToggleGroup, ToggleGroupItem } from './toggle'

test('renders without axe violations', async () => {
  const { container } = render(<Toggle aria-label="Bold">B</Toggle>)
  const results = await axe(container)
  expect(results.violations).toHaveLength(0)
})

test('toggles pressed state on click', async () => {
  const user = userEvent.setup()
  render(<Toggle aria-label="Bold">B</Toggle>)
  const button = screen.getByRole('button', { name: 'Bold' })
  expect(button).toHaveAttribute('aria-pressed', 'false')
  await user.click(button)
  expect(button).toHaveAttribute('aria-pressed', 'true')
})

test('does not toggle while disabled', async () => {
  const user = userEvent.setup()
  render(
    <Toggle aria-label="Bold" disabled>
      B
    </Toggle>,
  )
  const button = screen.getByRole('button', { name: 'Bold' })
  await user.click(button)
  expect(button).toHaveAttribute('aria-pressed', 'false')
})

test('ToggleGroup single-select reports the selected value', async () => {
  const user = userEvent.setup()
  const onValueChange = vi.fn()
  render(
    <ToggleGroup aria-label="Alignment" onValueChange={onValueChange} type="single">
      <ToggleGroupItem value="left">L</ToggleGroupItem>
      <ToggleGroupItem value="center">C</ToggleGroupItem>
      <ToggleGroupItem value="right">R</ToggleGroupItem>
    </ToggleGroup>,
  )
  await user.click(screen.getByRole('radio', { name: 'C' }))
  expect(onValueChange).toHaveBeenLastCalledWith('center')
})

test('ToggleGroup multi-select reports an array', async () => {
  const user = userEvent.setup()
  const onValueChange = vi.fn()
  render(
    <ToggleGroup aria-label="Format" onValueChange={onValueChange} type="multiple">
      <ToggleGroupItem value="bold">B</ToggleGroupItem>
      <ToggleGroupItem value="italic">I</ToggleGroupItem>
    </ToggleGroup>,
  )
  await user.click(screen.getByRole('button', { name: 'B' }))
  await user.click(screen.getByRole('button', { name: 'I' }))
  expect(onValueChange).toHaveBeenLastCalledWith(['bold', 'italic'])
})

test('attached ToggleGroup renders items', () => {
  render(
    <ToggleGroup aria-label="Alignment" attached type="single">
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
    </ToggleGroup>,
  )
  expect(screen.getAllByRole('radio')).toHaveLength(2)
})
