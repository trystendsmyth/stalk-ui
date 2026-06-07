import { ChevronsUpDown } from 'lucide-react'
import { css } from 'styled-system/css'
import { HStack, VStack } from 'styled-system/jsx'

import { Button } from './button'
import { Collapsible } from './collapsible'

import type { Meta, StoryObj } from '@storybook/react-vite'

const frame = css({ width: '420px' })
const panel = css({
  bgColor: 'bg.subtle',
  rounded: 'sm',
  fontSize: 'sm',
  mt: '8',
  p: '12',
})
const repoCard = css({
  bgColor: 'bg.default',
  border: 'default',
  rounded: 'sm',
  fontSize: 'sm',
  px: '12',
  py: '8',
  shadow: 'xs',
})
const repoHeader = css({
  color: 'fg.muted',
  fontSize: 'sm',
})

const meta = {
  title: 'Components/Disclosure/Collapsible',
  component: Collapsible.Root,
  tags: ['autodocs', 'stable'],
  parameters: { controls: { disable: true } },
} satisfies Meta<typeof Collapsible.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className={frame}>
      <Collapsible>
        <Collapsible.Trigger asChild>
          <Button size="sm" variant="ghost">
            Show details <ChevronsUpDown aria-hidden size={14} />
          </Button>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <VStack alignItems="flex-start" gap="4" className={panel}>
            <p>This panel reveals more information when expanded.</p>
            <p>Press the trigger again to collapse it.</p>
          </VStack>
        </Collapsible.Content>
      </Collapsible>
    </div>
  ),
}

export const Card: Story = {
  render: () => (
    <div className={frame}>
      <Collapsible defaultOpen>
        <VStack alignItems="stretch" gap="8">
          <HStack justifyContent="space-between" alignItems="center">
            <span className={repoHeader}>@peduarte starred 3 repositories</span>
            <Collapsible.Trigger asChild>
              <Button aria-label="Toggle" size="sm" variant="ghost">
                <ChevronsUpDown aria-hidden size={14} />
              </Button>
            </Collapsible.Trigger>
          </HStack>
          <div className={repoCard}>@radix-ui/primitives</div>
          <Collapsible.Content>
            <VStack alignItems="stretch" gap="8">
              <div className={repoCard}>@radix-ui/colors</div>
              <div className={repoCard}>@stitches/react</div>
            </VStack>
          </Collapsible.Content>
        </VStack>
      </Collapsible>
    </div>
  ),
}

export const OpenByDefault: Story = {
  render: () => (
    <div className={frame}>
      <Collapsible defaultOpen>
        <Collapsible.Trigger asChild>
          <Button size="sm" variant="outline">
            Toggle
          </Button>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <div className={panel}>Visible from the start.</div>
        </Collapsible.Content>
      </Collapsible>
    </div>
  ),
}
