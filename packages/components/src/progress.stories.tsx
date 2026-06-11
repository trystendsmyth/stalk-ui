import { useEffect, useState } from 'react'
import { css } from 'styled-system/css'
import { VStack } from 'styled-system/jsx'
import { progress as progressRecipe } from 'styled-system/recipes'

import { Progress } from './progress'

import type { Meta, StoryObj } from '@storybook/react-vite'

const { size: SIZES } = progressRecipe.variantMap

const frame = css({ width: '320px' })

const meta = {
  title: 'Components/Feedback/Progress',
  component: Progress,
  tags: ['autodocs', 'stable'],
  args: {
    'aria-label': 'Upload progress',
    max: 100,
    size: 'md',
    value: 50,
  },
  argTypes: {
    'aria-label': { control: 'text' },
    className: { table: { disable: true } },
    max: { control: 'number' },
    size: { control: 'select', options: SIZES },
    value: { control: 'number' },
  },
  decorators: [
    (Story) => (
      <div className={frame}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="stretch" gap="12">
      {SIZES.map((size) => (
        <Progress aria-label={`${size} progress`} key={size} size={size} value={66} />
      ))}
    </VStack>
  ),
}

export const Animated: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    const [value, setValue] = useState(0)
    useEffect(() => {
      const id = setInterval(() => {
        setValue((current) => (current >= 100 ? 0 : current + 5))
      }, 250)
      return () => {
        clearInterval(id)
      }
    }, [])
    return <Progress aria-label="Loading" value={value} />
  },
}
