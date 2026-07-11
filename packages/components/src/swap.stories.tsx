import { Moon, Pause, Play, Sun } from 'lucide-react'
import { useState } from 'react'
import { HStack } from 'styled-system/jsx'

import { Button } from './button'
import { Swap } from './swap'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Display/Swap',
  component: Swap,
  tags: ['autodocs', 'stable'],
  args: {
    effect: 'fade',
    off: <Moon size={20} />,
    on: <Sun size={20} />,
    swap: true,
  },
  argTypes: {
    className: { table: { disable: true } },
    effect: { control: 'inline-radio', options: ['fade', 'rotate', 'flip', 'scale'] },
    off: { table: { disable: true } },
    on: { table: { disable: true } },
    swap: { control: 'boolean' },
  },
} satisfies Meta<typeof Swap>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Click the icon to swap it (the `swap` and `effect` controls drive it too).',
      },
    },
  },
  render: (args) => {
    // Local click-toggle layered over the `swap` control so the story
    // demonstrates the transition without opening the controls panel.
    const [override, setOverride] = useState<boolean | undefined>(undefined)
    const swapped = override ?? args.swap
    return (
      <Button
        aria-label="Toggle"
        variant="ghost"
        onClick={() => {
          setOverride(!swapped)
        }}
      >
        <Swap {...args} swap={swapped} />
      </Button>
    )
  },
}

export const InsideAControl: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Swap is presentational — the wrapping control owns the state and the accessible name. Click to toggle.',
      },
    },
  },
  render: () => {
    const [dark, setDark] = useState(false)
    const [playing, setPlaying] = useState(false)
    return (
      <HStack gap="12">
        <Button
          aria-label="Toggle color mode"
          variant="outline"
          onClick={() => {
            setDark((previous) => !previous)
          }}
        >
          <Swap effect="rotate" off={<Sun size={16} />} on={<Moon size={16} />} swap={dark} />
          {dark ? 'Dark' : 'Light'}
        </Button>
        <Button
          aria-label={playing ? 'Pause' : 'Play'}
          onClick={() => {
            setPlaying((previous) => !previous)
          }}
        >
          <Swap effect="flip" off={<Play size={16} />} on={<Pause size={16} />} swap={playing} />
        </Button>
      </HStack>
    )
  },
}

export const Effects: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'The transition effects, toggling together: fade, rotate, flip, and scale.',
      },
    },
  },
  render: () => {
    const [swapped, setSwapped] = useState(true)
    return (
      <HStack gap="24">
        <Button
          variant="outline"
          onClick={() => {
            setSwapped((previous) => !previous)
          }}
        >
          Toggle
        </Button>
        {(['fade', 'rotate', 'flip', 'scale'] as const).map((effect) => (
          <figure key={effect} style={{ margin: 0, textAlign: 'center' }}>
            <Swap effect={effect} off={<Moon size={24} />} on={<Sun size={24} />} swap={swapped} />
            <figcaption>
              <code>{effect}</code>
            </figcaption>
          </figure>
        ))}
      </HStack>
    )
  },
}
