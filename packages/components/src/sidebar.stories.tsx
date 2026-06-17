import { Home, Inbox, Settings } from 'lucide-react'
import { Box } from 'styled-system/jsx'

import { Sidebar } from './sidebar'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Navigation/Sidebar',
  component: Sidebar,
  tags: ['autodocs', 'stable'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Sidebar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Header>
          <Sidebar.Trigger />
          <Box color="fg.default" fontWeight="semibold">
            Aperture
          </Box>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton isActive>
                  <Home />
                  <span>Queue</span>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  <Inbox />
                  <span>Cases</span>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  <Settings />
                  <span>Settings</span>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Rail />
      </Sidebar>
      <Sidebar.Inset>
        <Box alignItems="center" display="flex" gap="8" p="12">
          <Sidebar.Trigger />
          <Box color="fg.default" textStyle="headingMd">
            Triage Queue
          </Box>
        </Box>
        <Box color="fg.muted" px="12">
          Press Cmd/Ctrl+B to toggle the sidebar.
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
