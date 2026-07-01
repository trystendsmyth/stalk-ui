import { useState } from 'react'
import { fn } from 'storybook/test'
import { VStack } from 'styled-system/jsx'

import { SearchInput } from './search-input'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Forms/Search Input',
  component: SearchInput,
  tags: ['autodocs', 'stable'],
  args: {
    'aria-label': 'Search',
    onValueChange: fn(),
    placeholder: 'Search…',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    align: { control: 'inline-radio', options: ['start', 'center', 'end'] },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    debounce: { control: 'number' },
    className: { table: { disable: true } },
    rootProps: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A search field with a leading icon and a clear button. Press Escape to clear; pass ' +
          '`debounce` to throttle `onValueChange`.',
      },
    },
  },
} satisfies Meta<typeof SearchInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Controlled: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    function Demo() {
      const [query, setQuery] = useState('design system')
      return (
        <VStack alignItems="stretch" gap="8" w="20rem">
          <SearchInput aria-label="Search" onValueChange={setQuery} value={query} />
          <span>Query: {query || '(empty)'}</span>
        </VStack>
      )
    }
    return <Demo />
  },
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="stretch" gap="12" w="20rem">
      <SearchInput aria-label="Small" placeholder="Small" size="sm" />
      <SearchInput aria-label="Medium" placeholder="Medium" size="md" />
      <SearchInput aria-label="Large" placeholder="Large" size="lg" />
    </VStack>
  ),
}
