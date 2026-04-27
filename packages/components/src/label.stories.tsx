import { Label } from './label'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Label',
  component: Label,
  args: {
    children: 'Email',
    htmlFor: 'email',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Label>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <Label {...args} />
      <input id="email" placeholder="hello@stalk-ui.com" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Label size="sm">Small label</Label>
      <Label size="md">Medium label</Label>
      <Label size="lg">Large label</Label>
    </div>
  ),
}

export const Required: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <Label required htmlFor="required-email">
        Email
      </Label>
      <input id="required-email" required placeholder="hello@stalk-ui.com" />
    </div>
  ),
}

export const RainbowTheme: Story = {
  render: () => (
    <div data-panda-theme="rainbow">
      <Label required>Rainbow themed label</Label>
    </div>
  ),
}

export const Rtl: Story = {
  render: () => (
    <div dir="rtl">
      <Label>البريد الإلكتروني</Label>
    </div>
  ),
}

export const DarkMode: Story = {
  render: () => (
    <div data-color-mode="dark" style={{ background: '#111', padding: 24 }}>
      <Label required>Dark label</Label>
    </div>
  ),
}
