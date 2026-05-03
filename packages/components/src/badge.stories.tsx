import { HStack, VStack } from 'styled-system/jsx'
import { badge as badgeRecipe } from 'styled-system/recipes'

import { Badge, type BadgeTone } from './badge'

import type { Meta, StoryObj } from '@storybook/react-vite'

const { radius: RADII, size: SIZES, variant: VARIANTS } = badgeRecipe.variantMap
const TONES: BadgeTone[] = ['accent', 'success', 'warning', 'danger', 'info']

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs', 'stable'],
  args: {
    children: 'Published',
    radius: 'full',
    size: 'md',
    tone: 'accent',
    variant: 'subtle',
  },
  argTypes: {
    radius: {
      control: 'select',
      options: RADII,
    },
    size: {
      control: 'inline-radio',
      options: SIZES,
    },
    tone: {
      control: 'select',
      options: TONES,
    },
    variant: {
      control: 'select',
      options: VARIANTS,
    },
  },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack gap="8" flexWrap="wrap">
      {VARIANTS.map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </HStack>
  ),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack alignItems="center" gap="8">
      {SIZES.map((size) => (
        <Badge key={size} size={size}>
          {size}
        </Badge>
      ))}
    </HStack>
  ),
}

export const Radii: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack alignItems="center" gap="8" flexWrap="wrap">
      {RADII.map((radius) => (
        <Badge key={radius} radius={radius}>
          {radius}
        </Badge>
      ))}
    </HStack>
  ),
}

export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="flex-start" gap="12">
      {VARIANTS.map((variant) => (
        <HStack key={variant} gap="8" flexWrap="wrap">
          {TONES.map((tone) => (
            <Badge key={tone} tone={tone} variant={variant}>
              {tone}
            </Badge>
          ))}
        </HStack>
      ))}
    </VStack>
  ),
}
