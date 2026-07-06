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
  args: {
    arrow: true,
    doneLabel: 'Done',
    nextLabel: 'Next',
    previousLabel: 'Back',
    skipLabel: 'Skip',
    open: false,
    onOpenChange: () => undefined,
    steps: [],
  },
  argTypes: {
    arrow: { control: 'boolean' },
    doneLabel: { control: 'text' },
    nextLabel: { control: 'text' },
    previousLabel: { control: 'text' },
    skipLabel: { control: 'text' },
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

const DemoSurface = ({ prefix }: { prefix: string }) => (
  <>
    <Card.Root id={`${prefix}-queue`}>
      <Card.Header>
        <Card.Title>Task queue</Card.Title>
        <Card.Description>Work items land here.</Card.Description>
      </Card.Header>
    </Card.Root>
    <Card.Root id={`${prefix}-filters`} size="sm">
      <Card.Header>
        <Card.Title>Filters</Card.Title>
      </Card.Header>
    </Card.Root>
  </>
)

const demoSteps = (prefix: string) => [
  {
    target: `#${prefix}-queue`,
    title: 'Task queue',
    description: 'New work items land here, newest first.',
  },
  {
    target: `#${prefix}-filters`,
    title: 'Filters',
    description: 'Narrow the queue by owner or severity.',
  },
]

export const Default: Story = {
  render: (args) => {
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
        <DemoSurface prefix="tour" />
        <Tour {...args} open={open} steps={demoSteps('tour')} onOpenChange={setOpen} />
      </VStack>
    )
  },
}

export const CustomLabels: Story = {
  args: {
    arrow: false,
    doneLabel: 'Finish',
    nextLabel: 'Continue',
    previousLabel: 'Previous',
    skipLabel: 'Dismiss',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Every action label is overridable for copy or i18n, and `arrow={false}` drops the pointer triangle.',
      },
    },
  },
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <VStack alignItems="stretch" gap="16" style={{ maxWidth: '28rem' }}>
        <HStack gap="8">
          <Button
            onClick={() => {
              setOpen(true)
            }}
          >
            Start tour (no arrow)
          </Button>
        </HStack>
        <DemoSurface prefix="tour-labels" />
        <Tour {...args} open={open} steps={demoSteps('tour-labels')} onOpenChange={setOpen} />
      </VStack>
    )
  },
}

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`step` + `onStepChange` make the tour fully controlled, so external UI can jump straight to a step.',
      },
    },
  },
  render: (args) => {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState(0)
    const steps = demoSteps('tour-controlled')
    return (
      <VStack alignItems="stretch" gap="16" style={{ maxWidth: '28rem' }}>
        <HStack gap="8">
          {steps.map((tourStep, index) => (
            <Button
              key={tourStep.target}
              variant={open && step === index ? 'solid' : 'outline'}
              onClick={() => {
                setStep(index)
                setOpen(true)
              }}
            >
              Step {index + 1}
            </Button>
          ))}
        </HStack>
        <DemoSurface prefix="tour-controlled" />
        <Tour
          {...args}
          open={open}
          step={step}
          steps={steps}
          onOpenChange={setOpen}
          onStepChange={setStep}
        />
      </VStack>
    )
  },
}
