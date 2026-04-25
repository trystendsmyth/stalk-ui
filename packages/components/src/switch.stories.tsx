import { Switch } from './switch'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  args: {
    label: 'Email notifications',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Switch label="Small switch" size="sm" />
      <Switch label="Medium switch" size="md" />
      <Switch label="Large switch" size="lg" />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Switch label="Default switch" />
      <Switch defaultChecked label="Checked switch" />
      <Switch invalid label="Invalid switch" />
      <Switch disabled label="Disabled switch" />
    </div>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <Switch
      description="Send email notifications for product updates."
      id="email-notifications"
      label="Email notifications"
    />
  ),
}

export const AlternateAccent: Story = {
  render: () => (
    <div data-accent-color="violet">
      <Switch defaultChecked label="Violet themed switch" />
    </div>
  ),
}

export const Rtl: Story = {
  render: () => (
    <div dir="rtl">
      <Switch label="إشعارات البريد" />
    </div>
  ),
}

export const DarkMode: Story = {
  render: () => (
    <div data-color-mode="dark" style={{ background: '#111', padding: 24 }}>
      <Switch defaultChecked label="Dark switch" />
    </div>
  ),
}
