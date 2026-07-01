import { useState } from 'react'
import { css } from 'styled-system/css'
import { HStack, VStack } from 'styled-system/jsx'

import { ColorPicker } from './color-picker'

import type { Meta, StoryObj } from '@storybook/react-vite'

const PRESETS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899']

const circleTrigger = css({ rounded: 'full' })
const circleSwatch = css({ rounded: 'full' })
// `width: max-content` keeps the 8 columns sized to the swatches (no stretching),
// so the cluster stays tight regardless of the panel width.
const swatchGrid = css({
  display: 'grid',
  gap: '6',
  gridTemplateColumns: 'repeat(8, auto)',
  width: 'max-content',
})
// Shrink the panel to the swatch grid so padding is even on all sides
// (overrides the popover recipe's fixed width via the higher utilities layer).
const swatchPanel = css({ p: '8', width: 'fit-content' })

// 3 rows of 8 — warm hues, cool hues, then neutrals.
const SWATCH_PALETTE = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#eab308',
  '#84cc16',
  '#22c55e',
  '#10b981',
  '#14b8a6',
  '#06b6d4',
  '#0ea5e9',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#d946ef',
  '#ec4899',
  '#f43f5e',
  '#78716c',
  '#6b7280',
  '#71717a',
  '#525252',
  '#404040',
  '#262626',
  '#171717',
]

const meta = {
  title: 'Components/Forms/Color Picker',
  component: ColorPicker,
  tags: ['autodocs', 'stable'],
  args: { children: null },
  parameters: {
    // Composed via children (Trigger/Content/Picker/…) — no useful single control.
    controls: { disable: true },
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
      <ColorPicker.Trigger aria-label="Brand color" className={circleTrigger} />
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

export const CircularSwatches: Story = {
  render: () => (
    <ColorPicker defaultValue="#ef4444">
      <ColorPicker.Trigger aria-label="Pick a color" className={circleTrigger} />
      <ColorPicker.Content className={swatchPanel}>
        <ColorPicker.Swatches className={swatchGrid}>
          {SWATCH_PALETTE.map((color) => (
            <ColorPicker.Swatch key={color} className={circleSwatch} color={color} />
          ))}
        </ColorPicker.Swatches>
      </ColorPicker.Content>
    </ColorPicker>
  ),
}

export const WithAlpha: Story = {
  render: () => (
    <ColorPicker alpha defaultValue="#4f46e5cc">
      <ColorPicker.Trigger aria-label="Overlay color" className={circleTrigger} />
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
            <ColorPicker.Trigger aria-label="Pick a color" className={circleTrigger} />
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
