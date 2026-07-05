import { Button } from './button'
import { Drawer } from './drawer'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Overlay/Drawer',
  component: Drawer.Root,
  tags: ['autodocs', 'stable'],
  parameters: { controls: { disable: true } },
} satisfies Meta<typeof Drawer.Root>

export default meta

type Story = StoryObj<typeof meta>

// Vaul-backed bottom sheet: drag the handle down (or tap the overlay) to
// dismiss. `sheet` remains the side-panel primitive; Drawer is the mobile edge.
export const Default: Story = {
  render: () => (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="outline">Open filters</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Filters</Drawer.Title>
          <Drawer.Description>Narrow the device list.</Drawer.Description>
        </Drawer.Header>
        <Drawer.Body>
          <p>Any content scrolls here.</p>
        </Drawer.Body>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button>Apply</Button>
          </Drawer.Close>
          <Drawer.Close asChild>
            <Button variant="outline">Cancel</Button>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  ),
}
