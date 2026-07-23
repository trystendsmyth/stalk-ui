import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import type { StorybookConfig } from '@storybook/react-vite'

const storybookDirectory = dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook-community/storybook-dark-mode',
    '@storybook/addon-vitest',
  ],
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(ts|tsx)',
    '../../../packages/components/src/**/*.stories.@(ts|tsx)',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  features: {
    // Emit manifests/components.json in the static build — the published
    // Storybook becomes AI-queryable via the CLI MCP `get_components_manifest`.
    componentsManifest: true,
  },
  viteFinal: (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        'styled-system': join(storybookDirectory, '../styled-system'),
      },
    },
  }),
  staticDirs: ['../public'],
}

export default config
