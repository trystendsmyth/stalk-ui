import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { TabsContent, TabsList, TabsRoot, TabsTrigger } from './tabs'

const renderTabs = () =>
  render(
    <TabsRoot defaultValue="one">
      <TabsList>
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two">Two</TabsTrigger>
        <TabsTrigger value="three" disabled>
          Three
        </TabsTrigger>
      </TabsList>
      <TabsContent value="one">Panel one</TabsContent>
      <TabsContent value="two">Panel two</TabsContent>
      <TabsContent value="three">Panel three</TabsContent>
    </TabsRoot>,
  )

test('renders without axe violations', async () => {
  const { container } = renderTabs()
  const results = await axe(container)
  expect(results.violations).toHaveLength(0)
})

test('exposes proper roles and active tab', () => {
  renderTabs()
  expect(screen.getAllByRole('tab')).toHaveLength(3)
  expect(screen.getByRole('tab', { name: 'One', selected: true })).toBeInTheDocument()
  expect(screen.getByRole('tabpanel', { name: 'One' })).toBeInTheDocument()
})

test('switches panels when a tab is clicked', async () => {
  const user = userEvent.setup()
  renderTabs()
  await user.click(screen.getByRole('tab', { name: 'Two' }))
  expect(screen.getByRole('tab', { name: 'Two', selected: true })).toBeInTheDocument()
  expect(screen.getByRole('tabpanel', { name: 'Two' })).toBeInTheDocument()
})

test('skips disabled tabs on keyboard navigation', async () => {
  const user = userEvent.setup()
  renderTabs()
  screen.getByRole('tab', { name: 'One' }).focus()
  await user.keyboard('{ArrowRight}')
  expect(screen.getByRole('tab', { name: 'Two' })).toHaveFocus()
  await user.keyboard('{ArrowRight}')
  expect(screen.getByRole('tab', { name: 'One' })).toHaveFocus()
})

test('throws helpful error when sub-parts are used outside TabsRoot', () => {
  const noop = () => undefined
  const spy = vi.spyOn(console, 'error').mockImplementation(noop)
  expect(() => render(<TabsList />)).toThrow(/inside <TabsRoot>/)
  spy.mockRestore()
})
