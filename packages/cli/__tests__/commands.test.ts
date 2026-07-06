import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, test } from 'vitest'

import {
  addCommand,
  diffCommand,
  driftCommand,
  initCommand,
  themeCommand,
  upgradeCommand,
} from '../src/commands'
import { sha256 } from '../src/lock'

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
      { name: 'fixture', private: true, packageManager: 'pnpm@11.5.0', type: 'module' },
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

// Simulate a prior tracked install of `button`: local file, base snapshot, lock.
const addCommandFixture = async (root: string, content: string, registryUrl: string) => {
  await mkdir(join(root, 'src/components/ui'), { recursive: true })
  await writeFile(join(root, 'src/components/ui/button.tsx'), content)
  await mkdir(join(root, '.stalk-ui/base/src/components/ui'), { recursive: true })
  await writeFile(join(root, '.stalk-ui/base/src/components/ui/button.tsx'), content)
  await writeFile(
    join(root, '.stalk-ui/lock.json'),
    JSON.stringify(
      {
        $schema: 'https://stalk-ui.com/schema/v1/lock.json',
        schemaVersion: '1.0',
        components: {
          button: {
            files: [{ path: 'src/components/ui/button.tsx', sha256: sha256(content) }],
            url: registryUrl.replace('{name}', 'button'),
          },
        },
      },
      null,
      2,
    ),
  )
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

const createRegistryServer = async (buttonContent = 'export const Button = () => null\n') => {
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
        content: buttonContent,
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

const createRegistryServerWithDependency = async () => {
  const baseStalk = {
    schemaVersion: '1.0',
    preset: { semanticTokens: {}, recipes: [] as string[] },
    packageDependencies: { preset: '@stalk-ui/preset' },
    pandaCodegen: false,
    importAliases: { styledSystem: 'styled-system' },
  }

  const manifests: Record<string, unknown> = {
    '/accordion.json': {
      $schema: 'https://stalk-ui.com/schema/v1/registry-item.json',
      name: 'accordion',
      type: 'registry:ui',
      dependencies: ['@radix-ui/react-accordion'],
      registryDependencies: ['create-style-context'],
      files: [
        {
          path: 'src/components/ui/accordion.tsx',
          type: 'registry:ui',
          content:
            "import { createStyleContext } from '../../lib/stalk-ui/create-style-context'\nexport const Accordion = () => null\n",
        },
      ],
      stalk: { ...baseStalk, preset: { semanticTokens: {}, recipes: ['accordion'] } },
    },
    '/create-style-context.json': {
      $schema: 'https://stalk-ui.com/schema/v1/registry-item.json',
      name: 'create-style-context',
      type: 'registry:lib',
      dependencies: [],
      registryDependencies: [],
      files: [
        {
          path: 'src/lib/stalk-ui/create-style-context.tsx',
          type: 'registry:lib',
          content: 'export const createStyleContext = () => ({})\n',
        },
      ],
      stalk: baseStalk,
    },
  }

  const server = createServer((request, response) => {
    const manifest = request.url === undefined ? undefined : manifests[request.url]
    if (manifest !== undefined) {
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

  test('add installs registry dependencies before the requested component', async () => {
    const registry = await createRegistryServerWithDependency()

    try {
      await withFixture(async () => {
        const output = await captureOutput(async () => {
          await addCommand('accordion', {
            codegen: false,
            dryRun: true,
            force: true,
            registry: registry.url,
          })
        })

        // The lib helper is written before the component that imports it, and
        // the dependency's package deps are unioned into a single install.
        expect(normalizeOutput(process.cwd(), output)).toMatchInlineSnapshot(`
          [
            "[dry-run] write $ROOT/src/lib/stalk-ui/create-style-context.tsx",
            "[dry-run] write $ROOT/src/components/ui/accordion.tsx",
            "[dry-run] pnpm add @stalk-ui/preset @radix-ui/react-accordion",
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

  test('diff rewrites registry imports through the panda importMap before comparing', async () => {
    const registry = await createRegistryServer(
      "import { css } from 'styled-system/css'\nexport const Button = () => css({})\n",
    )

    try {
      await withFixture(async (fixture) => {
        await writeFile(
          join(fixture.root, 'panda.config.ts'),
          `import { defineConfig } from '@pandacss/dev'\n\nexport default defineConfig({ importMap: '@styled' })\n`,
        )
        await mkdir(join(fixture.root, 'src/components/ui'), { recursive: true })
        await writeFile(
          join(fixture.root, 'src/components/ui/button.tsx'),
          "import { css } from '@styled/css'\nexport const Button = () => css({})\n",
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

  test('add records a lock entry and pristine base snapshots', async () => {
    const registry = await createRegistryServer()

    try {
      await withFixture(async (fixture) => {
        await addCommand('button', {
          codegen: false,
          force: true,
          install: false,
          registry: registry.url,
        })

        const lock = JSON.parse(
          await readFile(join(fixture.root, '.stalk-ui/lock.json'), 'utf8'),
        ) as {
          components: Record<string, { files: { path: string; sha256: string }[]; url: string }>
        }

        expect(Object.keys(lock.components)).toEqual(['button'])
        expect(lock.components.button?.files[0]?.path).toBe('src/components/ui/button.tsx')
        expect(
          await readFile(join(fixture.root, '.stalk-ui/base/src/components/ui/button.tsx'), 'utf8'),
        ).toBe('export const Button = () => null\n')
      })
    } finally {
      await registry.close()
    }
  })

  test('upgrade three-way merges local edits with registry changes', async () => {
    const baseContent =
      'const size = 1\nconst gap = 5\nconst tone = 2\nexport const Button = () => null\n'
    const remoteContent =
      'const size = 1\nconst gap = 5\nconst tone = 20\nexport const Button = () => null\n'
    const localContent =
      'const size = 100\nconst gap = 5\nconst tone = 2\nexport const Button = () => null\n'
    const registry = await createRegistryServer(remoteContent)

    try {
      await withFixture(async (fixture) => {
        // Simulate a prior tracked install: lock + base snapshot + edited local copy.
        await addCommandFixture(fixture.root, baseContent, registry.url)
        await writeFile(join(fixture.root, 'src/components/ui/button.tsx'), localContent)

        const output = await captureOutput(async () => {
          await upgradeCommand(['button'], {
            codegen: false,
            install: false,
            registry: registry.url,
          })
        })

        expect(output).toContain(
          'src/components/ui/button.tsx: merged local edits with registry changes',
        )
        expect(await readFile(join(fixture.root, 'src/components/ui/button.tsx'), 'utf8')).toBe(
          'const size = 100\nconst gap = 5\nconst tone = 20\nexport const Button = () => null\n',
        )
        // Base advances to the new registry content for the next round.
        expect(
          await readFile(join(fixture.root, '.stalk-ui/base/src/components/ui/button.tsx'), 'utf8'),
        ).toBe(remoteContent)
      })
    } finally {
      await registry.close()
    }
  })

  test('upgrade marks overlapping edits as conflicts', async () => {
    const baseContent = 'const tone = 2\nexport const Button = () => null\n'
    const remoteContent = 'const tone = 22\nexport const Button = () => null\n'
    const localContent = 'const tone = 21\nexport const Button = () => null\n'
    const registry = await createRegistryServer(remoteContent)

    try {
      await withFixture(async (fixture) => {
        await addCommandFixture(fixture.root, baseContent, registry.url)
        await writeFile(join(fixture.root, 'src/components/ui/button.tsx'), localContent)

        const output = await captureOutput(async () => {
          await upgradeCommand(['button'], {
            codegen: false,
            install: false,
            registry: registry.url,
          })
        })

        expect(output).toContain(
          'src/components/ui/button.tsx: CONFLICT — resolve the markers, then commit',
        )
        const merged = await readFile(join(fixture.root, 'src/components/ui/button.tsx'), 'utf8')
        expect(merged).toContain('<<<<<<< local edits')
        expect(merged).toContain('const tone = 21')
        expect(merged).toContain('const tone = 22')
        expect(merged).toContain('>>>>>>> registry')
      })
    } finally {
      await registry.close()
    }
  })

  test('drift reports upstream changes and exits non-zero', async () => {
    const baseContent = 'export const Button = () => null\n'
    const remoteContent = 'export const Button = () => 1\n'
    const registry = await createRegistryServer(remoteContent)
    const previousExitCode = process.exitCode

    try {
      await withFixture(async (fixture) => {
        await addCommandFixture(fixture.root, baseContent, registry.url)

        const output = await captureOutput(async () => {
          await driftCommand([], { install: false, json: true, registry: registry.url })
        })

        const report = JSON.parse(output.join('\n')) as {
          files: { local: string; path: string; registry: string }[]
          upstreamDrift: boolean
        }

        expect(report.upstreamDrift).toBe(true)
        expect(report.files).toEqual([
          { local: 'clean', path: 'src/components/ui/button.tsx', registry: 'changed' },
        ])
        expect(process.exitCode).toBe(1)
      })
    } finally {
      process.exitCode = previousExitCode
      await registry.close()
    }
  })

  test('theme and upgrade expose expected output', async () => {
    await withFixture(async () => {
      const output = await captureOutput(async () => {
        themeCommand()
        themeCommand('rainbow')
        themeCommand('midnight')
        await upgradeCommand([], { codegen: false, dryRun: true })
      })

      expect(normalizeOutput(process.cwd(), output)).toMatchInlineSnapshot(`
        [
          "Stalk UI ships with three themes:

          neutral (default) - applied automatically
          rainbow           - apply via data-panda-theme="rainbow"
          monochrome        - apply via data-panda-theme="monochrome"

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

        Available themes: neutral, rainbow, monochrome

        To add custom themes, see:
        https://stalk-ui.com/en/docs/getting-started/custom-themes",
          "[dry-run] pnpm add @stalk-ui/preset@latest @stalk-ui/i18n@latest",
        ]
      `)
    })
  })
})
