import { VStack } from 'styled-system/jsx'

import { PasswordInput } from './password-input'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Inputs/Password Input',
  component: PasswordInput,
  tags: ['autodocs', 'stable'],
  args: {
    'aria-label': 'Password',
    placeholder: 'Enter your password',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    align: { control: 'inline-radio', options: ['start', 'center', 'end'] },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    className: { table: { disable: true } },
    rootProps: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A password field with a reveal toggle. Returns focus to the field after a pointer ' +
          'toggle and re-hides the value when the surrounding form submits.',
      },
    },
  },
} satisfies Meta<typeof PasswordInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="stretch" gap="12" w="20rem">
      <PasswordInput aria-label="Small" placeholder="Small" size="sm" />
      <PasswordInput aria-label="Medium" placeholder="Medium" size="md" />
      <PasswordInput aria-label="Large" placeholder="Large" size="lg" />
    </VStack>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="stretch" gap="12" w="20rem">
      <PasswordInput aria-label="Invalid" defaultValue="weak" invalid placeholder="Invalid" />
      <PasswordInput aria-label="Disabled" defaultValue="secret" disabled placeholder="Disabled" />
    </VStack>
  ),
}
