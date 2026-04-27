import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDirectory = join(dirname(fileURLToPath(import.meta.url)), '../..')

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: rootDirectory,
  reactStrictMode: true,
  transpilePackages: ['@stalk-ui/components'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'styled-system': join(dirname(fileURLToPath(import.meta.url)), 'styled-system'),
    }

    return config
  },
}

export default nextConfig
