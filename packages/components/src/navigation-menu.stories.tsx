import { fn } from 'storybook/test'

import { NavigationMenu } from './navigation-menu'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Navigation/Navigation Menu',
  component: NavigationMenu.Root,
  tags: ['autodocs', 'stable'],
  args: {
    delayDuration: 200,
    dir: 'ltr',
    onValueChange: fn(),
    orientation: 'horizontal',
  },
  argTypes: {
    asChild: { table: { disable: true } },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
    defaultValue: { control: 'text' },
    delayDuration: { control: 'number' },
    dir: { control: 'inline-radio', options: ['ltr', 'rtl'] },
    id: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    skipDelayDuration: { control: 'number' },
    style: { table: { disable: true } },
    value: { table: { disable: true } },
  },
} satisfies Meta<typeof NavigationMenu.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <NavigationMenu.Root {...args}>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul style={{ minWidth: '14rem' }}>
              <li>
                <NavigationMenu.Link href="#">Analytics</NavigationMenu.Link>
              </li>
              <li>
                <NavigationMenu.Link href="#">Automation</NavigationMenu.Link>
              </li>
              <li>
                <NavigationMenu.Link href="#">Reports</NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Company</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul style={{ minWidth: '14rem' }}>
              <li>
                <NavigationMenu.Link href="#">About</NavigationMenu.Link>
              </li>
              <li>
                <NavigationMenu.Link href="#">Careers</NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#">Pricing</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  ),
}
