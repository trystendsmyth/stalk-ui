import { VStack } from 'styled-system/jsx'

import { FormatInput } from './format-input'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Forms/Format Input',
  component: FormatInput,
  tags: ['autodocs', 'stable'],
  args: {
    'aria-label': 'Email',
    format: 'email',
    placeholder: 'you@stalk-ui.com',
  },
  argTypes: {
    format: { control: 'inline-radio', options: ['email', 'url', 'tel'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    showValidity: { control: 'boolean' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A format-aware text field. `format` sets the correct input type, on-screen keyboard ' +
          '(inputMode), and autocomplete token for email, URL, or telephone entry.',
      },
    },
  },
} satisfies Meta<typeof FormatInput>

export default meta

type Story = StoryObj<typeof meta>

export const Email: Story = {}

export const Formats: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="stretch" gap="12" w="22rem">
      <FormatInput aria-label="Email" format="email" placeholder="you@stalk-ui.com" />
      <FormatInput aria-label="Website" format="url" placeholder="https://stalk-ui.com" />
      <FormatInput aria-label="Phone" format="tel" placeholder="+1 555 0100" />
    </VStack>
  ),
}

export const WithValidity: Story = {
  args: { showValidity: true, validLabel: 'Valid email' },
}
