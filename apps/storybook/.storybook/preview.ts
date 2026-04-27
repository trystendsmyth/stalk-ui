import { createElement } from 'react'

import type { Preview } from '@storybook/react-vite'
import type { ReactNode } from 'react'

import '../styled-system/styles.css'
import '../src/preview.css'

interface StorybookGlobals {
  colorMode?: string
  direction?: string
  theme?: string
}

interface StoryFrameProps {
  children?: ReactNode
  globals: StorybookGlobals
}

const StoryFrame = ({ children, globals }: StoryFrameProps) => {
  const theme = globals.theme ?? 'neutral'

  return createElement(
    'div',
    {
      'data-color-mode': globals.colorMode ?? 'light',
      'data-panda-theme': theme === 'rainbow' ? 'rainbow' : undefined,
      dir: globals.direction ?? 'ltr',
    },
    children,
  )
}

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const globals = context.globals as StorybookGlobals

      return createElement(StoryFrame, { globals }, createElement(Story))
    },
  ],
  globalTypes: {
    colorMode: {
      description: 'Preview color mode',
      toolbar: {
        icon: 'contrast',
        items: [
          { title: 'Light', value: 'light' },
          { title: 'Dark', value: 'dark' },
        ],
      },
    },
    direction: {
      description: 'Preview text direction',
      toolbar: {
        icon: 'transfer',
        items: [
          { title: 'LTR', value: 'ltr' },
          { title: 'RTL', value: 'rtl' },
        ],
      },
    },
    theme: {
      description: 'Stalk theme',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { title: 'Neutral', value: 'neutral' },
          { title: 'Rainbow', value: 'rainbow' },
        ],
      },
    },
  },
  initialGlobals: {
    colorMode: 'light',
    direction: 'ltr',
    theme: 'neutral',
  },
  parameters: {
    a11y: {
      test: 'error',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
