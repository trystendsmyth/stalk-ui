import { ArrowRight, Plus, Trash2 } from 'lucide-react'
import { fn } from 'storybook/test'
import { HStack } from 'styled-system/jsx'
import { button as buttonRecipe } from 'styled-system/recipes'

import { Button } from './button'

import type { Meta, StoryObj } from '@storybook/react-vite'

const { size: SIZES, variant: VARIANTS } = buttonRecipe.variantMap

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs', 'stable'],
  args: {
    children: 'Button',
    disabled: false,
    loading: false,
    loadingLabel: 'Loading',
    onClick: fn(),
    size: 'md',
    variant: 'solid',
  },
  argTypes: {
    asChild: { table: { disable: true } },
    children: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    loadingLabel: { control: 'text' },
    onClick: { table: { disable: true } },
    size: { control: 'select', options: SIZES },
    type: { table: { disable: true } },
    variant: { control: 'select', options: VARIANTS },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  args: { children: undefined },
  argTypes: {
    children: { table: { disable: true } },
    variant: { table: { disable: true } },
  },
  render: ({ children: _children, variant: _variant, ...args }) => (
    <HStack alignItems="center" flexWrap="wrap" gap="12">
      {VARIANTS.map((variant) => (
        <Button {...args} key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </HStack>
  ),
}

export const Sizes: Story = {
  args: { children: undefined },
  argTypes: {
    children: { table: { disable: true } },
    size: { table: { disable: true } },
  },
  render: ({ children: _children, size: _size, ...args }) => (
    <HStack alignItems="center" flexWrap="wrap" gap="12">
      {SIZES.map((size) => (
        <Button {...args} key={size} size={size}>
          {size.toUpperCase()}
        </Button>
      ))}
    </HStack>
  ),
}

export const States: Story = {
  args: { children: undefined, loading: false, disabled: false },
  argTypes: {
    children: { table: { disable: true } },
    disabled: { table: { disable: true } },
    loading: { table: { disable: true } },
  },
  render: ({ children: _children, disabled: _disabled, loading: _loading, ...args }) => (
    <HStack alignItems="center" flexWrap="wrap" gap="12">
      <Button {...args}>Default</Button>
      <Button {...args} data-hover>
        Hover
      </Button>
      <Button {...args} data-active>
        Active
      </Button>
      <Button {...args} data-focus-visible>
        Focused
      </Button>
      <Button {...args} disabled>
        Disabled
      </Button>
      <Button {...args} loading>
        Saving
      </Button>
    </HStack>
  ),
}

export const WithIcons: Story = {
  args: { children: undefined },
  argTypes: { children: { table: { disable: true } } },
  render: ({ children: _children, ...args }) => (
    <HStack alignItems="center" flexWrap="wrap" gap="12">
      <Button {...args}>
        <Plus aria-hidden="true" />
        Create
      </Button>
      <Button {...args} variant="outline">
        Continue
        <ArrowRight aria-hidden="true" />
      </Button>
      <Button {...args} variant="ghost">
        <Trash2 aria-hidden="true" />
        Delete
      </Button>
      <Button {...args} aria-label="Delete">
        <Trash2 aria-hidden="true" />
      </Button>
    </HStack>
  ),
}

export const AsChild: Story = {
  args: {
    children: undefined,
    variant: 'outline',
  },
  argTypes: { children: { table: { disable: true } } },
  render: ({ children: _children, ...args }) => (
    <Button {...args} asChild>
      <a href="https://stalk-ui.com" rel="noreferrer" target="_blank">
        Open Stalk UI
      </a>
    </Button>
  ),
}
