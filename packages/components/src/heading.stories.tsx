import { VStack } from 'styled-system/jsx'
import { text as textRecipe } from 'styled-system/recipes'

import { Heading } from './heading'
import { TONES } from './tones'

import type { Meta, StoryObj } from '@storybook/react-vite'

const { align: ALIGNS, size: SIZES, weight: WEIGHTS } = textRecipe.variantMap
const LEVELS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const
const COLORS = ['default', 'muted', 'subtle'] as const

const meta = {
  title: 'Components/Typography/Heading',
  component: Heading,
  tags: ['autodocs', 'stable'],
  args: {
    children: 'The quick brown fox',
    align: 'start',
    as: 'h2',
    color: 'default',
    weight: 'semibold',
  },
  argTypes: {
    align: { control: 'inline-radio', options: ALIGNS },
    as: { control: 'inline-radio', options: LEVELS },
    color: { control: 'inline-radio', options: COLORS },
    size: { control: 'select', options: [undefined, ...SIZES] },
    tone: { control: 'select', options: [undefined, ...TONES] },
    weight: { control: 'inline-radio', options: WEIGHTS },
  },
} satisfies Meta<typeof Heading>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Levels: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="flex-start" gap="12">
      {LEVELS.map((level) => (
        <Heading key={level} as={level}>
          {level} heading
        </Heading>
      ))}
    </VStack>
  ),
}

// Semantic level and visual size are independent: a level-1 heading can read at
// any point on the type scale.
export const SizeOverride: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="flex-start" gap="12">
      <Heading as="h1" size="display">
        Display-sized h1
      </Heading>
      <Heading as="h1" size="h4">
        h4-sized h1
      </Heading>
    </VStack>
  ),
}

export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="flex-start" gap="12">
      {TONES.map((tone) => (
        <Heading key={tone} as="h3" tone={tone}>
          {tone}
        </Heading>
      ))}
    </VStack>
  ),
}
