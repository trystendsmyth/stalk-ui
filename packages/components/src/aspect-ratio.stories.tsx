import { Box } from 'styled-system/jsx'

import { AspectRatio } from './aspect-ratio'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Layout/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs', 'stable'],
  args: {
    ratio: 16 / 9,
  },
  argTypes: {
    className: { table: { disable: true } },
    ratio: { control: { type: 'number', step: 0.05 } },
    style: { table: { disable: true } },
  },
} satisfies Meta<typeof AspectRatio>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Box w="320px">
      <AspectRatio {...args}>
        <Box
          alignItems="center"
          bgColor="accent.subtle"
          color="accent.fg"
          display="flex"
          justifyContent="center"
          rounded="md"
          textStyle="bodySm"
        >
          {args.ratio?.toFixed(2)}
        </Box>
      </AspectRatio>
    </Box>
  ),
}

export const Square: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Box w="200px">
      <AspectRatio ratio={1}>
        <Box
          alignItems="center"
          bgColor="bg.subtle"
          border="default"
          color="fg.muted"
          display="flex"
          justifyContent="center"
          rounded="md"
          textStyle="bodySm"
        >
          1 : 1
        </Box>
      </AspectRatio>
    </Box>
  ),
}

export const Image: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Box w="320px">
      <AspectRatio ratio={16 / 9}>
        <img
          alt="Sand dunes under a clear sky"
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=640&h=360&fit=crop"
          style={{ borderRadius: 8 }}
        />
      </AspectRatio>
    </Box>
  ),
}
