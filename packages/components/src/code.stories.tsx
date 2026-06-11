import { VStack } from 'styled-system/jsx'
import { code as codeRecipe } from 'styled-system/recipes'

import { Code } from './code'
import { Text } from './text'

import type { Meta, StoryObj } from '@storybook/react-vite'

const { variant: VARIANTS } = codeRecipe.variantMap

const meta = {
  title: 'Components/Typography/Code',
  component: Code,
  tags: ['autodocs', 'stable'],
  args: {
    children: 'pnpm add @stalk-ui/preset',
    variant: 'soft',
  },
  argTypes: {
    children: { control: 'text' },
    className: { table: { disable: true } },
    variant: { control: 'inline-radio', options: VARIANTS },
  },
} satisfies Meta<typeof Code>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="flex-start" gap="8">
      {VARIANTS.map((variant) => (
        <Code key={variant} variant={variant}>
          {variant}
        </Code>
      ))}
    </VStack>
  ),
}

// Sized in `em`, so inline code tracks the surrounding text run.
export const Inline: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Text>
      Run <Code>pnpm build</Code> before committing generated artifacts.
    </Text>
  ),
}
