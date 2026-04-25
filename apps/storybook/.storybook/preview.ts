import { createElement } from 'react'

import type { Preview } from '@storybook/react-vite'

import '../src/preview.css'

interface StorybookGlobals {
  colorMode?: string
  direction?: string
}

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const globals = context.globals as StorybookGlobals

      return createElement(
        'div',
        {
          'data-color-mode': globals.colorMode ?? 'light',
          dir: globals.direction ?? 'ltr',
        },
        createElement(Story),
      )
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
  },
  initialGlobals: {
    colorMode: 'light',
    direction: 'ltr',
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
