import { Badge } from './badge'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: {
    children: 'Published',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
    },
    variant: {
      control: 'inline-radio',
      options: ['solid', 'subtle', 'outline'],
    },
  },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Badge variant="solid">Solid</Badge>
      <Badge variant="subtle">Subtle</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
    </div>
  ),
}

export const AlternateAccent: Story = {
  render: () => (
    <div data-accent-color="violet">
      <Badge variant="solid">Violet themed badge</Badge>
    </div>
  ),
}

export const Rtl: Story = {
  render: () => (
    <div dir="rtl">
      <Badge>منشور</Badge>
    </div>
  ),
}

export const DarkMode: Story = {
  render: () => (
    <div data-color-mode="dark" style={{ background: '#111', padding: 24 }}>
      <Badge variant="outline">Dark badge</Badge>
    </div>
  ),
}
