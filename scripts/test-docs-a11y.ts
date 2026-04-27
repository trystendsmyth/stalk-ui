import { execFileSync, spawn } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { rimrafSync } from 'rimraf'

interface Pa11yConfig {
  urls: string[]
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
execFileSync('pnpm', ['exec', 'puppeteer', 'browsers', 'install', 'chrome'], { stdio: 'inherit' })

const pa11yConfig = JSON.parse(readFileSync('.pa11yci.docs.json', 'utf8')) as Pa11yConfig
pa11yConfig.urls = pa11yConfig.urls.map((url) => url.replace('http://127.0.0.1:3000', baseUrl))
writeFileSync(tempConfigPath, `${JSON.stringify(pa11yConfig, null, 2)}\n`)

const docs = spawn(
  'pnpm',
  ['--filter', '@stalk-ui/docs', 'exec', 'next', 'start', '--port', port],
  {
    stdio: 'inherit',
  },
)

try {
  await waitForHttp(`${baseUrl}/en`)
  execFileSync('pnpm', ['exec', 'pa11y-ci', '--config', tempConfigPath], {
    stdio: 'inherit',
  })
} finally {
  docs.kill('SIGTERM')
  rimrafSync(tempDirectory)
}
