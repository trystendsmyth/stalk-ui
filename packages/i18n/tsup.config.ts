import { readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'tsup'

const packageDirectory = dirname(fileURLToPath(import.meta.url))
const localeFiles = readdirSync(join(packageDirectory, 'src/locales'))
  .filter((file) => file.endsWith('.ts') && !file.endsWith('.test.ts'))
  .map((file) => `src/locales/${file}`)

export default defineConfig({
  entry: ['src/index.ts', ...localeFiles],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  splitting: false,
  minify: false,
  target: 'es2022',
  external: ['react', 'react-dom'],
})
