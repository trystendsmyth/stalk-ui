import { fn } from 'storybook/test'

import { OtpInput } from './otp-input'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Forms/OTP Input',
  component: OtpInput.Root,
  tags: ['autodocs', 'stable'],
  args: {
    autoFocus: false,
    disabled: false,
    maxLength: 6,
    onChange: fn(),
    onComplete: fn(),
    size: 'md',
    textAlign: 'center',
    'aria-label': 'One-time passcode',
    children: (
      <>
        <OtpInput.Group>
          <OtpInput.Slot index={0} />
          <OtpInput.Slot index={1} />
          <OtpInput.Slot index={2} />
        </OtpInput.Group>
        <OtpInput.Separator />
        <OtpInput.Group>
          <OtpInput.Slot index={3} />
          <OtpInput.Slot index={4} />
          <OtpInput.Slot index={5} />
        </OtpInput.Group>
      </>
    ),
  },
  argTypes: {
    'aria-label': { control: 'text' },
    autoFocus: { control: 'boolean' },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
    containerClassName: { table: { disable: true } },
    disabled: { control: 'boolean' },
    id: { table: { disable: true } },
    maxLength: { control: 'number' },
    name: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onComplete: { table: { disable: true } },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    textAlign: { control: 'inline-radio', options: ['left', 'center', 'right'] },
  },
} satisfies Meta<typeof OtpInput.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Continuous: Story = {
  args: {
    maxLength: 4,
    children: (
      <OtpInput.Group>
        <OtpInput.Slot index={0} />
        <OtpInput.Slot index={1} />
        <OtpInput.Slot index={2} />
        <OtpInput.Slot index={3} />
      </OtpInput.Group>
    ),
  },
}
