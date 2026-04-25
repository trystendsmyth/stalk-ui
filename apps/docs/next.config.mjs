import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDirectory = join(dirname(fileURLToPath(import.meta.url)), '../..')

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: rootDirectory,
  reactStrictMode: true,
}

export default nextConfig
