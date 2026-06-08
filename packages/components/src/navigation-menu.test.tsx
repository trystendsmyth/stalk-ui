import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { NavigationMenu } from './navigation-menu'

const renderNavigationMenu = () =>
  render(
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul>
              <li>
                <NavigationMenu.Link href="#analytics">Analytics</NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#pricing">Pricing</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>,
  )

test('renders accessible navigation without axe violations', async () => {
  const { container } = renderNavigationMenu()
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('navigation')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Products' })).toHaveAttribute('aria-expanded', 'false')
  expect(screen.getByRole('link', { name: 'Pricing' })).toHaveClass('stalk-navigation-menu__link')
})

test('expands a menu item on trigger click', async () => {
  const user = userEvent.setup()
  renderNavigationMenu()

  await user.click(screen.getByRole('button', { name: 'Products' }))
  expect(screen.getByRole('button', { name: 'Products' })).toHaveAttribute('aria-expanded', 'true')
  expect(await screen.findByRole('link', { name: 'Analytics' })).toBeInTheDocument()
})

test('applies trigger slot classes', () => {
  renderNavigationMenu()

  expect(screen.getByRole('button', { name: 'Products' })).toHaveClass(
    'stalk-navigation-menu__trigger',
  )
})
