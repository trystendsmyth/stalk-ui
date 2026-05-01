import { css } from 'styled-system/css'
import { HStack, VStack } from 'styled-system/jsx'
import { switchRecipe } from 'styled-system/recipes'

import { Switch } from './switch'

import type { Meta, StoryObj } from '@storybook/react-vite'

const { size: SIZES } = switchRecipe.variantMap

const labelStyle = css({ cursor: 'pointer' })
const disabledLabelStyle = css({ cursor: 'not-allowed', opacity: 0.5 })

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs', 'stable'],
  args: {
    disabled: false,
    invalid: false,
    size: 'md',
  },
  argTypes: {
    size: {
      control: 'select',
      options: SIZES,
      description: 'Visual size of the switch.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the switch.',
    },
    invalid: {
      control: 'boolean',
      description: 'Mark the switch as invalid.',
    },
    asChild: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A toggle switch backed by Radix UI Switch. Animates the thumb based on `data-state`.',
      },
    },
  },
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    'aria-label': 'Email notifications',
  },
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="flex-start" gap="12">
      {SIZES.map((size) => (
        <HStack gap="8" key={size}>
          <Switch defaultChecked id={`size-${size}`} size={size} />
          <label htmlFor={`size-${size}`}>{size}</label>
        </HStack>
      ))}
    </VStack>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="flex-start" gap="12">
      <HStack gap="8">
        <Switch id="switch-off" />
        <label htmlFor="switch-off">Off</label>
      </HStack>
      <HStack gap="8">
        <Switch defaultChecked id="switch-on" />
        <label htmlFor="switch-on">On</label>
      </HStack>
      <HStack gap="8">
        <Switch id="switch-invalid" invalid />
        <label htmlFor="switch-invalid">Invalid</label>
      </HStack>
      <HStack gap="8">
        <Switch disabled id="switch-disabled" />
        <label className={disabledLabelStyle} htmlFor="switch-disabled">
          Disabled (off)
        </label>
      </HStack>
      <HStack gap="8">
        <Switch defaultChecked disabled id="switch-disabled-on" />
        <label className={disabledLabelStyle} htmlFor="switch-disabled-on">
          Disabled (on)
        </label>
      </HStack>
    </VStack>
  ),
}

export const WithLabel: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack gap="8">
      <Switch id="email-notifications" />
      <label className={labelStyle} htmlFor="email-notifications">
        Email notifications
      </label>
    </HStack>
  ),
}
