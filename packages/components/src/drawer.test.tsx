import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { Button } from './button'
import { Drawer } from './drawer'

const renderDrawer = () =>
  render(
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="outline">Open filters</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Filters</Drawer.Title>
          <Drawer.Description>Narrow the device list.</Drawer.Description>
        </Drawer.Header>
        <Drawer.Body>Body content</Drawer.Body>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button>Apply</Button>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>,
  )

test('opens from the trigger with dialog semantics', async () => {
  const user = userEvent.setup()
  const { baseElement } = renderDrawer()

  await user.click(screen.getByRole('button', { name: 'Open filters' }))

  expect(await screen.findByRole('dialog')).toBeInTheDocument()
  expect(screen.getByText('Filters')).toBeInTheDocument()
  expect(screen.getByText('Narrow the device list.')).toBeInTheDocument()
  expect((await axe(baseElement)).violations).toHaveLength(0)
})

test('close requests dismissal (vaul keeps the node until its exit animation)', async () => {
  const user = userEvent.setup()
  const onOpenChange = vi.fn()
  render(
    <Drawer.Root open onOpenChange={onOpenChange}>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Filters</Drawer.Title>
        </Drawer.Header>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button>Apply</Button>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>,
  )

  await user.click(await screen.findByRole('button', { name: 'Apply' }))

  expect(onOpenChange).toHaveBeenCalledWith(false)
})
