import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const docsDirectory = dirname(fileURLToPath(import.meta.url))
const rootDirectory = join(docsDirectory, '../..')
const styledSystemPath = join(docsDirectory, 'styled-system')

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: rootDirectory,
  reactStrictMode: true,
  transpilePackages: ['@stalk-ui/components'],
  turbopack: {
    resolveAlias: {
      'styled-system': styledSystemPath,
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'styled-system': styledSystemPath,
    }

    return config
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/mcp', destination: '/api/mcp' },
        { source: '/sse', destination: '/api/sse' },
        { source: '/sse/message', destination: '/api/sse/message' },
      ],
      afterFiles: [],
      fallback: [],
    }
  },
}

export default nextConfig
