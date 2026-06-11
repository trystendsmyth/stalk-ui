import { fn } from 'storybook/test'
import { css } from 'styled-system/css'
import { accordion as accordionRecipe } from 'styled-system/recipes'

import { Accordion } from './accordion'

import type { Meta, StoryObj } from '@storybook/react-vite'

const { variant: VARIANTS } = accordionRecipe.variantMap

const frame = css({ w: '480px' })

const meta = {
  title: 'Components/Disclosure/Accordion',
  component: Accordion.Root,
  tags: ['autodocs', 'stable'],
  args: {
    collapsible: true,
    onValueChange: fn(),
    type: 'single',
    variant: 'inline',
  },
  argTypes: {
    children: { table: { disable: true } },
    collapsible: { control: 'boolean' },
    onValueChange: { table: { disable: true } },
    type: { control: 'inline-radio', options: ['single', 'multiple'] },
    value: { table: { disable: true } },
    variant: { control: 'select', options: VARIANTS },
  },
} satisfies Meta<typeof Accordion.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: 'single',
    collapsible: true,
    defaultValue: 'item-1',
  },
  render: (args) => (
    <div className={frame}>
      <Accordion {...args}>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
          <Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>Is it styled?</Accordion.Trigger>
          <Accordion.Content>
            Yes. Default styles come from the Stalk UI preset and follow semantic tokens.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-3">
          <Accordion.Trigger>Is it animated?</Accordion.Trigger>
          <Accordion.Content>
            The trigger icon rotates on open. Honors `prefers-reduced-motion`.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
}

export const Multiple: Story = {
  args: {
    type: 'multiple',
    defaultValue: ['a', 'b'],
  },
  render: (args) => (
    <div className={frame}>
      <Accordion {...args}>
        <Accordion.Item value="a">
          <Accordion.Trigger>First section</Accordion.Trigger>
          <Accordion.Content>Multiple sections can be open at once.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="b">
          <Accordion.Trigger>Second section</Accordion.Trigger>
          <Accordion.Content>Pass `type=&quot;multiple&quot;` to enable this.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="c">
          <Accordion.Trigger>Third section</Accordion.Trigger>
          <Accordion.Content>Closed by default.</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
}

export const Card: Story = {
  args: {
    type: 'single',
    collapsible: true,
    defaultValue: 'item-1',
    variant: 'card',
  },
  render: (args) => (
    <div className={frame}>
      <Accordion {...args}>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
          <Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>Is it styled?</Accordion.Trigger>
          <Accordion.Content>
            The card variant adds a bordered surface and inset trigger padding.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-3">
          <Accordion.Trigger>Is it animated?</Accordion.Trigger>
          <Accordion.Content>
            The trigger icon rotates on open. Honors `prefers-reduced-motion`.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: (args) => (
    <div className={frame}>
      <Accordion {...args}>
        <Accordion.Item value="enabled">
          <Accordion.Trigger>Enabled section</Accordion.Trigger>
          <Accordion.Content>Open me freely.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="disabled" disabled>
          <Accordion.Trigger>Disabled section</Accordion.Trigger>
          <Accordion.Content>Never reached.</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
}
