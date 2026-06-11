import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { beforeAll, expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { Combobox } from './combobox'

beforeAll(() => {
  Element.prototype.scrollIntoView = () => undefined
})

const options = [
  { label: 'Next.js', value: 'next' },
  { label: 'Remix', value: 'remix' },
  { label: 'Astro', value: 'astro' },
]

const ControlledCombobox = ({ onChange }: { onChange?: (value: string) => void }) => {
  const [value, setValue] = useState<string>()
  return (
    <Combobox
      aria-label="Framework"
      options={options}
      value={value}
      onChange={(next) => {
        setValue(next)
        onChange?.(next)
      }}
    />
  )
}

test('renders the trigger with a placeholder and no axe violations', async () => {
  const { container } = render(<ControlledCombobox />)
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('combobox', { name: 'Framework' })).toHaveTextContent('Select an option…')
})

test('selects an option from the popover', async () => {
  const user = userEvent.setup()
  const onChange = vi.fn()
  render(<ControlledCombobox onChange={onChange} />)

  await user.click(screen.getByRole('combobox', { name: 'Framework' }))
  await user.click(await screen.findByRole('option', { name: 'Remix' }))

  expect(onChange).toHaveBeenCalledWith('remix')
  expect(screen.getByRole('combobox', { name: 'Framework' })).toHaveTextContent('Remix')
})
