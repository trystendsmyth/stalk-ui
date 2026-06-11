import { useState } from 'react'
import { fn } from 'storybook/test'

import { Combobox } from './combobox'

import type { Meta, StoryObj } from '@storybook/react-vite'

const frameworks = [
  { label: 'Next.js', value: 'next' },
  { label: 'Remix', value: 'remix' },
  { label: 'Astro', value: 'astro' },
  { label: 'SvelteKit', value: 'sveltekit' },
  { label: 'Nuxt', value: 'nuxt' },
]

const meta = {
  title: 'Components/Forms/Combobox',
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
  },
  render: (args) => {
    const [value, setValue] = useState<string>()
    return (
      <div style={{ maxWidth: '16rem' }}>
        <Combobox
          {...args}
          value={value}
          onChange={(next) => {
            setValue(next)
            args.onChange?.(next)
          }}
        />
      </div>
    )
  },
} satisfies Meta<typeof Combobox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
