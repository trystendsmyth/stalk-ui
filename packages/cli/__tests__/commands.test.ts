import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, test } from 'vitest'

import { addCommand, diffCommand, initCommand, themeCommand, upgradeCommand } from '../src/commands'

interface Fixture {
  cleanup: () => Promise<void>
  root: string
}

const fixtures: Fixture[] = []

const createFixture = async () => {
  const root = await mkdtemp(join(tmpdir(), 'stalk-cli-golden-'))
  await writeFile(
    join(root, 'package.json'),
    JSON.stringify(
      { name: 'fixture', private: true, packageManager: 'pnpm@10.0.0', type: 'module' },
      null,
      2,
    ),
  )

  const fixture = {
    root,
    cleanup: async () => {
      await rm(root, { force: true, recursive: true })
    },
  }
  fixtures.push(fixture)
  return fixture
}

const withFixture = async (callback: (fixture: Fixture) => Promise<void>) => {
  const previousDirectory = process.cwd()
  const fixture = await createFixture()

  process.chdir(fixture.root)

  try {
    await callback(fixture)
  } finally {
    process.chdir(previousDirectory)
  }
}

const captureOutput = async (callback: () => Promise<void>) => {
  const lines: string[] = []
  const originalLog = console.log

  console.log = (...args: unknown[]) => {
    lines.push(args.map(String).join(' '))
  }

  try {
    await callback()
  } finally {
    console.log = originalLog
  }

  return lines
}

const normalizeOutput = (root: string, lines: string[]) =>
  lines.map((line) => line.replaceAll(root, '$ROOT'))

const createRegistryServer = async () => {
  const manifest = {
    $schema: 'https://stalk-ui.com/schema/v1/registry-item.json',
    name: 'button',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'src/components/ui/button.tsx',
        type: 'registry:ui',
        content: 'export const Button = () => null\n',
      },
    ],
    stalk: {
      schemaVersion: '1.0',
      preset: {
        semanticTokens: {},
        recipes: ['button'],
      },
      packageDependencies: {
        preset: '@stalk-ui/preset',
      },
      pandaCodegen: false,
      importAliases: {
        styledSystem: 'styled-system',
      },
    },
  }
  const server = createServer((request, response) => {
    if (request.url === '/button.json') {
      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(manifest))
      return
    }

    response.writeHead(404)
    response.end()
  })

  await new Promise<void>((resolve) => {
    server.listen(0, resolve)
  })

  const address = server.address()

  if (address === null || typeof address === 'string') {
    throw new Error('Could not start registry fixture.')
  }

  return {
    close: async () => {
      await new Promise<void>((resolve, reject) => {
        server.close((error) => {
          if (error === undefined) {
            resolve()
          } else {
            reject(error)
          }
        })
      })
    },
    url: `http://127.0.0.1:${String(address.port)}/{name}.json`,
  }
}

afterEach(async () => {
  await Promise.all(fixtures.splice(0).map((fixture) => fixture.cleanup()))
})

describe('CLI command golden files', () => {
  test('init writes config and panda setup in dry-run form', async () => {
    await withFixture(async () => {
      const output = await captureOutput(async () => {
        await initCommand({ codegen: false, dryRun: true })
      })

      expect(normalizeOutput(process.cwd(), output)).toMatchInlineSnapshot(`
        [
          "[dry-run] add .stalk-ui-backup/ to $ROOT/.gitignore",
          "[dry-run] write $ROOT/panda.config.ts",
          "[dry-run] write $ROOT/stalk.config.json",
          "[dry-run] pnpm add @pandacss/dev @stalk-ui/preset @stalk-ui/i18n",
        ]
      `)
    })
  })

  test('add reports expected dry-run writes from a registry manifest', async () => {
    const registry = await createRegistryServer()

    try {
      await withFixture(async () => {
        const output = await captureOutput(async () => {
          await addCommand('button', {
            codegen: false,
            dryRun: true,
            force: true,
            registry: registry.url,
          })
        })

        expect(normalizeOutput(process.cwd(), output)).toMatchInlineSnapshot(`
          [
            "[dry-run] write $ROOT/src/components/ui/button.tsx",
            "[dry-run] pnpm add @stalk-ui/preset",
          ]
        `)
      })
    } finally {
      await registry.close()
    }
  })

  test('diff reports clean files after add', async () => {
    const registry = await createRegistryServer()

    try {
      await withFixture(async (fixture) => {
        await mkdir(join(fixture.root, 'src/components/ui'), { recursive: true })
        await writeFile(
          join(fixture.root, 'src/components/ui/button.tsx'),
          'export const Button = () => null\n',
        )
        const output = await captureOutput(async () => {
          await diffCommand('button', { registry: registry.url })
        })

        expect(output).toMatchInlineSnapshot(`
          [
            "button: no differences",
          ]
        `)
      })
    } finally {
      await registry.close()
    }
  })

  test('theme and upgrade expose expected output', async () => {
    await withFixture(async () => {
      const output = await captureOutput(async () => {
        themeCommand()
        themeCommand('rainbow')
        themeCommand('midnight')
        await upgradeCommand({ codegen: false, dryRun: true })
      })

      expect(normalizeOutput(process.cwd(), output)).toMatchInlineSnapshot(`
        [
          "Stalk UI ships with two themes:

          neutral (default) - applied automatically
          rainbow           - apply via data-panda-theme="rainbow"

        To use a theme, add the data-panda-theme attribute to the appropriate
        element in your HTML or layout:

          <html data-panda-theme="rainbow">  <!-- whole app -->
          <div data-panda-theme="rainbow">   <!-- a subtree -->

        For runtime switching between themes, see:
        https://stalk-ui.com/en/docs/getting-started/theming",
          "Theme: rainbow

        Apply via:
          <html data-panda-theme="rainbow">      // App-wide
          <div data-panda-theme="rainbow">       // Subtree

        Runtime switching: https://stalk-ui.com/en/docs/getting-started/theming",
          "Unknown theme: midnight

        Available themes: neutral, rainbow

        To add custom themes, see:
        https://stalk-ui.com/en/docs/getting-started/custom-themes",
          "[dry-run] pnpm add @stalk-ui/preset@latest @stalk-ui/i18n@latest",
        ]
      `)
    })
  })
})
