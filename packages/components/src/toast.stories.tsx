import { HStack } from 'styled-system/jsx'

import { Button } from './button'
import { Toaster, toast } from './toast'

import type { Meta, StoryObj } from '@storybook/react-vite'

const POSITIONS = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
] as const

const meta = {
  title: 'Components/Feedback/Toast',
  component: Toaster,
  tags: ['autodocs', 'stable'],
  args: {
    closeButton: false,
    dir: 'auto',
    duration: 4000,
    expand: false,
    gap: 14,
    invert: false,
    offset: 24,
    position: 'top-center',
    richColors: false,
    visibleToasts: 3,
  },
  argTypes: {
    closeButton: { control: 'boolean' },
    containerAriaLabel: { control: 'text' },
    dir: { control: 'inline-radio', options: ['auto', 'ltr', 'rtl'] },
    duration: { control: { type: 'number', min: 0, step: 500 } },
    expand: { control: 'boolean' },
    gap: { control: { type: 'number', min: 0, step: 2 } },
    hotkey: { table: { disable: true } },
    icons: { table: { disable: true } },
    invert: { control: 'boolean' },
    mobileOffset: { table: { disable: true } },
    offset: { control: 'text' },
    position: { control: 'select', options: POSITIONS },
    richColors: { control: 'boolean' },
    style: { table: { disable: true } },
    swipeDirections: { table: { disable: true } },
    theme: { control: 'inline-radio', options: ['system', 'light', 'dark'] },
    toastOptions: { table: { disable: true } },
    visibleToasts: { control: { type: 'number', min: 1, max: 10 } },
  },
} satisfies Meta<typeof Toaster>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <>
      <HStack gap="8">
        <Button
          onClick={() => {
            toast('Project saved', {
              description: 'Your changes are visible to teammates.',
            })
          }}
        >
          Show toast
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            toast.success('Invite sent', {
              description: 'teammate@stalk-ui.com will receive an email shortly.',
            })
          }}
        >
          Success toast
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            toast.error('Could not save project', {
              description: 'Check your connection and try again.',
            })
          }}
        >
          Error toast
        </Button>
      </HStack>
      <Toaster {...args} />
    </>
  ),
}

export const RichColors: Story = {
  args: { richColors: true },
  render: (args) => (
    <>
      <HStack gap="8">
        <Button
          tone="success"
          onClick={() => {
            toast.success('Saved', { description: 'Rich-color success variant.' })
          }}
        >
          Success
        </Button>
        <Button
          tone="warning"
          onClick={() => {
            toast.warning('Heads up', { description: 'Rich-color warning variant.' })
          }}
        >
          Warning
        </Button>
        <Button
          tone="danger"
          onClick={() => {
            toast.error('Failed', { description: 'Rich-color error variant.' })
          }}
        >
          Error
        </Button>
      </HStack>
      <Toaster {...args} />
    </>
  ),
}

export const WithAction: Story = {
  render: (args) => (
    <>
      <Button
        onClick={() => {
          toast('Message archived', {
            description: 'Removed from your inbox.',
            action: {
              label: 'Undo',
              onClick: () => {
                toast('Restored')
              },
            },
          })
        }}
      >
        Archive
      </Button>
      <Toaster {...args} />
    </>
  ),
}
