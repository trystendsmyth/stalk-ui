import { Button } from './button'
import { Card } from './card'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Data Display/Card',
  component: Card.Root,
  tags: ['autodocs', 'stable'],
  args: {
    variant: 'outline',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['outline', 'elevated'],
    },
  },
} satisfies Meta<typeof Card.Root>

export default meta

type Story = StoryObj<typeof meta>

const renderCard: Story['render'] = (args) => (
  <Card.Root {...args} style={{ maxWidth: '24rem' }}>
    <Card.Header>
      <Card.Title>Project settings</Card.Title>
      <Card.Description>Manage how this project is shared with your team.</Card.Description>
    </Card.Header>
    <Card.Content>
      Cards group related content and actions into a single bordered surface.
    </Card.Content>
    <Card.Footer>
      <Button>Save</Button>
      <Button variant="outline">Cancel</Button>
    </Card.Footer>
  </Card.Root>
)

export const Default: Story = {
  render: renderCard,
}

export const Elevated: Story = {
  args: { variant: 'elevated' },
  render: renderCard,
}

export const WithAction: Story = {
  render: (args) => (
    <Card.Root {...args} style={{ maxWidth: '24rem' }}>
      <Card.Header>
        <Card.Title>Billing</Card.Title>
        <Card.Description>You are on the Pro plan.</Card.Description>
        <Card.Action>
          <Button size="sm" variant="outline">
            Upgrade
          </Button>
        </Card.Action>
      </Card.Header>
      <Card.Content>Your plan renews on the 1st of each month.</Card.Content>
    </Card.Root>
  ),
}
