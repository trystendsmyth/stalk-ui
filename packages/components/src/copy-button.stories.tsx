import { CopyButton } from './copy-button'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Forms/Copy Button',
  component: CopyButton,
  tags: ['autodocs', 'stable'],
  args: {
    copiedLabel: 'Copied',
    label: 'Copy',
    value: 'pnpm dlx @stalk-ui/cli add copy-button',
  },
  argTypes: {
    className: { table: { disable: true } },
    copiedLabel: { control: 'text' },
    label: { control: 'text' },
    timeout: { control: 'number' },
    value: { control: 'text' },
  },
} satisfies Meta<typeof CopyButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Outline: Story = {
  args: { label: 'Copy install command', variant: 'outline' },
  parameters: { controls: { disable: true } },
}
