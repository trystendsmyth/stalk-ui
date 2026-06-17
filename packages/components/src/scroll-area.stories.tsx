import { Box, HStack } from 'styled-system/jsx'

import { ScrollArea } from './scroll-area'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Layout/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs', 'stable'],
  argTypes: {
    className: { table: { disable: true } },
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal', 'both'] },
    style: { table: { disable: true } },
  },
} satisfies Meta<typeof ScrollArea>

export default meta

type Story = StoryObj<typeof meta>

const TAGS = Array.from({ length: 40 }, (_, index) => `Tag ${String(index + 1)}`)

export const Vertical: Story = {
  render: (args) => (
    <Box border="default" overflow="hidden" rounded="md">
      <ScrollArea {...args} style={{ blockSize: 200, inlineSize: 240 }}>
        <Box p="12">
          <Box color="fg.muted" pb="8" textStyle="bodySm">
            Tags
          </Box>
          {TAGS.map((tag) => (
            <Box
              key={tag}
              borderBlockEndWidth="1px"
              borderColor="border.muted"
              py="6"
              textStyle="body"
            >
              {tag}
            </Box>
          ))}
        </Box>
      </ScrollArea>
    </Box>
  ),
}

export const Horizontal: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Box border="default" overflow="hidden" rounded="md">
      <ScrollArea orientation="horizontal" style={{ inlineSize: 320 }}>
        <HStack gap="12" p="12" w="max-content">
          {Array.from({ length: 16 }, (_, index) => (
            <Box
              key={index}
              alignItems="center"
              bgColor="bg.subtle"
              blockSize="80px"
              display="flex"
              inlineSize="80px"
              justifyContent="center"
              rounded="md"
              textStyle="bodySm"
            >
              {index + 1}
            </Box>
          ))}
        </HStack>
      </ScrollArea>
    </Box>
  ),
}
