import { AlertCircle, AlertTriangle, CheckCircle2, Info, Rocket, X } from 'lucide-react'
import { useState } from 'react'
import { VStack } from 'styled-system/jsx'
import { alert as alertRecipe } from 'styled-system/recipes'

import {
  AlertActions,
  AlertBody,
  AlertClose,
  AlertDescription,
  AlertIcon,
  AlertRoot,
  AlertTitle,
  type AlertTone,
} from './alert'
import { Button } from './button'
import { TONES } from './tones'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'

const { size: SIZES, variant: VARIANTS } = alertRecipe.variantMap

const TONE_ICONS: Record<AlertTone, ReactNode> = {
  accent: <Info />,
  info: <Info />,
  success: <CheckCircle2 />,
  warning: <AlertTriangle />,
  danger: <AlertCircle />,
}

const meta = {
  title: 'Components/Feedback/Alert',
  component: AlertRoot,
  tags: ['autodocs', 'stable'],
  args: {
    size: 'md',
    tone: 'info',
    variant: 'subtle',
  },
  argTypes: {
    size: { control: 'inline-radio', options: SIZES },
    tone: { control: 'select', options: TONES },
    variant: { control: 'select', options: VARIANTS },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Inline status message composed of dot-notated parts (`Alert.Icon`, `Alert.Body`, `Alert.Title`, `Alert.Description`, `Alert.Actions`, `Alert.Close`). Tone drives the colorPalette; the icon, copy, and actions are fully your call.',
      },
    },
  },
} satisfies Meta<typeof AlertRoot>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <AlertRoot {...args}>
      <AlertIcon>{TONE_ICONS[args.tone ?? 'info']}</AlertIcon>
      <AlertBody>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
      </AlertBody>
    </AlertRoot>
  ),
}

export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="stretch" gap="12">
      {TONES.map((tone) => (
        <AlertRoot key={tone} tone={tone}>
          <AlertIcon>{TONE_ICONS[tone]}</AlertIcon>
          <AlertBody>
            <AlertTitle>{`${tone} alert`}</AlertTitle>
            <AlertDescription>{`This is a ${tone} alert.`}</AlertDescription>
          </AlertBody>
        </AlertRoot>
      ))}
    </VStack>
  ),
}

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="stretch" gap="12">
      {VARIANTS.map((variant) => (
        <AlertRoot key={variant} tone="success" variant={variant}>
          <AlertIcon>
            <CheckCircle2 />
          </AlertIcon>
          <AlertBody>
            <AlertTitle>{`${variant} variant`}</AlertTitle>
            <AlertDescription>Successfully saved your changes.</AlertDescription>
          </AlertBody>
        </AlertRoot>
      ))}
    </VStack>
  ),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="stretch" gap="12">
      {SIZES.map((size) => (
        <AlertRoot key={size} size={size}>
          <AlertIcon>
            <Info />
          </AlertIcon>
          <AlertBody>
            <AlertTitle>{`${size} size`}</AlertTitle>
            <AlertDescription>Alert content scales with size.</AlertDescription>
          </AlertBody>
        </AlertRoot>
      ))}
    </VStack>
  ),
}

export const Dismissible: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    function Demo() {
      const [visible, setVisible] = useState(true)
      if (!visible) {
        return (
          <Button
            onClick={() => {
              setVisible(true)
            }}
          >
            Show alert
          </Button>
        )
      }
      return (
        <AlertRoot tone="warning">
          <AlertIcon>
            <AlertTriangle />
          </AlertIcon>
          <AlertBody>
            <AlertTitle>Storage almost full</AlertTitle>
            <AlertDescription>
              You&apos;re using 92% of your storage. Upgrade for more.
            </AlertDescription>
          </AlertBody>
          <AlertClose
            aria-label="Dismiss"
            onClick={() => {
              setVisible(false)
            }}
          >
            <X aria-hidden="true" />
          </AlertClose>
        </AlertRoot>
      )
    }
    return <Demo />
  },
}

export const WithActions: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <AlertRoot tone="danger">
      <AlertIcon>
        <AlertCircle />
      </AlertIcon>
      <AlertBody>
        <AlertTitle>Deployment failed</AlertTitle>
        <AlertDescription>Build #424 exited with code 1.</AlertDescription>
        <AlertActions>
          <Button size="sm" tone="danger" variant="solid">
            Retry build
          </Button>
          <Button size="sm" variant="ghost">
            View logs
          </Button>
        </AlertActions>
      </AlertBody>
    </AlertRoot>
  ),
}

export const CustomIcon: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <AlertRoot tone="accent">
      <AlertIcon>
        <Rocket />
      </AlertIcon>
      <AlertBody>
        <AlertTitle>New feature available</AlertTitle>
        <AlertDescription>Try our new collaboration tools.</AlertDescription>
      </AlertBody>
    </AlertRoot>
  ),
}

export const NoIcon: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <AlertRoot>
      <AlertBody>
        <AlertTitle>Bare alert</AlertTitle>
        <AlertDescription>No icon, just text.</AlertDescription>
      </AlertBody>
    </AlertRoot>
  ),
}
