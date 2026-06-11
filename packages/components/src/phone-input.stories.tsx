import { useState } from 'react'
import { fn } from 'storybook/test'

import { PhoneInput } from './phone-input'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Forms/Phone Input',
  component: PhoneInput,
  tags: ['autodocs', 'stable'],
  args: {
    countryLabel: 'Country',
    defaultCountry: 'us',
    disabled: false,
    invalid: false,
    onChange: fn(),
    placeholder: 'Phone number',
    size: 'md',
    'aria-label': 'Phone number',
  },
  argTypes: {
    'aria-label': { control: 'text' },
    className: { table: { disable: true } },
    countryLabel: { control: 'text' },
    defaultCountry: { control: 'text' },
    disabled: { control: 'boolean' },
    id: { table: { disable: true } },
    invalid: { control: 'boolean' },
    name: { table: { disable: true } },
    onChange: { table: { disable: true } },
    placeholder: { control: 'text' },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    style: { table: { disable: true } },
  },
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <div style={{ maxWidth: '20rem' }}>
        <PhoneInput
          {...args}
          value={value}
          onChange={(phone) => {
            setValue(phone)
            args.onChange?.(phone)
          }}
        />
      </div>
    )
  },
} satisfies Meta<typeof PhoneInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
