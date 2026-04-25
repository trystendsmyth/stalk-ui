import { execFileSync, spawn } from 'node:child_process'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const registry = 'http://localhost:4873'
const tempDirectory = await mkdtemp(join(tmpdir(), 'stalk-publish-test-'))
const npmUserConfig = join(tempDirectory, '.npmrc')
const testEnvironment = {
  ...process.env,
  NPM_CONFIG_USERCONFIG: npmUserConfig,
}

await rm('.verdaccio/storage', { force: true, recursive: true })
await rm('.verdaccio/htpasswd', { force: true })

const verdaccio = spawn('pnpm', ['dlx', 'verdaccio', '--config', '.verdaccio/config.yaml'], {
  stdio: 'pipe',
})

const waitForRegistry = async () => {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(registry)

      if (response.ok) {
        return
      }
    } catch {
      // Wait until Verdaccio accepts connections.
    }

    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  throw new Error('Verdaccio did not start on port 4873')
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

try {
  await waitForRegistry()
  await createVerdaccioUser()
  execFileSync('pnpm', ['verdaccio:publish'], { env: testEnvironment, stdio: 'inherit' })

  await writeFile(
    join(tempDirectory, 'package.json'),
    JSON.stringify({ name: 'stalk-publish-smoke', private: true, type: 'module' }, null, 2),
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
  execFileSync('pnpm', ['exec', 'stalk-ui', '--version'], {
    cwd: tempDirectory,
    env: testEnvironment,
    stdio: 'inherit',
  })
  execFileSync(
    'node',
    [
      '--input-type=module',
      '-e',
      "await import('@stalk-ui/i18n'); await import('@stalk-ui/i18n/locales/en'); await import('@stalk-ui/preset');",
    ],
    { cwd: tempDirectory, env: testEnvironment, stdio: 'inherit' },
  )
} finally {
  verdaccio.kill('SIGTERM')
  await rm(tempDirectory, { force: true, recursive: true })
}
