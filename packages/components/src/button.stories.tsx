import { ArrowRight, Plus } from 'lucide-react'
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
    size: 'md',
    variant: 'solid',
  },
  argTypes: {
    size: {
      control: 'select',
      options: SIZES,
    },
    variant: {
      control: 'select',
      options: VARIANTS,
    },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack alignItems="center" flexWrap="wrap" gap="12">
      {VARIANTS.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </HStack>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack alignItems="center" flexWrap="wrap" gap="12">
      <Button>Default</Button>
      <Button data-hover>Hover</Button>
      <Button data-active>Active</Button>
      <Button data-focus-visible>Focused</Button>
      <Button data-hover data-focus-visible>
        Hover + focus
      </Button>
      <Button data-active data-focus-visible>
        Active + focus
      </Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </HStack>
  ),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack alignItems="center" flexWrap="wrap" gap="12">
      {SIZES.map((size) => (
        <Button key={size} size={size}>
          {size}
        </Button>
      ))}
    </HStack>
  ),
}

export const WithIcons: Story = {
  args: {
    children: 'Create',
    leadingIcon: <Plus aria-hidden="true" height={16} width={16} />,
    trailingIcon: <ArrowRight aria-hidden="true" height={16} width={16} />,
  },
}

export const AsChild: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Button asChild variant="outline">
      <a href="https://stalk-ui.com">Open Stalk UI</a>
    </Button>
  ),
}
