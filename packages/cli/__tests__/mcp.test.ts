import { createServer } from 'node:http'

import { afterEach, describe, expect, test } from 'vitest'

import { configSchemaUrl } from '../src/constants'
import {
  getAddCommandTool,
  getAuditChecklistTool,
  getInstallInstructionsTool,
  getProjectRegistriesTool,
  listItemsTool,
  searchItemsTool,
  viewItemsTool,
} from '../src/mcp/tools'

import type { StalkConfig } from '../src/types'
import type { AddressInfo } from 'node:net'

interface Server {
  url: string
  close: () => Promise<void>
}

const closers: Server[] = []

const buttonManifest = {
  $schema: 'https://stalk-ui.com/schema/v1/registry-item.json',
  name: 'button',
  type: 'registry:ui',
  dependencies: ['@radix-ui/react-slot'],
  registryDependencies: ['spinner'],
  files: [
    {
      path: 'src/components/ui/button.tsx',
      type: 'registry:ui',
      content: 'export const Button = () => null\n',
    },
  ],
  stalk: {
    schemaVersion: '1.0',
    preset: { semanticTokens: { 'fg.button': {} }, recipes: ['button'] },
    packageDependencies: { preset: '@stalk-ui/preset' },
    pandaCodegen: true,
    importAliases: { styledSystem: 'styled-system' },
  },
}

const integrity = {
  schemaVersion: '1.0',
  generatedAt: '1970-01-01T00:00:00.000Z',
  manifests: {
    button: { path: '/button.json', sha256: 'a' },
    badge: { path: '/badge.json', sha256: 'b' },
    'shadcn/button': { path: '/shadcn/button.json', sha256: 'c' },
    'base/button': { path: '/base/button.json', sha256: 'd' },
  },
}

const startServer = async (): Promise<Server> => {
  const server = createServer((request, response) => {
    const route = (request.url ?? '').split('?')[0] ?? ''

    if (route === '/integrity.json') {
      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(integrity))
      return
    }

    if (route === '/button.json') {
      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(buttonManifest))
      return
    }

    response.writeHead(404)
    response.end()
  })

  await new Promise<void>((resolve) => {
    server.listen(0, resolve)
  })

  const address = server.address() as AddressInfo
  const url = `http://127.0.0.1:${String(address.port)}/{name}.json`

  const handle: Server = {
    url,
    close: () =>
      new Promise<void>((resolve, reject) => {
        server.close((error) => {
          if (error === undefined) resolve()
          else reject(error)
        })
      }),
  }
  closers.push(handle)
  return handle
}

const buildConfig = (registryUrl: string): StalkConfig => ({
  $schema: configSchemaUrl,
  preset: '@stalk-ui/preset',
  components: './src/components/ui',
  utils: './src/lib/utils',
  styledSystem: 'styled-system',
  registries: { '@stalk-ui': registryUrl },
})

afterEach(async () => {
  await Promise.all(closers.splice(0).map((server) => server.close()))
})

describe('mcp tools', () => {
  test('list_items filters by variant and flavor', async () => {
    const server = await startServer()
    const config = buildConfig(server.url)

    const stalkRadix = await listItemsTool({ config, hasProjectConfig: true }, {})
    expect(stalkRadix.text).toContain('@stalk-ui/badge')
    expect(stalkRadix.text).toContain('@stalk-ui/button')
    expect(stalkRadix.text).not.toContain('shadcn')
    expect(stalkRadix.text).not.toContain('base')

    const shadcn = await listItemsTool({ config, hasProjectConfig: true }, { flavor: 'shadcn' })
    expect(shadcn.text).toContain('button (radix, shadcn)')

    const base = await listItemsTool({ config, hasProjectConfig: true }, { variant: 'base' })
    expect(base.text).toContain('button (base, stalk)')
  })

  test('search_items fuzzy matches and respects limit', async () => {
    const server = await startServer()
    const config = buildConfig(server.url)
    const result = await searchItemsTool(
      { config, hasProjectConfig: true },
      { query: 'butt', limit: 5 },
    )
    expect(result.text).toContain('button')
    expect(result.text).not.toContain('badge')
  })

  test('view_items returns manifest details and file contents', async () => {
    const server = await startServer()
    const config = buildConfig(server.url)
    const result = await viewItemsTool(
      { config, hasProjectConfig: true },
      { items: ['@stalk-ui/button'] },
    )
    expect(result.text).toContain('## button')
    expect(result.text).toContain('@radix-ui/react-slot')
    expect(result.text).toContain('Registry dependencies:** spinner')
    expect(result.text).toContain('Panda recipes:** button')
    expect(result.text).toContain('export const Button = () => null')
  })

  test('get_add_command honors local package manager', () => {
    const config = buildConfig('https://example.test/r/{name}.json')
    const local = getAddCommandTool(
      { config, hasProjectConfig: true, packageManager: 'pnpm' },
      { items: ['button', 'dialog'] },
    )
    expect(local.text).toBe('pnpm dlx @stalk-ui/cli add button dialog')

    const remote = getAddCommandTool({ config, hasProjectConfig: false }, { items: ['button'] })
    expect(remote.text).toContain('npx @stalk-ui/cli add button')
    expect(remote.text).toContain('bunx @stalk-ui/cli add button')
  })

  test('get_project_registries reflects detection', () => {
    const config = buildConfig('https://example.test/r/{name}.json')
    expect(getProjectRegistriesTool({ config, hasProjectConfig: false }).text).toContain(
      'No stalk.config.json detected',
    )
    expect(getProjectRegistriesTool({ config, hasProjectConfig: true }).text).toContain('@stalk-ui')
  })

  test('static tools return non-empty text', () => {
    expect(getInstallInstructionsTool().text).toContain('PandaCSS')
    expect(getAuditChecklistTool().text).toContain('pnpm verify')
  })
})
