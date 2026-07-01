import { Sparkles, Tag as TagIcon } from 'lucide-react'
import { useState } from 'react'
import { fn } from 'storybook/test'
import { HStack, VStack } from 'styled-system/jsx'
import { tag as tagRecipe } from 'styled-system/recipes'

import { Tag } from './tag'
import { TONES } from './tones'

import type { Meta, StoryObj } from '@storybook/react-vite'

const { radius: RADII, size: SIZES, variant: VARIANTS } = tagRecipe.variantMap

const meta = {
  title: 'Components/Data Display/Tag',
  component: Tag,
  tags: ['autodocs', 'stable'],
  args: {
    children: <Tag.Label>Frontend</Tag.Label>,
    closeAriaLabel: 'Remove',
    disabled: false,
    dot: false,
    radius: 'full',
    size: 'md',
    tone: 'accent',
    variant: 'subtle',
  },
  argTypes: {
    children: { table: { disable: true } },
    className: { table: { disable: true } },
    closeAriaLabel: { control: 'text' },
    disabled: { control: 'boolean' },
    dot: { control: 'boolean' },
    onClick: { table: { disable: true } },
    onClose: { table: { disable: true } },
    radius: { control: 'select', options: RADII },
    size: { control: 'inline-radio', options: SIZES },
    tone: { control: 'select', options: TONES },
    variant: { control: 'select', options: VARIANTS },
  },
  parameters: {
    docs: {
      description: {
        component:
          'An interactive, chip-style label. Compose `Tag.Avatar`, `Tag.Icon`, `Tag.Label`, ' +
          '`Tag.Count`, and `Tag.Close` as children. Unlike `Badge` (static status/metadata), ' +
          'a Tag can be clicked, removed, disabled, and carry an avatar or icon.',
      },
    },
  },
} satisfies Meta<typeof Tag>

export default meta

type Story = StoryObj<typeof meta>

// A disabled chip is intentionally de-emphasized; its lower contrast is by design.
const noContrast = { a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } } }

export const Default: Story = {}

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack gap="8" flexWrap="wrap">
      {VARIANTS.map((variant) => (
        <Tag key={variant} variant={variant}>
          <Tag.Label>{variant}</Tag.Label>
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
          <Tag.Label>{size}</Tag.Label>
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
              <Tag.Label>{tone}</Tag.Label>
            </Tag>
          ))}
        </HStack>
      ))}
    </VStack>
  ),
}

export const WithDot: Story = {
  args: { dot: true, children: <Tag.Label>Online</Tag.Label>, tone: 'success' },
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Tag.Icon>
          <Sparkles />
        </Tag.Icon>
        <Tag.Label>Featured</Tag.Label>
      </>
    ),
    tone: 'warning',
  },
}

export const WithAvatar: Story = {
  args: {
    children: (
      <>
        <Tag.Avatar>AB</Tag.Avatar>
        <Tag.Label>Ada Byron</Tag.Label>
      </>
    ),
    size: 'lg',
  },
}

export const WithCount: Story = {
  args: {
    children: (
      <>
        <Tag.Label>Errors</Tag.Label>
        <Tag.Count>12</Tag.Count>
      </>
    ),
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
              onClose={() => {
                setTags((prev) => prev.filter((t) => t !== label))
              }}
            >
              <Tag.Icon>
                <TagIcon />
              </Tag.Icon>
              <Tag.Label>{label}</Tag.Label>
              <Tag.Close />
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
      <Tag onClick={fn()} tone="accent" variant="outline">
        <Tag.Label>Click me</Tag.Label>
      </Tag>
    </HStack>
  ),
}

export const Disabled: Story = {
  parameters: { controls: { disable: true }, ...noContrast },
  render: () => (
    <HStack gap="8">
      <Tag disabled onClick={fn()} onClose={fn()}>
        <Tag.Label>Disabled</Tag.Label>
        <Tag.Close />
      </Tag>
    </HStack>
  ),
}
