import { Box, VStack } from 'styled-system/jsx'
import { text as textRecipe } from 'styled-system/recipes'

import { Text } from './text'
import { TONES } from './tones'

import type { Meta, StoryObj } from '@storybook/react-vite'

const { align: ALIGNS, size: SIZES, weight: WEIGHTS } = textRecipe.variantMap
const COLORS = ['default', 'muted', 'subtle'] as const

const SAMPLE = 'The quick brown fox jumps over the lazy dog.'

const meta = {
  title: 'Components/Typography/Text',
  component: Text,
  tags: ['autodocs', 'stable'],
  args: {
    children: SAMPLE,
    align: 'start',
    color: 'default',
    size: 'body',
    truncate: false,
    weight: 'regular',
  },
  argTypes: {
    align: { control: 'inline-radio', options: ALIGNS },
    children: { control: 'text' },
    className: { table: { disable: true } },
    color: { control: 'inline-radio', options: COLORS },
    lineClamp: { control: 'number' },
    size: { control: 'select', options: SIZES },
    tone: { control: 'select', options: [undefined, ...TONES] },
    truncate: { control: 'boolean' },
    weight: { control: 'inline-radio', options: WEIGHTS },
  },
} satisfies Meta<typeof Text>

export default meta

type Story = StoryObj<typeof meta>

// axe color-contrast flags an intentionally de-emphasized token here (`fg.subtle`),
// whose lower contrast is by design — disable the rule for this swatch story.
const noContrast = { a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } } }

export const Default: Story = {}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="flex-start" gap="8">
      {SIZES.map((size) => (
        <Text key={size} size={size}>
          {size}
        </Text>
      ))}
    </VStack>
  ),
}

export const Weights: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="flex-start" gap="8">
      {WEIGHTS.map((weight) => (
        <Text key={weight} weight={weight}>
          {weight}
        </Text>
      ))}
    </VStack>
  ),
}

export const Colors: Story = {
  parameters: { controls: { disable: true }, ...noContrast },
  render: () => (
    <VStack alignItems="flex-start" gap="8">
      {COLORS.map((color) => (
        <Text key={color} color={color}>
          {color}
        </Text>
      ))}
    </VStack>
  ),
}

export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="flex-start" gap="8">
      {TONES.map((tone) => (
        <Text key={tone} tone={tone}>
          {tone}
        </Text>
      ))}
    </VStack>
  ),
}

export const Truncate: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Box maxW="240px">
      <Text truncate>
        {SAMPLE} {SAMPLE}
      </Text>
    </Box>
  ),
}

export const LineClamp: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Box maxW="240px">
      <Text lineClamp={2}>
        {SAMPLE} {SAMPLE} {SAMPLE}
      </Text>
    </Box>
  ),
}

export const Formatting: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Text>
      Press <Text.Strong>Save</Text.Strong> to keep your changes, or read the{' '}
      <Text.Em>full guide</Text.Em>. As the docs note: <Text.Quote>measure twice</Text.Quote>.
    </Text>
  ),
}
