import { Bold, Italic, Underline } from 'lucide-react'

import { Toolbar } from './toolbar'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Navigation/Toolbar',
  component: Toolbar,
  tags: ['autodocs', 'stable'],
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
} satisfies Meta<typeof Toolbar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Toolbar {...args} aria-label="Formatting">
      <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
        <Toolbar.ToggleItem value="bold" aria-label="Bold">
          <Bold />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem value="italic" aria-label="Italic">
          <Italic />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem value="underline" aria-label="Underline">
          <Underline />
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
      <Toolbar.Separator />
      <Toolbar.Button>Comment</Toolbar.Button>
      <Toolbar.Link href="#">Share</Toolbar.Link>
    </Toolbar>
  ),
}

export const Vertical: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Toolbar orientation="vertical" aria-label="Tools">
      <Toolbar.Button>New</Toolbar.Button>
      <Toolbar.Button>Open</Toolbar.Button>
      <Toolbar.Separator />
      <Toolbar.Button>Export</Toolbar.Button>
    </Toolbar>
  ),
}
