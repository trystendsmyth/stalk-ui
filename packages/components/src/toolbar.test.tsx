import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Toolbar } from './toolbar'

const Example = () => (
  <Toolbar aria-label="Formatting">
    <Toolbar.ToggleGroup type="single" aria-label="Alignment">
      <Toolbar.ToggleItem value="left" aria-label="Left">
        L
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem value="center" aria-label="Center">
        C
      </Toolbar.ToggleItem>
    </Toolbar.ToggleGroup>
    <Toolbar.Separator />
    <Toolbar.Button>Save</Toolbar.Button>
  </Toolbar>
)

test('exposes a labelled toolbar role', () => {
  render(<Example />)
  expect(screen.getByRole('toolbar', { name: 'Formatting' })).toBeInTheDocument()
})

test('moves focus between controls with the arrow keys (roving tabindex)', async () => {
  const user = userEvent.setup()
  render(<Example />)
  await user.tab()
  expect(screen.getByRole('radio', { name: 'Left' })).toHaveFocus()
  await user.keyboard('{ArrowRight}')
  expect(screen.getByRole('radio', { name: 'Center' })).toHaveFocus()
})

test('renders without axe violations', async () => {
  const { container } = render(<Example />)
  const results = await axe(container)
  expect(results.violations).toHaveLength(0)
})

test('applies the root recipe class', () => {
  const { container } = render(<Example />)
  expect(container.querySelector('[role="toolbar"]')?.className).toContain('stalk-toolbar__root')
})

test('forwards ref to the root element', () => {
  const ref = createRef<HTMLDivElement>()
  render(
    <Toolbar ref={ref} aria-label="Tools">
      <Toolbar.Button>One</Toolbar.Button>
    </Toolbar>,
  )
  expect(ref.current).toBeInstanceOf(HTMLDivElement)
})
