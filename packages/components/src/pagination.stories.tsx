import { Pagination } from './pagination'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs', 'stable'],
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Pagination>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous href="#" />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#">1</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#" isActive>
            2
          </Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#">3</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Ellipsis />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Next href="#" />
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  ),
}

export const IconOnly: Story = {
  render: () => (
    <Pagination>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous href="#" showLabel={false} />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#">1</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#" isActive>
            2
          </Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Next href="#" showLabel={false} />
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  ),
}
