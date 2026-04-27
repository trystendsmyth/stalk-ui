import { Textarea } from './textarea'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  args: {
    'aria-label': 'Message',
    placeholder: 'Write a message...',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
      <Textarea aria-label="Small textarea" placeholder="Small" size="sm" />
      <Textarea aria-label="Medium textarea" placeholder="Medium" size="md" />
      <Textarea aria-label="Large textarea" placeholder="Large" size="lg" />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
      <Textarea aria-label="Default textarea" placeholder="Default" />
      <Textarea aria-label="Invalid textarea" invalid placeholder="Invalid" />
      <Textarea aria-label="Disabled textarea" disabled placeholder="Disabled" />
    </div>
  ),
}

export const RainbowTheme: Story = {
  render: () => (
    <div data-panda-theme="rainbow" style={{ maxWidth: 360 }}>
      <Textarea aria-label="Rainbow themed textarea" placeholder="Rainbow theme" />
    </div>
  ),
}

export const Rtl: Story = {
  render: () => (
    <div dir="rtl" style={{ maxWidth: 360 }}>
      <Textarea aria-label="رسالة" placeholder="اكتب رسالة" />
    </div>
  ),
}

export const DarkMode: Story = {
  render: () => (
    <div data-color-mode="dark" style={{ background: '#111', maxWidth: 360, padding: 24 }}>
      <Textarea aria-label="Dark textarea" placeholder="Dark mode" />
    </div>
  ),
}
