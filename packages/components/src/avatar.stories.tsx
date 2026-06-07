import { HStack, VStack } from 'styled-system/jsx'
import { avatar as avatarRecipe } from 'styled-system/recipes'

import { Avatar, AvatarFallback, AvatarImage, AvatarRoot } from './avatar'
import { TONES } from './tones'

import type { Meta, StoryObj } from '@storybook/react-vite'

const { radius: RADII, size: SIZES } = avatarRecipe.variantMap

const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop'
const BROKEN_IMAGE = 'https://example.invalid/missing.png'

const meta = {
  title: 'Components/Data Display/Avatar',
  component: Avatar,
  tags: ['autodocs', 'stable'],
  args: {
    name: 'Ada Lovelace',
    radius: 'full',
    size: 'md',
    tone: 'accent',
  },
  argTypes: {
    radius: { control: 'select', options: RADII },
    size: { control: 'select', options: SIZES },
    tone: { control: 'select', options: TONES },
    src: { control: 'text' },
    name: { control: 'text' },
    alt: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A user-identity surface backed by Radix Avatar. Renders an image with graceful fallback to initials derived from `name`/`alt`, or custom fallback content.',
      },
    },
  },
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: SAMPLE_IMAGE,
  },
}

export const Initials: Story = {
  args: {
    name: 'Grace Hopper',
  },
}

export const BrokenImage: Story = {
  args: {
    src: BROKEN_IMAGE,
    name: 'Linus Torvalds',
  },
  parameters: {
    docs: {
      description: { story: 'Falls back to initials when the image fails to load.' },
    },
  },
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack alignItems="center" gap="16">
      {SIZES.map((size) => (
        <Avatar key={size} name="Ada Lovelace" size={size} />
      ))}
    </HStack>
  ),
}

export const Radii: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack alignItems="center" gap="16">
      {RADII.map((radius) => (
        <Avatar key={radius} name="Ada Lovelace" radius={radius} size="lg" src={SAMPLE_IMAGE} />
      ))}
    </HStack>
  ),
}

export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack gap="16" flexWrap="wrap">
      {TONES.map((tone) => (
        <Avatar key={tone} name={tone} tone={tone} />
      ))}
    </HStack>
  ),
}

export const Composition: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Compose `AvatarRoot`, `AvatarImage`, `AvatarFallback` directly for full control.',
      },
    },
  },
  render: () => (
    <VStack alignItems="flex-start" gap="12">
      <AvatarRoot size="lg" tone="success">
        <AvatarImage alt="Ada" src={SAMPLE_IMAGE} />
        <AvatarFallback size="lg">AL</AvatarFallback>
      </AvatarRoot>
      <AvatarRoot radius="md" size="lg" tone="warning">
        <AvatarFallback size="lg">?</AvatarFallback>
      </AvatarRoot>
    </VStack>
  ),
}

export const Stack: Story = {
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'A typical overlap-stack of avatars.' } },
  },
  render: () => (
    <HStack gap="0">
      {(
        [
          ['Ada Lovelace', 'accent'],
          ['Grace Hopper', 'success'],
          ['Margaret Hamilton', 'info'],
          ['Katherine Johnson', 'warning'],
        ] as const
      ).map(([name, tone], i) => (
        <Avatar
          key={name}
          name={name}
          tone={tone}
          style={{
            marginInlineStart: i === 0 ? 0 : -8,
            boxShadow: '0 0 0 2px var(--colors-bg-default)',
          }}
        />
      ))}
    </HStack>
  ),
}
