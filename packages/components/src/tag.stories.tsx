import { Sparkles, Tag as TagIcon } from 'lucide-react'
import { useState } from 'react'
import { HStack, VStack } from 'styled-system/jsx'
import { tag as tagRecipe } from 'styled-system/recipes'

import { Tag } from './tag'
import { TONES } from './tones'

import type { Meta, StoryObj } from '@storybook/react-vite'

const { radius: RADII, size: SIZES, variant: VARIANTS } = tagRecipe.variantMap

const meta = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs', 'stable'],
  args: {
    children: 'Frontend',
    dot: false,
    radius: 'full',
    size: 'md',
    tone: 'accent',
    variant: 'subtle',
  },
  argTypes: {
    radius: { control: 'select', options: RADII },
    size: { control: 'inline-radio', options: SIZES },
    tone: { control: 'select', options: TONES },
    variant: { control: 'select', options: VARIANTS },
    dot: { control: 'boolean' },
    count: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Compact, optionally interactive label. Supports leading/trailing icons, a count badge, a status dot, and a close button.',
      },
    },
  },
} satisfies Meta<typeof Tag>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack gap="8" flexWrap="wrap">
      {VARIANTS.map((variant) => (
        <Tag key={variant} variant={variant}>
          {variant}
        </Tag>
      ))}
    </HStack>
  ),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack alignItems="center" gap="8">
      {SIZES.map((size) => (
        <Tag key={size} size={size}>
          {size}
        </Tag>
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
            <Tag key={tone} tone={tone} variant={variant}>
              {tone}
            </Tag>
          ))}
        </HStack>
      ))}
    </VStack>
  ),
}

export const WithDot: Story = {
  args: { dot: true, children: 'Online', tone: 'success' },
}

export const WithIcon: Story = {
  args: {
    children: 'Featured',
    leadingIcon: <Sparkles aria-hidden="true" size={12} />,
    tone: 'warning',
  },
}

export const WithCount: Story = {
  args: {
    children: 'Errors',
    count: 12,
    tone: 'danger',
  },
}

export const Closeable: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    function Demo() {
      const [tags, setTags] = useState(['design', 'engineering', 'product'])
      return (
        <HStack gap="8" flexWrap="wrap">
          {tags.map((label) => (
            <Tag
              key={label}
              leadingIcon={<TagIcon aria-hidden="true" size={10} />}
              onClose={() => {
                setTags((prev) => prev.filter((t) => t !== label))
              }}
            >
              {label}
            </Tag>
          ))}
          {tags.length === 0 ? <span>(empty)</span> : null}
        </HStack>
      )
    }
    return <Demo />
  },
}

export const Interactive: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack gap="8">
      <Tag
        onClick={() => {
          alert('clicked!')
        }}
        tone="accent"
        variant="outline"
      >
        Click me
      </Tag>
    </HStack>
  ),
}
