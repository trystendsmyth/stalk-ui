import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { ColorPicker } from './color-picker'

function Example(props: { onValueChange?: (value: string) => void; value?: string }) {
  const rootProps = {
    defaultValue: '#4f46e5',
    ...(props.value !== undefined ? { value: props.value } : {}),
    ...(props.onValueChange ? { onValueChange: props.onValueChange } : {}),
  }
  return (
    <ColorPicker {...rootProps}>
      <ColorPicker.Trigger aria-label="Pick a color" />
      <ColorPicker.Content>
        <ColorPicker.Picker />
        <ColorPicker.Controls>
          <ColorPicker.Input aria-label="Hex value" />
        </ColorPicker.Controls>
        <ColorPicker.Swatches>
          <ColorPicker.Swatch color="#ef4444" />
          <ColorPicker.Swatch color="#22c55e" />
        </ColorPicker.Swatches>
      </ColorPicker.Content>
    </ColorPicker>
  )
}

test('renders the trigger without axe violations', async () => {
  const { container } = render(<Example />)
  expect(screen.getByRole('button', { name: 'Pick a color' })).toBeInTheDocument()
  expect((await axe(container)).violations).toHaveLength(0)
})

test('opens the picker and selects a preset swatch', async () => {
  const user = userEvent.setup()
  const onValueChange = vi.fn()
  render(<Example onValueChange={onValueChange} />)

  await user.click(screen.getByRole('button', { name: 'Pick a color' }))
  const swatch = await screen.findByRole('button', { name: '#ef4444' })
  await user.click(swatch)
  expect(onValueChange).toHaveBeenCalledWith('#ef4444')
})

test('reflects the controlled value in the hex input', async () => {
  const user = userEvent.setup()
  render(<Example value="#123456" />)
  await user.click(screen.getByRole('button', { name: 'Pick a color' }))
  expect(await screen.findByLabelText('Hex value')).toHaveValue('#123456')
})

test('marks the active swatch with aria-pressed', async () => {
  const user = userEvent.setup()
  render(<Example value="#ef4444" />)
  await user.click(screen.getByRole('button', { name: 'Pick a color' }))
  expect(await screen.findByRole('button', { name: '#ef4444' })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
})
