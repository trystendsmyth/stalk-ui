import { execFileSync, spawn } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { rimrafSync } from 'rimraf'

interface Pa11yConfig {
  urls: string[]
  defaults?: { chromeLaunchConfig?: Record<string, unknown> } & Record<string, unknown>
  [key: string]: unknown
}

const port = process.env.DOCS_A11Y_PORT ?? '3021'
const baseUrl = `http://127.0.0.1:${port}`
const tempDirectory = mkdtempSync(join(tmpdir(), 'stalk-docs-a11y-'))
const tempConfigPath = join(tempDirectory, 'pa11yci.docs.json')

const waitForHttp = async (url: string) => {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(url)

      if (response.ok) {
        return
      }
    } catch {
      // Wait for Next.js to accept connections.
    }

    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  throw new Error(`Timed out waiting for ${url}`)
}

execFileSync('pnpm', ['--filter', '@stalk-ui/docs', 'build'], { stdio: 'inherit' })

const pa11yConfig = JSON.parse(readFileSync('.pa11yci.docs.json', 'utf8')) as Pa11yConfig
pa11yConfig.urls = pa11yConfig.urls.map((url) => url.replace('http://127.0.0.1:3000', baseUrl))
// Use the runner's system Chrome instead of downloading one: CI sets
// PUPPETEER_EXECUTABLE_PATH to the installed binary; locally we fall back to the
// `chrome` channel. pa11y-ci forwards this to puppeteer-core's launch.
pa11yConfig.defaults ??= {}
pa11yConfig.defaults.chromeLaunchConfig ??= {}
if (process.env.PUPPETEER_EXECUTABLE_PATH) {
  pa11yConfig.defaults.chromeLaunchConfig.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH
} else {
  pa11yConfig.defaults.chromeLaunchConfig.channel = 'chrome'
}
writeFileSync(tempConfigPath, `${JSON.stringify(pa11yConfig, null, 2)}\n`)

const docs = spawn(
  'pnpm',
  ['--filter', '@stalk-ui/docs', 'exec', 'next', 'start', '--port', port],
  {
    detached: true,
    stdio: 'inherit',
  },
)

const terminateDocs = async (): Promise<void> => {
  if (typeof docs.pid !== 'number' || docs.exitCode !== null || docs.signalCode !== null) {
    return
  }

  const groupId = -docs.pid

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

    docs.once('exit', finish)

    try {
      process.kill(groupId, 'SIGTERM')
    } catch {
      docs.off('exit', finish)
      finish()
    }
  })
}

try {
  await waitForHttp(`${baseUrl}/en`)
  execFileSync('pnpm', ['exec', 'pa11y-ci', '--config', tempConfigPath], {
    stdio: 'inherit',
  })
} finally {
  await terminateDocs()
  rimrafSync(tempDirectory)
}

process.exit(0)
