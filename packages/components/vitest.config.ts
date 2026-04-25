import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      'styled-system/recipes': new URL('./src/test/styled-system-recipes.ts', import.meta.url)
        .pathname,
    },
  },
  test: {
    environment: 'jsdom',
  },
})
