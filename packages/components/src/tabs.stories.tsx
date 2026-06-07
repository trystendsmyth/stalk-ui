import { BarChart, Settings, User } from 'lucide-react'
import { css } from 'styled-system/css'
import { VStack } from 'styled-system/jsx'
import { tabs as tabsRecipe } from 'styled-system/recipes'

import { TabsContent, TabsList, TabsRoot, TabsTrigger } from './tabs'
import { TONES } from './tones'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'

const { size: SIZES, variant: VARIANTS } = tabsRecipe.variantMap

/** Demo content wrapper: centers the placeholder text inside the panel so the
 *  stories read as visual previews rather than as bare flush-left labels. Real
 *  consumers can fill the panel with any layout they want. */
const panel = css({ color: 'fg.muted', textAlign: 'center' })

const Panel = ({ children }: { children: ReactNode }) => <div className={panel}>{children}</div>

const meta = {
  title: 'Components/Navigation/Tabs',
  component: TabsRoot,
  tags: ['autodocs', 'stable'],
  args: {
    defaultValue: 'overview',
    fitted: false,
    size: 'md',
    tone: 'accent',
    variant: 'line',
  },
  argTypes: {
    size: { control: 'inline-radio', options: SIZES },
    tone: { control: 'select', options: TONES },
    variant: { control: 'select', options: VARIANTS },
    fitted: { control: 'boolean' },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Tabs backed by Radix Tabs. Variants: `line` (underline), `segmented` (pill group), `pills` (rounded). Supports horizontal & vertical orientation.',
      },
    },
  },
} satisfies Meta<typeof TabsRoot>

export default meta

type Story = StoryObj<typeof meta>

const Demo = () => (
  <>
    <TabsList>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="analytics">Analytics</TabsTrigger>
      <TabsTrigger value="settings">Settings</TabsTrigger>
    </TabsList>
    <TabsContent value="overview">
      <Panel>Overview panel.</Panel>
    </TabsContent>
    <TabsContent value="analytics">
      <Panel>Analytics panel.</Panel>
    </TabsContent>
    <TabsContent value="settings">
      <Panel>Settings panel.</Panel>
    </TabsContent>
  </>
)

export const Default: Story = {
  render: (args) => (
    <TabsRoot {...args}>
      <Demo />
    </TabsRoot>
  ),
}

export const Segmented: Story = {
  args: { variant: 'segmented', fitted: true },
  render: (args) => (
    <TabsRoot {...args}>
      <Demo />
    </TabsRoot>
  ),
}

export const Pills: Story = {
  args: { variant: 'pills' },
  render: (args) => (
    <TabsRoot {...args}>
      <Demo />
    </TabsRoot>
  ),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="stretch" gap="20">
      {SIZES.map((size) => (
        <TabsRoot key={size} defaultValue="overview" size={size}>
          <Demo />
        </TabsRoot>
      ))}
    </VStack>
  ),
}

export const WithIcons: Story = {
  render: (args) => (
    <TabsRoot {...args}>
      <TabsList>
        <TabsTrigger value="account">
          <User aria-hidden="true" size={14} /> Account
        </TabsTrigger>
        <TabsTrigger value="analytics">
          <BarChart aria-hidden="true" size={14} /> Analytics
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Settings aria-hidden="true" size={14} /> Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Panel>Account panel.</Panel>
      </TabsContent>
      <TabsContent value="analytics">
        <Panel>Analytics panel.</Panel>
      </TabsContent>
      <TabsContent value="settings">
        <Panel>Settings panel.</Panel>
      </TabsContent>
    </TabsRoot>
  ),
  args: { defaultValue: 'account' },
}

export const Vertical: Story = {
  args: { orientation: 'vertical', variant: 'line' },
  render: (args) => (
    <TabsRoot {...args}>
      <Demo />
    </TabsRoot>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <TabsRoot {...args}>
      <TabsList>
        <TabsTrigger value="a">Available</TabsTrigger>
        <TabsTrigger value="b" disabled>
          Locked
        </TabsTrigger>
        <TabsTrigger value="c">Other</TabsTrigger>
      </TabsList>
      <TabsContent value="a">
        <Panel>Available content.</Panel>
      </TabsContent>
      <TabsContent value="b">
        <Panel>Locked content.</Panel>
      </TabsContent>
      <TabsContent value="c">
        <Panel>Other content.</Panel>
      </TabsContent>
    </TabsRoot>
  ),
  args: { defaultValue: 'a' },
}
