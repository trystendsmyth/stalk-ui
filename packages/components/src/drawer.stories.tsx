import { Button } from './button'
import { Drawer } from './drawer'

import type { Meta, StoryObj } from '@storybook/react-vite'

// Wrapper so the story exposes the interesting knobs (Root's `direction`,
// Content's `showHandle`) as controls.
const DrawerDemo = ({
  direction = 'bottom',
  showHandle = true,
}: {
  direction?: 'top' | 'bottom' | 'left' | 'right'
  showHandle?: boolean
}) => (
  <Drawer.Root direction={direction}>
    <Drawer.Trigger asChild>
      <Button variant="outline">Open filters</Button>
    </Drawer.Trigger>
    <Drawer.Content showHandle={showHandle}>
      <Drawer.Header>
        <Drawer.Title>Filters</Drawer.Title>
        <Drawer.Description>Narrow the results.</Drawer.Description>
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
)

const meta = {
  title: 'Components/Overlay/Drawer',
  component: DrawerDemo,
  tags: ['autodocs', 'stable'],
  args: { direction: 'bottom', showHandle: true },
  argTypes: {
    direction: { control: 'inline-radio', options: ['top', 'bottom', 'left', 'right'] },
    showHandle: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Touch-first gesture sheet backed by Vaul: drag the handle (or flick toward the edge) to dismiss, from any edge via `direction`. Use Sheet instead for pointer-agnostic panels; Drawer earns its place through gesture physics that a CSS recipe cannot express.',
      },
    },
  },
} satisfies Meta<typeof DrawerDemo>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

// Capabilities Sheet structurally cannot offer: Drawer.Root is Vaul's Root, so
// gesture options like snap points pass straight through.
export const SnapPoints: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Vaul-only behavior that distinguishes Drawer from Sheet: the panel opens at a 40% detent, and dragging the handle snaps it between 40% and 90% of the viewport — with velocity-based settling. Every Vaul `Root` prop (`snapPoints`, `activeSnapPoint`, `dismissible`, …) passes through `Drawer.Root`.',
      },
    },
  },
  render: (args) => (
    <Drawer.Root snapPoints={[0.4, 0.9]}>
      <Drawer.Trigger asChild>
        <Button variant="outline">Open activity log</Button>
      </Drawer.Trigger>
      <Drawer.Content showHandle={args.showHandle ?? true}>
        <Drawer.Header>
          <Drawer.Title>Activity</Drawer.Title>
          <Drawer.Description>Drag the handle up for the full list.</Drawer.Description>
        </Drawer.Header>
        <Drawer.Body>
          <ul style={{ display: 'grid', gap: '0.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
            {Array.from({ length: 24 }, (_, index) => (
              <li key={index}>Event {index + 1}</li>
            ))}
          </ul>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  ),
}
