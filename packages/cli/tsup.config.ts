import { defineConfig } from 'tsup'

const shared = {
  clean: false,
  sourcemap: true,
  treeshake: true,
  splitting: false,
  minify: false,
  target: 'es2022' as const,
  bundle: true,
  external: ['@modelcontextprotocol/sdk', 'zod'],
}

export default defineConfig([
  {
    ...shared,
    clean: true,
    entry: { bin: 'src/bin.ts' },
    format: ['esm'],
    dts: false,
    banner: { js: '#!/usr/bin/env node' },
  },
  {
    ...shared,
    entry: { mcp: 'src/mcp/index.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    outExtension: ({ format }) => ({ js: format === 'cjs' ? '.cjs' : '.js' }),
  },
])
