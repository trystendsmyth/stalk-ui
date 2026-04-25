import { execFileSync, spawn } from 'node:child_process'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
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

  await readFile(join(tempDirectory, 'package.json'), 'utf8')
  console.log(`${fixtureName} integration fixture passed.`)
} finally {
  verdaccio.kill('SIGTERM')
  registryServer.kill('SIGTERM')
  await rm(tempDirectory, { force: true, recursive: true })
}
