import { useEffect, useState } from 'react'
import { Box } from 'styled-system/jsx'

import { Carousel } from './carousel'

import type { CarouselApi } from './carousel'
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

// Vertical orientation: slides stack and the controls move above/below. The
// wrapping element leaves vertical room (py) for the externally-placed controls,
// and the Carousel root takes an explicit height for the vertical viewport.
export const Vertical: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Box py="40" w="240px">
      <Carousel orientation="vertical" style={{ height: 220 }}>
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

// Autoplay ("auto"): advance on an interval using the imperative API exposed via
// `setApi`, pausing on hover. `loop` keeps it cycling. No plugin dependency is
// bundled — this drives the same public API a consumer would use.
const AutoplayCarousel = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!api || paused) return
    const id = setInterval(() => {
      api.scrollNext()
    }, 2000)
    return () => {
      clearInterval(id)
    }
  }, [api, paused])

  return (
    <Box
      px="40"
      w="320px"
      onMouseEnter={() => {
        setPaused(true)
      }}
      onMouseLeave={() => {
        setPaused(false)
      }}
    >
      <Carousel opts={{ loop: true }} setApi={setApi}>
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
  )
}

export const Autoplay: Story = {
  parameters: { controls: { disable: true } },
  render: () => <AutoplayCarousel />,
}
