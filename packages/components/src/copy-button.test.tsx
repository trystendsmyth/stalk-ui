import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { CopyButton } from './copy-button'

test('copies the value and confirms transiently', async () => {
  const user = userEvent.setup()
  // userEvent stubs navigator.clipboard during setup; spy on its writeText.
  const writeText = vi.spyOn(navigator.clipboard, 'writeText')

  const { container } = render(<CopyButton value="pnpm dlx @stalk-ui/cli add button" />)
  expect((await axe(container)).violations).toHaveLength(0)

  await user.click(screen.getByRole('button', { name: 'Copy' }))

  expect(writeText).toHaveBeenCalledWith('pnpm dlx @stalk-ui/cli add button')
  expect(await screen.findByRole('button', { name: 'Copied' })).toBeInTheDocument()
})

test('supports custom labels', () => {
  render(<CopyButton copiedLabel="In clipboard" label="Copy id" value="abc" />)

  expect(screen.getByRole('button', { name: 'Copy id' })).toBeInTheDocument()
})
