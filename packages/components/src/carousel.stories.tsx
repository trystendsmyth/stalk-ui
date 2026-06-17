import { Box } from 'styled-system/jsx'

import { Carousel } from './carousel'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Layout/Carousel',
  component: Carousel,
  tags: ['autodocs', 'stable'],
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
} satisfies Meta<typeof Carousel>

export default meta

type Story = StoryObj<typeof meta>

const Slide = ({ index }: { index: number }) => (
  <Box
    alignItems="center"
    bgColor="bg.subtle"
    border="default"
    blockSize="160px"
    color="fg.default"
    display="flex"
    justifyContent="center"
    rounded="md"
    textStyle="headingMd"
  >
    {index + 1}
  </Box>
)

export const Default: Story = {
  render: (args) => (
    <Box px="40" w="320px">
      <Carousel {...args}>
        <Carousel.Content>
          {Array.from({ length: 5 }, (_, index) => (
            <Carousel.Item key={index}>
              <Slide index={index} />
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel>
    </Box>
  ),
}

export const MultipleSlides: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Box px="40" w="420px">
      <Carousel opts={{ align: 'start' }}>
        <Carousel.Content>
          {Array.from({ length: 8 }, (_, index) => (
            <Carousel.Item key={index} style={{ flexBasis: '50%' }}>
              <Slide index={index} />
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel>
    </Box>
  ),
}
