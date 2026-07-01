import { fn } from 'storybook/test'
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
    onValidityChange: fn(),
    placeholder: 'you@stalk-ui.com',
  },
  argTypes: {
    format: { control: 'inline-radio', options: ['email', 'url', 'tel'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    align: { control: 'inline-radio', options: ['start', 'center', 'end'] },
    showValidity: { control: 'boolean' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    className: { table: { disable: true } },
    rootProps: { table: { disable: true } },
    value: { table: { disable: true } },
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

export const FormatAsYouType: Story = {
  args: {
    'aria-label': 'Phone',
    format: 'tel',
    placeholder: '(555) 000-0000',
    formatValue: (value) => {
      const d = value.replace(/\D/g, '').slice(0, 10)
      const area = d.slice(0, 3)
      const prefix = d.slice(3, 6)
      const line = d.slice(6, 10)
      if (d.length > 6) return `(${area}) ${prefix}-${line}`
      if (d.length > 3) return `(${area}) ${prefix}`
      if (d.length > 0) return `(${area}`
      return ''
    },
  },
}
