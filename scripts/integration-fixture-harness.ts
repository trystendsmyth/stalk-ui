import { execFileSync, spawn, type ChildProcess } from 'node:child_process'
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const packageRegistry = 'http://localhost:4873'
const registryPort = '4874'
const registryRoot = `http://localhost:${registryPort}`
const componentRegistry = `${registryRoot}/{name}.json`
const buttonManifestUrl = `${registryRoot}/shadcn/button.json`

export const integrationFixtures = ['next', 'vite', 'shadcn', 'shadcn-compat'] as const

export type IntegrationFixture = (typeof integrationFixtures)[number]

type TestEnvironment = NodeJS.ProcessEnv

const isIntegrationFixture = (value: string): value is IntegrationFixture =>
  integrationFixtures.includes(value as IntegrationFixture)

export const parseIntegrationFixtures = (fixture: string | undefined): IntegrationFixture[] => {
  if (fixture === 'all') {
    return [...integrationFixtures]
  }

  if (fixture !== undefined && isIntegrationFixture(fixture)) {
    return [fixture]
  }

  throw new Error(
    `Usage: tsx scripts/test-integration-fixture.ts <${integrationFixtures.join('|')}|all>`,
  )
}

const exec = (command: string, args: string[], cwd: string, env: TestEnvironment) => {
  execFileSync(command, args, {
    cwd,
    env,
    stdio: 'inherit',
  })
}

const execFromRoot = (args: string[], env: TestEnvironment = process.env) => {
  execFileSync('pnpm', args, {
    env,
    stdio: 'inherit',
  })
}

const waitForHttp = async (url: string) => {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(url)

      if (response.ok) {
        return response
      }
    } catch {
      // Wait for the local server to accept connections.
    }

    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  throw new Error(`Timed out waiting for ${url}`)
}

