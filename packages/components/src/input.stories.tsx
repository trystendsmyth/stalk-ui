import { Input } from './input'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Input',
  component: Input,
  args: {
    'aria-label': 'Email',
    placeholder: 'hello@stalk-ui.com',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 320 }}>
      <Input aria-label="Small input" placeholder="Small" size="sm" />
      <Input aria-label="Medium input" placeholder="Medium" size="md" />
      <Input aria-label="Large input" placeholder="Large" size="lg" />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 320 }}>
      <Input aria-label="Default input" placeholder="Default" />
      <Input aria-label="Invalid input" invalid placeholder="Invalid" />
      <Input aria-label="Disabled input" disabled placeholder="Disabled" />
    </div>
  ),
}

export const AlternateAccent: Story = {
  render: () => (
    <div data-accent-color="violet" style={{ maxWidth: 320 }}>
      <Input aria-label="Violet themed input" placeholder="Violet accent" />
    </div>
  ),
}

export const Rtl: Story = {
  render: () => (
    <div dir="rtl" style={{ maxWidth: 320 }}>
      <Input aria-label="البريد الإلكتروني" placeholder="البريد الإلكتروني" />
    </div>
  ),
}

export const DarkMode: Story = {
  render: () => (
    <div data-color-mode="dark" style={{ background: '#111', maxWidth: 320, padding: 24 }}>
      <Input aria-label="Dark input" placeholder="Dark mode" />
    </div>
  ),
}
