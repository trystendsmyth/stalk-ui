import { Box, HStack, Stack } from 'styled-system/jsx'

import { Separator } from './separator'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Layout/Separator',
  component: Separator,
  tags: ['autodocs', 'stable'],
  args: {
    orientation: 'horizontal',
    decorative: true,
  },
  argTypes: {
    className: { table: { disable: true } },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    style: { table: { disable: true } },
  },
} satisfies Meta<typeof Separator>

export default meta

type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: (args) => (
    <Stack gap="12" w="320px">
      <Box color="fg.default" textStyle="body">
        Stalk UI
      </Box>
      <Separator {...args} orientation="horizontal" />
      <Box color="fg.muted" textStyle="bodySm">
        An accessible, PandaCSS-native component library.
      </Box>
    </Stack>
  ),
}

export const Vertical: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack alignItems="center" gap="12" color="fg.default" h="20px" textStyle="bodySm">
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>Storybook</span>
      <Separator orientation="vertical" />
      <span>GitHub</span>
    </HStack>
  ),
}

export const SemanticBoundary: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack gap="12" w="320px">
      <Box color="fg.default" textStyle="body">
        Section above
      </Box>
      {/* A meaningful boundary for assistive tech: decorative={false} → role="separator". */}
      <Separator decorative={false} />
      <Box color="fg.default" textStyle="body">
        Section below
      </Box>
    </Stack>
  ),
}
