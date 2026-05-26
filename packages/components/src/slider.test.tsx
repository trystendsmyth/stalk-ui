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
