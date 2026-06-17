import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Sidebar } from './sidebar'

const Example = () => (
  <Sidebar.Provider>
    <Sidebar>
      <Sidebar.Header>
        <Sidebar.Trigger />
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton isActive>
                <span>Queue</span>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                <span>Settings</span>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>
      <Sidebar.Rail />
    </Sidebar>
    <Sidebar.Inset>content</Sidebar.Inset>
  </Sidebar.Provider>
)

test('renders a labelled sidebar landmark', () => {
  render(<Example />)
  expect(screen.getByRole('complementary', { name: 'Sidebar' })).toBeInTheDocument()
})

test('starts expanded and collapses when the trigger is activated', async () => {
  const user = userEvent.setup()
  render(<Example />)
  const sidebar = screen.getByRole('complementary', { name: 'Sidebar' })
  expect(sidebar).toHaveAttribute('data-state', 'expanded')
  await user.click(screen.getByRole('button', { name: 'Toggle sidebar' }))
  expect(sidebar).toHaveAttribute('data-state', 'collapsed')
})

test('toggles with the Cmd/Ctrl+B keyboard shortcut', async () => {
  const user = userEvent.setup()
  render(<Example />)
  const sidebar = screen.getByRole('complementary', { name: 'Sidebar' })
  await user.keyboard('{Control>}b{/Control}')
  expect(sidebar).toHaveAttribute('data-state', 'collapsed')
})

test('marks the active menu button with aria-current', () => {
  render(<Example />)
  expect(screen.getByText('Queue').closest('button')).toHaveAttribute('aria-current', 'page')
})

test('throws when parts render outside the provider', () => {
  expect(() => render(<Sidebar.Trigger />)).toThrow(/must be used within a <SidebarProvider>/)
})

test('renders without axe violations', async () => {
  const { container } = render(<Example />)
  const results = await axe(container)
  expect(results.violations).toHaveLength(0)
})
