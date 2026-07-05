import { useState } from 'react'
import { HStack, VStack } from 'styled-system/jsx'

import { Button } from './button'
import { Card } from './card'
import { Tour } from './tour'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Overlay/Tour',
  component: Tour,
  tags: ['autodocs', 'stable'],
  argTypes: {
    className: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
    onStepChange: { table: { disable: true } },
    open: { table: { disable: true } },
    step: { table: { disable: true } },
    steps: { table: { disable: true } },
  },
} satisfies Meta<typeof Tour>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { open: false, onOpenChange: () => undefined, steps: [] },
  parameters: { controls: { disable: true } },
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <VStack alignItems="stretch" gap="16" style={{ maxWidth: '28rem' }}>
        <HStack gap="8">
          <Button
            onClick={() => {
              setOpen(true)
            }}
          >
            Start tour
          </Button>
        </HStack>
        <Card.Root id="tour-queue">
          <Card.Header>
            <Card.Title>Triage queue</Card.Title>
            <Card.Description>Work items land here.</Card.Description>
          </Card.Header>
        </Card.Root>
        <Card.Root id="tour-filters" size="sm">
          <Card.Header>
            <Card.Title>Filters</Card.Title>
          </Card.Header>
        </Card.Root>
        <Tour
          open={open}
          steps={[
            {
              target: '#tour-queue',
              title: 'Triage queue',
              description: 'New work items land here, newest first.',
            },
            {
              target: '#tour-filters',
              title: 'Filters',
              description: 'Narrow the queue to a site or severity.',
            },
          ]}
          onOpenChange={setOpen}
        />
      </VStack>
    )
  },
}
