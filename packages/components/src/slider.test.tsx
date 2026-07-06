import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { Slider } from './slider'

test('renders an accessible slider', async () => {
  const { container } = render(<Slider aria-label="Volume" defaultValue={[40]} />)
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  const thumb = screen.getByRole('slider', { name: 'Volume' })
  expect(thumb).toHaveAttribute('aria-valuenow', '40')
})

test('renders one thumb per value entry', () => {
  render(<Slider aria-label="Range" defaultValue={[20, 80]} />)
  const thumbs = screen.getAllByRole('slider')
  expect(thumbs).toHaveLength(2)
  expect(thumbs[0]).toHaveAttribute('aria-valuenow', '20')
  expect(thumbs[1]).toHaveAttribute('aria-valuenow', '80')
})

test('updates value with arrow keys', async () => {
  const user = userEvent.setup()
  const onValueChange = vi.fn()

  render(
    <Slider
      aria-label="Volume"
      defaultValue={[40]}
      max={100}
      min={0}
      onValueChange={onValueChange}
      step={1}
    />,
  )

  const thumb = screen.getByRole('slider', { name: 'Volume' })
  thumb.focus()
  await user.keyboard('{ArrowRight}')

  expect(onValueChange).toHaveBeenCalledWith([41])
})

test('honors disabled state', () => {
  render(<Slider aria-label="Volume" defaultValue={[40]} disabled />)
  const thumb = screen.getByRole('slider', { name: 'Volume' })
  expect(thumb).toHaveAttribute('data-disabled')
})

test('circular shape renders an accessible single-value knob', async () => {
  const { container } = render(
    <Slider aria-label="Target output" defaultValue={[65]} shape="circular" showValue />,
  )

  const knob = screen.getByRole('slider', { name: 'Target output' })
  expect(knob).toHaveAttribute('aria-valuenow', '65')
  expect(knob).toHaveAttribute('aria-valuemin', '0')
  expect(knob).toHaveAttribute('aria-valuemax', '100')
  expect(screen.getByText('65')).toBeInTheDocument()
  expect((await axe(container)).violations).toHaveLength(0)
})

test('circular knob responds to keyboard input', async () => {
  const user = userEvent.setup()
  const onValueChange = vi.fn()
  render(
    <Slider
      aria-label="Target output"
      defaultValue={[65]}
      shape="circular"
      step={5}
      onValueChange={onValueChange}
    />,
  )

  const knob = screen.getByRole('slider', { name: 'Target output' })
  knob.focus()
  await user.keyboard('{ArrowUp}')
  expect(onValueChange).toHaveBeenCalledWith([70])

  await user.keyboard('{End}')
  expect(onValueChange).toHaveBeenCalledWith([100])

  await user.keyboard('{Home}')
  expect(onValueChange).toHaveBeenCalledWith([0])
})

test('disabled circular knob ignores input', async () => {
  const user = userEvent.setup()
  const onValueChange = vi.fn()
  render(
    <Slider
      aria-label="Target output"
      defaultValue={[65]}
      disabled
      shape="circular"
      onValueChange={onValueChange}
    />,
  )

  const knob = screen.getByRole('slider', { name: 'Target output' })
  expect(knob).toHaveAttribute('data-disabled')
  knob.focus()
  await user.keyboard('{ArrowUp}')
  expect(onValueChange).not.toHaveBeenCalled()
})
