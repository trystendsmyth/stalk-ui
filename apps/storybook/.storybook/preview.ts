import '@fontsource-variable/inter'
import '@fontsource-variable/noto-sans'

import decorators from './decorators'
import docsContainer from './docs-container'
import { darkTheme, lightTheme } from './theme'

import type { Preview } from '@storybook/react-vite'

import '../styled-system/styles.css'
import '../src/preview.css'

const preview: Preview = {
  decorators,
  globalTypes: {
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
    mode: {
      defaultValue: 'light',
      description: 'Preview color mode (iframe only — independent of Storybook UI theme)',
      toolbar: {
        icon: 'mirror',
        items: [
          { title: 'Light', value: 'light' },
          { title: 'Dark', value: 'dark' },
        ],
      },
    },
    pandaTheme: {
      description: 'Stalk Panda theme (identities + curated accent palettes)',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { title: 'Neutral', value: 'neutral' },
          { title: 'Rainbow', value: 'rainbow' },
          { title: 'Monochrome', value: 'monochrome' },
          { title: 'Palette: Blue', value: 'blue' },
          { title: 'Palette: Violet', value: 'violet' },
          { title: 'Palette: Teal', value: 'teal' },
          { title: 'Palette: Emerald', value: 'emerald' },
          { title: 'Palette: Amber', value: 'amber' },
          { title: 'Palette: Yellow', value: 'yellow' },
          { title: 'Palette: Orange', value: 'orange' },
          { title: 'Palette: Red', value: 'red' },
        ],
      },
    },
  },
  initialGlobals: {
    direction: 'ltr',
    mode: 'light',
    pandaTheme: 'neutral',
  },
  parameters: {
    a11y: {
      test: 'error',
    },
    layout: 'centered',
    backgrounds: {
      disable: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      classTarget: 'body',
      current: 'dark',
      dark: darkTheme,
      light: lightTheme,
      /** Manager chrome only — do not toggle light/dark classes inside the preview iframe (Planera default). */
      stylePreview: false,
    },
    docs: {
      container: docsContainer,
    },
    options: {
      storySort: {
        order: ['Welcome', 'Foundation', 'Components'],
      },
    },
  },
}

export default preview
