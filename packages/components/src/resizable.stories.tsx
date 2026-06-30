import { Box } from 'styled-system/jsx'

import { Resizable, ResizableRoot } from './resizable'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof ResizableRoot> = {
  title: 'Components/Layout/Resizable',
  component: ResizableRoot,
  tags: ['autodocs', 'stable'],
  // Render-based stories demo each direction; the controls would not drive them.
  parameters: { controls: { disable: true } },
  args: {
    direction: 'horizontal',
  },
}

export default meta

type Story = StoryObj<typeof meta>

const Pane = ({ label }: { label: string }) => (
  <Box
    alignItems="center"
    blockSize="full"
    color="fg.default"
    display="flex"
    justifyContent="center"
    p="16"
    textStyle="body"
  >
    {label}
  </Box>
)

export const Horizontal: Story = {
  render: () => (
    <Box border="default" h="200px" overflow="hidden" rounded="md" w="420px">
      <Resizable direction="horizontal">
        <Resizable.Panel defaultSize={50}>
          <Pane label="One" />
        </Resizable.Panel>
        <Resizable.Handle withHandle />
        <Resizable.Panel defaultSize={50}>
          <Pane label="Two" />
        </Resizable.Panel>
      </Resizable>
    </Box>
  ),
}

export const Vertical: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Box border="default" h="260px" overflow="hidden" rounded="md" w="320px">
      <Resizable direction="vertical">
        <Resizable.Panel defaultSize={60}>
          <Pane label="Top" />
        </Resizable.Panel>
        <Resizable.Handle withHandle />
        <Resizable.Panel defaultSize={40}>
          <Pane label="Bottom" />
        </Resizable.Panel>
      </Resizable>
    </Box>
  ),
}
