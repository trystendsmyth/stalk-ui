import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from 'lucide-react'
import { useState } from 'react'
import { HStack, VStack } from 'styled-system/jsx'
import { toggle as toggleRecipe } from 'styled-system/recipes'

import { Toggle, ToggleGroup, ToggleGroupItem } from './toggle'
import { TONES } from './tones'

import type { Meta, StoryObj } from '@storybook/react-vite'

const { size: SIZES, variant: VARIANTS, radius: RADII } = toggleRecipe.variantMap

const meta = {
  title: 'Components/Forms/Toggle',
  component: Toggle,
  tags: ['autodocs', 'stable'],
  args: {
    children: 'Bold',
    size: 'md',
    tone: 'accent',
    variant: 'outline',
    radius: 'md',
  },
  argTypes: {
    size: { control: 'inline-radio', options: SIZES },
    variant: { control: 'inline-radio', options: VARIANTS },
    tone: { control: 'select', options: TONES },
    radius: { control: 'select', options: RADII },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A two-state button (pressed/not pressed) backed by Radix Toggle. Use `ToggleGroup` for grouped, single- or multi-select toolbars.',
      },
    },
  },
} satisfies Meta<typeof Toggle>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { 'aria-label': 'Toggle bold' },
}

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack gap="12">
      {VARIANTS.map((variant) => (
        <Toggle key={variant} aria-label={variant} defaultPressed variant={variant}>
          {variant}
        </Toggle>
      ))}
    </HStack>
  ),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack alignItems="center" gap="12">
      {SIZES.map((size) => (
        <Toggle key={size} aria-label={size} size={size}>
          {size}
        </Toggle>
      ))}
    </HStack>
  ),
}

export const WithIcon: Story = {
  args: {
    children: <Bold aria-hidden="true" size={14} />,
    'aria-label': 'Bold',
  },
}

export const Group: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    function Demo() {
      const [value, setValue] = useState<string[]>(['bold'])
      return (
        <ToggleGroup
          aria-label="Text formatting"
          onValueChange={setValue}
          type="multiple"
          value={value}
        >
          <ToggleGroupItem value="bold" aria-label="Bold">
            <Bold aria-hidden="true" size={14} />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            <Italic aria-hidden="true" size={14} />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline">
            <Underline aria-hidden="true" size={14} />
          </ToggleGroupItem>
        </ToggleGroup>
      )
    }
    return <Demo />
  },
}

export const AttachedGroup: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'A segmented control: items sit flush against one another with shared borders.',
      },
    },
  },
  render: () => (
    <ToggleGroup aria-label="Text alignment" attached defaultValue="left" type="single">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft aria-hidden="true" size={14} />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter aria-hidden="true" size={14} />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight aria-hidden="true" size={14} />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="flex-start" gap="12">
      {TONES.map((tone) => (
        <Toggle key={tone} defaultPressed tone={tone} aria-label={tone}>
          {tone}
        </Toggle>
      ))}
    </VStack>
  ),
}
