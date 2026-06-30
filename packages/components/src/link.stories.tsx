import { fn } from 'storybook/test'
import { HStack, VStack } from 'styled-system/jsx'
import { link as linkRecipe } from 'styled-system/recipes'

import { Link } from './link'
import { Text } from './text'
import { TONES } from './tones'

import type { Meta, StoryObj } from '@storybook/react-vite'

const { underline: UNDERLINES } = linkRecipe.variantMap

const meta = {
  title: 'Components/Typography/Link',
  component: Link,
  tags: ['autodocs', 'stable'],
  args: {
    children: 'View documentation',
    href: '#',
    onClick: fn(),
    tone: 'accent',
    underline: 'hover',
  },
  argTypes: {
    asChild: { table: { disable: true } },
    children: { control: 'text' },
    className: { table: { disable: true } },
    href: { control: 'text' },
    onClick: { table: { disable: true } },
    tone: { control: 'select', options: TONES },
    underline: { control: 'inline-radio', options: UNDERLINES },
  },
} satisfies Meta<typeof Link>

export default meta

type Story = StoryObj<typeof meta>

// Showcases every semantic tone, incl. success/warning hues that don't hit 4.5:1 —
// a tone-palette demo, not the recommended link color; disable color-contrast.
const noContrast = { a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } } }

export const Default: Story = {}

export const Underlines: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack gap="16" flexWrap="wrap">
      {UNDERLINES.map((underline) => (
        <Link key={underline} href="#" underline={underline}>
          {underline}
        </Link>
      ))}
    </HStack>
  ),
}

export const Tones: Story = {
  parameters: { controls: { disable: true }, ...noContrast },
  render: () => (
    <VStack alignItems="flex-start" gap="8">
      {TONES.map((tone) => (
        <Link key={tone} href="#" tone={tone} underline="always">
          {tone}
        </Link>
      ))}
    </VStack>
  ),
}

export const InProse: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Text>
      Read the <Link href="#">getting started guide</Link> for setup instructions.
    </Text>
  ),
}
