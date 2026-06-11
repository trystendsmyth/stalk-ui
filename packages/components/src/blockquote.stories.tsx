import { VStack } from 'styled-system/jsx'
import { blockquote as blockquoteRecipe } from 'styled-system/recipes'

import { Blockquote } from './blockquote'
import { TONES } from './tones'

import type { Meta, StoryObj } from '@storybook/react-vite'

const { size: SIZES } = blockquoteRecipe.variantMap

const SAMPLE = 'The quick brown fox jumps over the lazy dog.'

const meta = {
  title: 'Components/Typography/Blockquote',
  component: Blockquote,
  tags: ['autodocs', 'stable'],
  args: {
    children: SAMPLE,
    size: 'md',
  },
  argTypes: {
    children: { control: 'text' },
    className: { table: { disable: true } },
    size: { control: 'inline-radio', options: SIZES },
    tone: { control: 'select', options: [undefined, ...TONES] },
  },
} satisfies Meta<typeof Blockquote>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="flex-start" gap="16">
      {SIZES.map((size) => (
        <Blockquote key={size} size={size}>
          {size}: {SAMPLE}
        </Blockquote>
      ))}
    </VStack>
  ),
}

export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="flex-start" gap="16">
      {TONES.map((tone) => (
        <Blockquote key={tone} tone={tone}>
          {tone}: {SAMPLE}
        </Blockquote>
      ))}
    </VStack>
  ),
}
