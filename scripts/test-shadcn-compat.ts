import { execFileSync, spawn } from 'node:child_process'
import { access, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const port = '4874'
const registryRoot = `http://localhost:${port}`
const packageRegistry = 'http://localhost:4873'
const buttonManifestUrl = `${registryRoot}/shadcn/button.json`
const tempDirectory = await mkdtemp(join(tmpdir(), 'stalk-shadcn-compat-'))
const npmConfigDirectory = await mkdtemp(join(tmpdir(), 'stalk-shadcn-npmrc-'))
const npmUserConfig = join(npmConfigDirectory, '.npmrc')
const buttonPath = join(tempDirectory, 'src/components/ui/button.tsx')
const testEnvironment = {
  ...process.env,
  NPM_CONFIG_USERCONFIG: npmUserConfig,
}

const exec = (command: string, args: string[]) =>
  execFileSync(command, args, {
    cwd: tempDirectory,
    env: testEnvironment,
    stdio: 'inherit',
  })

const waitForRegistry = async () => {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(buttonManifestUrl)

      if (response.ok) {
        return response
      }
    } catch {
      // Wait for the local registry server to accept connections.
    }

    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  throw new Error(`Timed out waiting for ${buttonManifestUrl}`)
}

const waitForPackageRegistry = async () => {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(packageRegistry)

      if (response.ok) {
        return
      }
    } catch {
      // Wait for Verdaccio to accept connections.
    }

    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  throw new Error(`Timed out waiting for ${packageRegistry}`)
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

  await writeFile(
    npmUserConfig,
    `registry=https://registry.npmjs.org/\n@stalk-ui:registry=${packageRegistry}\n//localhost:4873/:_authToken=${body.token}\n`,
  )
}

const readJson = async (path: string) =>
  JSON.parse(await readFile(path, 'utf8')) as Record<string, unknown>

const writeJson = async (path: string, value: Record<string, unknown>) => {
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`)
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
    STALK_REGISTRY_PORT: port,
  },
  stdio: 'pipe',
})

try {
  await waitForPackageRegistry()
  await createVerdaccioUser()
  execFileSync('pnpm', ['verdaccio:publish'], { env: testEnvironment, stdio: 'inherit' })

  const response = await waitForRegistry()
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

  if (firstFile?.path !== 'src/components/ui/button.tsx') {
    throw new Error('shadcn manifest must write button.tsx to src/components/ui/.')
  }

  if (firstFile.content?.includes('Stalk UI component - requires PandaCSS setup') !== true) {
    throw new Error('shadcn manifest is missing the PandaCSS compatibility header.')
  }

  exec('npx', ['--yes', 'create-vite@latest', '.', '--template', 'react-ts'])
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
  exec('pnpm', ['add', 'tailwindcss', '@tailwindcss/vite'])
  exec('npx', ['--yes', 'shadcn@latest', 'init', '--defaults', '--yes'])
  exec('npx', ['--yes', 'shadcn@latest', 'add', buttonManifestUrl, '--overwrite'])

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

  exec('node', ['-e', "require.resolve('@stalk-ui/preset/package.json')"])
  console.log('shadcn compatibility fixture passed.')
} finally {
  verdaccio.kill('SIGTERM')
  registryServer.kill('SIGTERM')
  await rm(tempDirectory, { force: true, recursive: true })
  await rm(npmConfigDirectory, { force: true, recursive: true })
}
