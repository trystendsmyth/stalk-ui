import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig, type UserProjectConfigExport } from 'vitest/config'

import type * as StorybookVitestPlugin from '@storybook/addon-vitest/vitest-plugin'
import type * as VitestBrowserPlaywright from '@vitest/browser-playwright'

const require = createRequire(import.meta.url)
const storybookDirectory = join(dirname(fileURLToPath(import.meta.url)), '.storybook')

export default defineConfig(() => {
  const projects: UserProjectConfigExport[] = []

  const isStorybookTest =
    process.argv.some((argument) => argument.includes('storybook')) ||
    process.env.VITEST_STORYBOOK === 'true'

  if (isStorybookTest) {
    const { storybookTest } =
      require('@storybook/addon-vitest/vitest-plugin') as typeof StorybookVitestPlugin
    const { playwright } = require('@vitest/browser-playwright') as typeof VitestBrowserPlaywright

    projects.push({
      extends: true,
      plugins: [storybookTest({ configDir: storybookDirectory })],
      test: {
        browser: {
          enabled: true,
          headless: true,
          provider: playwright(),
          instances: [{ browser: 'chromium' }],
        },
      },
    } as UserProjectConfigExport)
  }

  return {
    plugins: [react()],
    resolve: {
      alias: {
        'styled-system': join(dirname(fileURLToPath(import.meta.url)), 'styled-system'),
      },
    },
    test: {
      projects,
    },
  }
})
