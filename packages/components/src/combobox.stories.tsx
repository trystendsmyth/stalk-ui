import { useState } from 'react'
import { fn } from 'storybook/test'

import { Combobox } from './combobox'

import type { ComboboxSingleProps } from './combobox'
import type { Meta, StoryObj } from '@storybook/react-vite'

const frameworks = [
  { label: 'Next.js', value: 'next' },
  { label: 'Remix', value: 'remix' },
  { label: 'Astro', value: 'astro' },
  { label: 'SvelteKit', value: 'sveltekit' },
  { label: 'Nuxt', value: 'nuxt' },
]

const meta = {
  title: 'Components/Selection/Combobox',
  component: Combobox,
  tags: ['autodocs', 'stable'],
  args: {
    disabled: false,
    emptyText: 'No results found.',
    onChange: fn(),
    options: frameworks,
    placeholder: 'Select a framework…',
    searchPlaceholder: 'Search…',
    size: 'md',
    'aria-label': 'Framework',
  },
  argTypes: {
    'aria-label': { control: 'text' },
    className: { table: { disable: true } },
    disabled: { control: 'boolean' },
    emptyText: { control: 'text' },
    onChange: { table: { disable: true } },
    options: { table: { disable: true } },
    placeholder: { control: 'text' },
    searchPlaceholder: { control: 'text' },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    value: { table: { disable: true } },
  },
  render: (args) => {
    const single = args as ComboboxSingleProps
    const [value, setValue] = useState<string>()
    return (
      <div style={{ maxWidth: '16rem' }}>
        <Combobox
          {...single}
          value={value}
          onChange={(next) => {
            setValue(next)
            single.onChange?.(next)
          }}
        />
      </div>
    )
  },
} satisfies Meta<typeof Combobox>

export default meta

type Story = StoryObj<typeof meta>

// `multiple`: toggling keeps the list open; the trigger summarizes selections
// and collapses beyond `maxDisplayed` to a +n count — the msel filter pattern.
export const Multiple: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [value, setValue] = useState<string[]>(['next', 'remix'])
    return (
      <div style={{ maxWidth: '16rem' }}>
        <Combobox
          aria-label="Frameworks"
          multiple
          options={frameworks}
          value={value}
          onChange={setValue}
        />
      </div>
    )
  },
}
export const Default: Story = {}
