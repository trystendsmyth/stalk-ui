import { useState } from 'react'
import { HStack, VStack } from 'styled-system/jsx'

import { ColorPicker } from './color-picker'

import type { Meta, StoryObj } from '@storybook/react-vite'

const PRESETS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899']

const meta = {
  title: 'Components/Forms/Color Picker',
  component: ColorPicker,
  tags: ['autodocs', 'stable'],
  args: { children: null },
  parameters: {
    docs: {
      description: {
        component:
          'A popover color picker built on react-colorful. Compose Trigger, Content, Picker, ' +
          'Input, Swatches, and an optional EyeDropper (rendered only where supported).',
      },
    },
  },
} satisfies Meta<typeof ColorPicker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ColorPicker defaultValue="#4f46e5">
      <ColorPicker.Trigger aria-label="Brand color" />
      <ColorPicker.Content>
        <ColorPicker.Picker />
        <ColorPicker.Controls>
          <ColorPicker.Input aria-label="Hex value" />
          <ColorPicker.EyeDropper />
        </ColorPicker.Controls>
        <ColorPicker.Swatches>
          {PRESETS.map((color) => (
            <ColorPicker.Swatch key={color} color={color} />
          ))}
        </ColorPicker.Swatches>
      </ColorPicker.Content>
    </ColorPicker>
  ),
}

export const WithAlpha: Story = {
  render: () => (
    <ColorPicker alpha defaultValue="#4f46e5cc">
      <ColorPicker.Trigger aria-label="Overlay color" />
      <ColorPicker.Content>
        <ColorPicker.Picker />
        <ColorPicker.Controls>
          <ColorPicker.Input aria-label="Hex value" />
        </ColorPicker.Controls>
      </ColorPicker.Content>
    </ColorPicker>
  ),
}

export const Controlled: Story = {
  render: () => {
    function Demo() {
      const [color, setColor] = useState('#22c55e')
      return (
        <VStack alignItems="flex-start" gap="12">
          <ColorPicker onValueChange={setColor} value={color}>
            <ColorPicker.Trigger aria-label="Pick a color" />
            <ColorPicker.Content>
              <ColorPicker.Picker />
              <ColorPicker.Controls>
                <ColorPicker.Input aria-label="Hex value" />
              </ColorPicker.Controls>
              <ColorPicker.Swatches>
                {PRESETS.map((swatch) => (
                  <ColorPicker.Swatch key={swatch} color={swatch} />
                ))}
              </ColorPicker.Swatches>
            </ColorPicker.Content>
          </ColorPicker>
          <HStack gap="8">
            <span>Selected:</span>
            <code>{color}</code>
          </HStack>
        </VStack>
      )
    }
    return <Demo />
  },
}