const createVerdaccioUser = async () => {
  const response = await fetch(`${packageRegistry}/-/user/org.couchdb.user:stalk`, {
    body: JSON.stringify({
      _id: 'org.couchdb.user:stalk',
      date: new Date().toISOString(),
      email: 'stalk@example.com',
      name: 'stalk',
      password: 'stalk-password',
      roles: [],
      type: 'user',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  })

  if (!response.ok) {
    throw new Error(`Verdaccio user creation failed: HTTP ${String(response.status)}`)
  }

  const body = (await response.json()) as { token?: unknown }

  if (typeof body.token !== 'string') {
    throw new Error('Verdaccio did not return an auth token')
  }

  return body.token
}

const writeNpmConfig = async (path: string, token: string, useScopedRegistry: boolean) => {
  const registryConfig = useScopedRegistry
    ? `registry=https://registry.npmjs.org/\n@stalk-ui:registry=${packageRegistry}\n`
    : `registry=${packageRegistry}\n`

  await writeFile(path, `${registryConfig}//localhost:4873/:_authToken=${token}\n`)
}

const writeJson = async (path: string, value: Record<string, unknown>) => {
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`)
}

const readJson = async (path: string) =>
  JSON.parse(await readFile(path, 'utf8')) as Record<string, unknown>

const writeBasePackageJson = async (tempDirectory: string, fixture: IntegrationFixture) => {
  await writeJson(join(tempDirectory, 'package.json'), {
    name: `stalk-${fixture}-integration`,
    packageManager: 'pnpm@10.0.0',
    private: true,
    type: 'module',
  })
}

const writeNextFixtureFiles = async (tempDirectory: string) => {
  await mkdir(join(tempDirectory, 'src/app'), { recursive: true })
  await mkdir(join(tempDirectory, 'public'), { recursive: true })

  await writeJson(join(tempDirectory, 'tsconfig.json'), {
    compilerOptions: {
      allowJs: true,
      baseUrl: '.',
      esModuleInterop: true,
      incremental: true,
      jsx: 'preserve',
      lib: ['dom', 'dom.iterable', 'esnext'],
      module: 'esnext',
      moduleResolution: 'bundler',
      noEmit: true,
      paths: {
        'styled-system/*': ['styled-system/*'],
      },
      resolveJsonModule: true,
      skipLibCheck: true,
      strict: true,
      target: 'es2017',
    },
    exclude: ['node_modules'],
    include: ['next-env.d.ts', 'panda.config.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
  })

  await writeFile(join(tempDirectory, 'next-env.d.ts'), '/// <reference types="next" />\n')
  await writeFile(
    join(tempDirectory, 'public/favicon.ico'),
    Buffer.from(
      'AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==',
      'base64',
    ),
  )
  await writeFile(
    join(tempDirectory, 'src/app/layout.tsx'),
    `import '../../styled-system/styles.css'

import type { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
`,
  )
  await writeFile(
    join(tempDirectory, 'src/app/page.tsx'),
    `'use client'

import { Dialog } from '../components/ui/dialog'

export default function Page() {
  return (
    <main>
      <h1>Stalk UI Next fixture</h1>
      <Dialog.Root>
        <Dialog.Trigger>Open dialog</Dialog.Trigger>
        <Dialog.Content aria-label="Integration dialog">
          <Dialog.Title>Integration dialog</Dialog.Title>
          <Dialog.Description>Rendered with real Stalk UI styling.</Dialog.Description>
          <Dialog.Close>Close</Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    </main>
  )
}
`,
  )
}

const assertShadcnManifest = async () => {
  const response = await waitForHttp(buttonManifestUrl)
  const manifest = (await response.json()) as {
    dependencies?: unknown
    files?: { content?: string; path?: string }[]
  }
  const firstFile = manifest.files?.[0]

  if (
    !Array.isArray(manifest.dependencies) ||
    !manifest.dependencies.includes('@stalk-ui/preset')
  ) {
    throw new Error('shadcn manifest must declare @stalk-ui/preset as a dependency.')
  }

  if (firstFile?.content?.includes('Stalk UI component - requires PandaCSS setup') !== true) {
    throw new Error('shadcn manifest is missing the PandaCSS compatibility header.')
  }

  return firstFile
}

const runNextFixture = async (tempDirectory: string, env: TestEnvironment) => {
  execFromRoot(['exec', 'puppeteer', 'browsers', 'install', 'chrome'])
  exec(
    'pnpm',
    [
      'add',
      'next',
      'react',
      'react-dom',
      '@types/react',
      '@types/react-dom',
      '@stalk-ui/cli',
      '@stalk-ui/preset',
      '@stalk-ui/i18n',
      '--registry',
      packageRegistry,
    ],
    tempDirectory,
    env,
  )
  exec('pnpm', ['exec', 'stalk-ui', 'init', '--no-codegen'], tempDirectory, env)
  exec(
    'pnpm',
    [
      'exec',
      'stalk-ui',
      'add',
      '@stalk-ui/dialog',
      '--no-codegen',
      '--registry',
      componentRegistry,
    ],
    tempDirectory,
    env,
  )
  await writeNextFixtureFiles(tempDirectory)
  exec('pnpm', ['exec', 'panda', 'codegen'], tempDirectory, env)
  exec('pnpm', ['exec', 'panda', 'cssgen'], tempDirectory, env)
  exec('pnpm', ['exec', 'next', 'build'], tempDirectory, env)

  const nextServer = spawnServer('pnpm', ['exec', 'next', 'start', '--port', '3020'], {
    cwd: tempDirectory,
    env,
  })

  try {
    await waitForHttp('http://127.0.0.1:3020')

    const { default: puppeteer } = await import('puppeteer')
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      headless: true,
    })

    try {
      const page = await browser.newPage()
      const consoleErrors: string[] = []
      page.on('console', (message) => {
        if (message.type() === 'error') {
          consoleErrors.push(message.text())
        }
      })
      await page.goto('http://127.0.0.1:3020', { waitUntil: 'networkidle0' })
      await page.evaluate(`
        [...document.querySelectorAll('button')]
          .find((button) => button.textContent === 'Open dialog')
          ?.click()
      `)
      await page.waitForSelector('[role="dialog"]')

      const dialogText = String(
        await page.evaluate(`document.querySelector('[role="dialog"]')?.textContent ?? ''`),
      )
      if (!dialogText.includes('Rendered with real Stalk UI styling.')) {
        throw new Error('Next fixture did not render Dialog content.')
      }

      if (consoleErrors.length > 0) {
        throw new Error(`Next fixture console errors:\n${consoleErrors.join('\n')}`)
      }
    } finally {
      await browser.close()
    }
  } finally {
    await terminateServer(nextServer)
  }
}

const runDryRunFixture = async (
  fixture: Extract<IntegrationFixture, 'vite' | 'shadcn'>,
  tempDirectory: string,
  env: TestEnvironment,
) => {
  exec(
    'pnpm',
    ['add', '@stalk-ui/cli', '@stalk-ui/preset', '@stalk-ui/i18n', '--registry', packageRegistry],
    tempDirectory,
    env,
  )
  exec('pnpm', ['exec', 'stalk-ui', 'init', '--dry-run', '--no-codegen'], tempDirectory, env)
  exec(
    'pnpm',
    [
      'exec',
      'stalk-ui',
      'add',
      '@stalk-ui/button',
      '--dry-run',
      '--no-codegen',
      '--registry',
      componentRegistry,
    ],
    tempDirectory,
    env,
  )

  if (fixture === 'shadcn') {
    await assertShadcnManifest()
  }
}

const runShadcnCompatFixture = async (tempDirectory: string, env: TestEnvironment) => {
  const firstFile = await assertShadcnManifest()

  if (firstFile.path !== 'src/components/ui/button.tsx') {
    throw new Error('shadcn manifest must write button.tsx to src/components/ui/.')
  }

  exec('npx', ['--yes', 'create-vite@latest', '.', '--template', 'react-ts'], tempDirectory, env)
  const packageJsonPath = join(tempDirectory, 'package.json')
  const initialPackageJson = await readJson(packageJsonPath)
  await writeJson(packageJsonPath, { ...initialPackageJson, packageManager: 'pnpm@10.0.0' })
  await writeJson(join(tempDirectory, 'tsconfig.json'), {
    compilerOptions: {
      baseUrl: '.',
      paths: {
        '@/*': ['./src/*'],
      },
    },
    files: [],
    references: [{ path: './tsconfig.app.json' }, { path: './tsconfig.node.json' }],
  })
  await writeJson(join(tempDirectory, 'tsconfig.app.json'), {
    compilerOptions: {
      baseUrl: '.',
      paths: {
        '@/*': ['./src/*'],
      },
    },
    include: ['src'],
  })
  await writeFile(
    join(tempDirectory, 'vite.config.ts'),
    "import tailwindcss from '@tailwindcss/vite'\nimport { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\nexport default defineConfig({\n  plugins: [react(), tailwindcss()],\n  resolve: {\n    alias: {\n      '@': new URL('./src', import.meta.url).pathname,\n    },\n  },\n})\n",
  )
  await writeFile(join(tempDirectory, 'src/index.css'), '@import "tailwindcss";\n')
  exec('pnpm', ['add', 'tailwindcss', '@tailwindcss/vite'], tempDirectory, env)
  exec('npx', ['--yes', 'shadcn@latest', 'init', '--defaults', '--yes'], tempDirectory, env)
  exec(
    'npx',
    ['--yes', 'shadcn@latest', 'add', buttonManifestUrl, '--overwrite'],
    tempDirectory,
    env,
  )

  const buttonPath = join(tempDirectory, 'src/components/ui/button.tsx')
  await access(buttonPath)

  const buttonSource = await readFile(buttonPath, 'utf8')
  const packageJson = JSON.parse(await readFile(join(tempDirectory, 'package.json'), 'utf8')) as {
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
  }
  const installedPresetVersion =
    packageJson.dependencies?.['@stalk-ui/preset'] ??
    packageJson.devDependencies?.['@stalk-ui/preset']

  if (installedPresetVersion === undefined) {
    throw new Error('shadcn add must install @stalk-ui/preset.')
  }

  if (!buttonSource.includes('Stalk UI component - requires PandaCSS setup')) {
    throw new Error(
      `Installed button component is missing the PandaCSS compatibility header:\n${buttonSource.slice(
        0,
        400,
      )}`,
    )
  }

  if (!/\bexport const Button\b/.test(buttonSource) || !/\bbuttonRecipe\b/.test(buttonSource)) {
    throw new Error('Installed button component is missing expected Stalk UI exports.')
  }

  exec('node', ['-e', "require.resolve('@stalk-ui/preset/package.json')"], tempDirectory, env)
}

const runFixture = async (fixture: IntegrationFixture, token: string) => {
  const tempDirectory = await mkdtemp(join(tmpdir(), `stalk-${fixture}-`))
  const useScopedRegistry = fixture === 'shadcn-compat'
  const npmConfigDirectory = useScopedRegistry
    ? await mkdtemp(join(tmpdir(), 'stalk-shadcn-npmrc-'))
    : tempDirectory
  const npmUserConfig = join(npmConfigDirectory, '.npmrc')
  const env = {
    ...process.env,
    NPM_CONFIG_USERCONFIG: npmUserConfig,
  }

  try {
    await writeNpmConfig(npmUserConfig, token, useScopedRegistry)

    if (fixture === 'next') {
      await writeBasePackageJson(tempDirectory, fixture)
      await runNextFixture(tempDirectory, env)
    } else if (fixture === 'vite' || fixture === 'shadcn') {
      await writeBasePackageJson(tempDirectory, fixture)
      await runDryRunFixture(fixture, tempDirectory, env)
    } else {
      await runShadcnCompatFixture(tempDirectory, env)
    }

    await readFile(join(tempDirectory, 'package.json'), 'utf8')
    console.log(`${fixture} integration fixture passed.`)
  } finally {
    await rm(tempDirectory, { force: true, recursive: true })
    if (npmConfigDirectory !== tempDirectory) {
      await rm(npmConfigDirectory, { force: true, recursive: true })
    }
  }
}

// Long-running servers (verdaccio, registry, next start) are spawned with
// `detached: true` so each becomes its own process-group leader, then signaled
// via `process.kill(-pid, ...)` so grandchildren spawned through `pnpm dlx` /
// `pnpm exec` wrappers also receive the signal. `stdio: 'inherit'` avoids
// keeping piped file descriptors alive on Node's event loop after the process
// is killed (the prior `stdio: 'pipe'` configuration was the root cause of
// integration jobs hanging in CI after every fixture passed).
const trackedServers = new Set<ChildProcess>()

const spawnServer = (
  command: string,
  args: string[],
  options: { cwd?: string; env?: TestEnvironment } = {},
): ChildProcess => {
  const child = spawn(command, args, {
    cwd: options.cwd,
    detached: true,
    env: options.env ?? process.env,
    stdio: 'inherit',
  })
  trackedServers.add(child)
  child.once('exit', () => {
    trackedServers.delete(child)
  })
  return child
}

const terminateServer = async (child: ChildProcess): Promise<void> => {
  trackedServers.delete(child)

  if (child.exitCode !== null || child.signalCode !== null) {
    return
  }

  if (typeof child.pid !== 'number') {
    return
  }

  const groupId = -child.pid

  await new Promise<void>((resolve) => {
    const timeout = setTimeout(() => {
      try {
        process.kill(groupId, 'SIGKILL')
      } catch {
        // Group already gone.
      }
    }, 5000)

    const finish = () => {
      clearTimeout(timeout)
      resolve()
    }

    child.once('exit', finish)

    try {
      process.kill(groupId, 'SIGTERM')
    } catch {
      child.off('exit', finish)
      finish()
    }
  })
}

const terminateAllTrackedServers = async (): Promise<void> => {
  await Promise.all(Array.from(trackedServers).map((child) => terminateServer(child)))
}

let signalHandlersRegistered = false

const registerSignalHandlers = () => {
  if (signalHandlersRegistered) return
  signalHandlersRegistered = true

  const exitWithCleanup = (code: number) => {
    void (async () => {
      await terminateAllTrackedServers()
      process.exit(code)
    })()
  }

  process.once('SIGINT', () => exitWithCleanup(130))
  process.once('SIGTERM', () => exitWithCleanup(143))
  process.once('uncaughtException', (error) => {
    console.error('Integration harness uncaught exception:', error)
    exitWithCleanup(1)
  })
  process.once('unhandledRejection', (reason) => {
    console.error('Integration harness unhandled rejection:', reason)
    exitWithCleanup(1)
  })
}

export const runIntegrationFixtures = async (fixtures: readonly IntegrationFixture[]) => {
  registerSignalHandlers()

  await rm('.verdaccio/storage', { force: true, recursive: true })
  await rm('.verdaccio/htpasswd', { force: true })
  await rm('storage', { force: true, recursive: true })
  await rm('htpasswd', { force: true })
  execFromRoot(['build:registry'])

  const verdaccio = spawnServer('pnpm', [
    'dlx',
    'verdaccio',
    '--config',
    '.verdaccio/config.yaml',
  ])
  const registryServer = spawnServer('pnpm', ['registry:serve'], {
    env: {
      ...process.env,
      STALK_REGISTRY_PORT: registryPort,
    },
  })

  try {
    await waitForHttp(packageRegistry)
    await waitForHttp(`${registryRoot}/button.json`)
    const token = await createVerdaccioUser()
    const publishConfigDirectory = await mkdtemp(join(tmpdir(), 'stalk-publish-npmrc-'))
    const publishNpmUserConfig = join(publishConfigDirectory, '.npmrc')

    try {
      await writeNpmConfig(publishNpmUserConfig, token, false)
      execFromRoot(['verdaccio:publish'], {
        ...process.env,
        NPM_CONFIG_USERCONFIG: publishNpmUserConfig,
      })
    } finally {
      await rm(publishConfigDirectory, { force: true, recursive: true })
    }

    for (const fixture of fixtures) {
      await runFixture(fixture, token)
    }
  } finally {
    await Promise.all([terminateServer(verdaccio), terminateServer(registryServer)])
  }
}
