import { execFileSync, spawn } from 'node:child_process'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const fixture = process.argv[2]
const registry = 'http://localhost:4873'
const componentRegistry = 'http://localhost:4874/{name}.json'
const tempDirectory = await mkdtemp(join(tmpdir(), `stalk-${fixture ?? 'integration'}-`))
const npmUserConfig = join(tempDirectory, '.npmrc')
const testEnvironment = {
  ...process.env,
  NPM_CONFIG_USERCONFIG: npmUserConfig,
}

const run = (command: string, args: string[], cwd = tempDirectory) => {
  execFileSync(command, args, {
    cwd,
    env: testEnvironment,
    stdio: 'inherit',
  })
}

if (!['next', 'vite', 'shadcn'].includes(fixture ?? '')) {
  throw new Error('Usage: tsx scripts/test-integration-fixture.ts <next|vite|shadcn>')
}

const fixtureName = fixture as 'next' | 'vite' | 'shadcn'

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
  const response = await fetch(`${registry}/-/user/org.couchdb.user:stalk`, {
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

  await writeFile(
    npmUserConfig,
    `registry=${registry}\n//localhost:4873/:_authToken=${body.token}\n`,
  )
}

const writeNextFixtureFiles = async () => {
  await mkdir(join(tempDirectory, 'src/app'), { recursive: true })
  await mkdir(join(tempDirectory, 'public'), { recursive: true })

  await writeFile(
    join(tempDirectory, 'tsconfig.json'),
    JSON.stringify(
      {
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
        include: ['next-env.d.ts', 'panda.config.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
        exclude: ['node_modules'],
      },
      null,
      2,
    ),
  )

  await writeFile(join(tempDirectory, 'next-env.d.ts'), '/// <reference types="next" />\n')
  await writeFile(
    join(tempDirectory, 'public/favicon.ico'),
    Buffer.from(
      'AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==',
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

const runNextFixture = async () => {
  run('pnpm', [
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
    registry,
  ])
  run('pnpm', ['exec', 'stalk-ui', 'init', '--no-codegen'])
  run('pnpm', [
    'exec',
    'stalk-ui',
    'add',
    '@stalk-ui/dialog',
    '--no-codegen',
    '--registry',
    componentRegistry,
  ])
  await writeNextFixtureFiles()
  run('pnpm', ['exec', 'panda', 'codegen'])
  run('pnpm', ['exec', 'panda', 'cssgen'])
  run('pnpm', ['exec', 'next', 'build'])

  const nextServer = spawn('pnpm', ['exec', 'next', 'start', '--port', '3020'], {
    cwd: tempDirectory,
    env: testEnvironment,
    stdio: 'pipe',
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
    nextServer.kill('SIGTERM')
  }
}

await rm('.verdaccio/storage', { force: true, recursive: true })
await rm('.verdaccio/htpasswd', { force: true })
await rm('storage', { force: true, recursive: true })
await rm('htpasswd', { force: true })
execFileSync('pnpm', ['build:registry'], { stdio: 'inherit' })

const verdaccio = spawn('pnpm', ['dlx', 'verdaccio', '--config', '.verdaccio/config.yaml'], {
  stdio: 'pipe',
})
const registryServer = spawn('pnpm', ['registry:serve'], {
  env: {
    ...process.env,
    STALK_REGISTRY_PORT: '4874',
  },
  stdio: 'pipe',
})

try {
  await waitForHttp(registry)
  await waitForHttp('http://localhost:4874/button.json')
  await createVerdaccioUser()
  execFileSync('pnpm', ['verdaccio:publish'], { env: testEnvironment, stdio: 'inherit' })

  await writeFile(
    join(tempDirectory, 'package.json'),
    JSON.stringify(
      {
        name: `stalk-${fixtureName}-integration`,
        private: true,
        packageManager: 'pnpm@10.0.0',
        type: 'module',
      },
      null,
      2,
    ),
  )

  if (fixtureName === 'next') {
    await runNextFixture()
  } else {
    execFileSync(
      'pnpm',
      ['add', '@stalk-ui/cli', '@stalk-ui/preset', '@stalk-ui/i18n', '--registry', registry],
      {
        cwd: tempDirectory,
        env: testEnvironment,
        stdio: 'inherit',
      },
    )

    execFileSync('pnpm', ['exec', 'stalk-ui', 'init', '--dry-run', '--no-codegen'], {
      cwd: tempDirectory,
      env: testEnvironment,
      stdio: 'inherit',
    })

    execFileSync(
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
      {
        cwd: tempDirectory,
        env: testEnvironment,
        stdio: 'inherit',
      },
    )

    if (fixture === 'shadcn') {
      const response = await waitForHttp('http://localhost:4874/shadcn/button.json')
      const manifest = (await response.json()) as {
        dependencies?: unknown
        files?: { content?: string }[]
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
    }
  }

  await readFile(join(tempDirectory, 'package.json'), 'utf8')
  console.log(`${fixtureName} integration fixture passed.`)
} finally {
  verdaccio.kill('SIGTERM')
  registryServer.kill('SIGTERM')
  await rm(tempDirectory, { force: true, recursive: true })
}
