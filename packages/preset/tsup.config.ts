import { defineConfig } from 'tsup'

export default defineConfig({
  entry: { index: 'src/index.ts', tokens: 'src/exports-tokens.ts' },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  splitting: false,
  minify: false,
  target: 'es2022',
  external: ['@pandacss/dev'],
})
