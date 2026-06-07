import { useState } from 'react'
import { css } from 'styled-system/css'
import { VStack } from 'styled-system/jsx'

import { Slider } from './slider'

import type { Meta, StoryObj } from '@storybook/react-vite'

const frame = css({ width: '320px' })

const meta = {
  title: 'Components/Forms/Slider',
  component: Slider,
  tags: ['autodocs', 'stable'],
  args: {
    'aria-label': 'Volume',
    defaultValue: [40],
    max: 100,
    min: 0,
    step: 1,
  },
  decorators: [
    (Story) => (
      <div className={frame}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Range: Story = {
  args: {
    'aria-label': 'Price range',
    defaultValue: [20, 80],
  },
}

export const Controlled: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    const [value, setValue] = useState([35])
    return (
      <VStack alignItems="stretch" gap="8">
        <Slider aria-label="Brightness" value={value} onValueChange={setValue} />
        <span>Value: {value.join(', ')}</span>
      </VStack>
    )
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: [60],
  },
}
