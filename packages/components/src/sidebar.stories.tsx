import { FileText, Home, Inbox, Settings } from 'lucide-react'
import { useState } from 'react'
import { fn } from 'storybook/test'
import { Box } from 'styled-system/jsx'

import { Sidebar } from './sidebar'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ComponentType } from 'react'

const meta = {
  title: 'Components/Navigation/Sidebar',
  component: Sidebar,
  tags: ['autodocs', 'stable'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof Sidebar>

export default meta

type Story = StoryObj<typeof meta>

interface NavItem {
  icon: ComponentType
  key: string
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { key: 'queue', label: 'Queue', icon: Home },
  { key: 'cases', label: 'Cases', icon: Inbox },
  { key: 'reports', label: 'Reports', icon: FileText },
  { key: 'settings', label: 'Settings', icon: Settings },
]

// `isActive` is consumer-owned (usually derived from the current route). This
// story manages it locally so clicking a nav item visibly navigates: the active
// highlight moves and the inset content updates.
const NavSidebar = () => {
  const [active, setActive] = useState('queue')
  const current = NAV_ITEMS.find((item) => item.key === active)

  return (
    <Sidebar.Provider onOpenChange={fn()}>
      <Sidebar>
        <Sidebar.Header>
          <Sidebar.Trigger />
          <Box as="span" color="fg.default" fontWeight="semibold">
            Dashboard
          </Box>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
            <Sidebar.Menu>
              {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
                <Sidebar.MenuItem key={key}>
                  <Sidebar.MenuButton
                    aria-label={label}
                    isActive={active === key}
                    onClick={() => {
                      setActive(key)
                    }}
                  >
                    <Icon />
                    <span>{label}</span>
                  </Sidebar.MenuButton>
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Rail />
      </Sidebar>
      <Sidebar.Inset>
        <Box alignItems="center" display="flex" gap="8" p="12">
          <Sidebar.Trigger />
          <Box color="fg.default" textStyle="headingMd">
            {current?.label}
          </Box>
        </Box>
        <Box color="fg.muted" px="12">
          Showing the {current?.label} screen. Click a nav item to navigate, or press Cmd/Ctrl+B to
          toggle the sidebar.
        </Box>
      </Sidebar.Inset>
    </Sidebar.Provider>
  )
}

export const Default: Story = {
  render: () => <NavSidebar />,
}

// Router links: pass `asChild` so the menu button renders your `<a>` / framework
// link. Active state still comes from the consumer (here a real anchor).
export const WithLinks: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Header>
          <Sidebar.Trigger />
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive>
                <a href="#queue">
                  <Home />
                  <span>Queue</span>
                </a>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild>
                <a href="#settings">
                  <Settings />
                  <span>Settings</span>
                </a>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Content>
      </Sidebar>
      <Sidebar.Inset>
        <Box color="fg.muted" p="12">
          Menu buttons render as real links via <code>asChild</code>.
        </Box>
      </Sidebar.Inset>
    </Sidebar.Provider>
  ),
}

export const Collapsed: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Sidebar.Provider defaultOpen={false}>
      <Sidebar>
        <Sidebar.Header>
          <Sidebar.Trigger />
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton isActive aria-label="Queue">
                <Home />
                <span>Queue</span>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton aria-label="Settings">
                <Settings />
                <span>Settings</span>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Content>
      </Sidebar>
      <Sidebar.Inset>
        <Box color="fg.muted" p="12">
          Collapsed by default — labels are hidden, icons remain.
        </Box>
      </Sidebar.Inset>
    </Sidebar.Provider>
  ),
}
