import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Accordion } from './accordion'

const renderAccordion = () =>
  render(
    <Accordion type="single" collapsible>
      <Accordion.Item value="one">
        <Accordion.Trigger>One</Accordion.Trigger>
        <Accordion.Content>First panel</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="two">
        <Accordion.Trigger>Two</Accordion.Trigger>
        <Accordion.Content>Second panel</Accordion.Content>
      </Accordion.Item>
    </Accordion>,
  )

test('renders without axe violations', async () => {
  const { container } = renderAccordion()
  const results = await axe(container)
  expect(results.violations).toHaveLength(0)
})

test('expands and collapses panels via trigger', async () => {
  const user = userEvent.setup()
  renderAccordion()

  const firstTrigger = screen.getByRole('button', { name: 'One' })
  expect(firstTrigger).toHaveAttribute('aria-expanded', 'false')

  await user.click(firstTrigger)
  expect(firstTrigger).toHaveAttribute('aria-expanded', 'true')
  expect(screen.getByText('First panel')).toBeInTheDocument()

  await user.click(firstTrigger)
  expect(firstTrigger).toHaveAttribute('aria-expanded', 'false')
})

test('navigates between triggers with arrow keys', async () => {
  const user = userEvent.setup()
  renderAccordion()

  const firstTrigger = screen.getByRole('button', { name: 'One' })
  const secondTrigger = screen.getByRole('button', { name: 'Two' })

  firstTrigger.focus()
  await user.keyboard('{ArrowDown}')
  expect(secondTrigger).toHaveFocus()
})

test('applies slot classes', () => {
  renderAccordion()
  expect(screen.getByRole('button', { name: 'One' })).toHaveClass('stalk-accordion__trigger')
})
