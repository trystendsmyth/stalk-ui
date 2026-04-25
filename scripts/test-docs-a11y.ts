import { execFileSync, spawn } from 'node:child_process'

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

const docs = spawn('pnpm', ['--filter', '@stalk-ui/docs', 'start'], {
  stdio: 'inherit',
})

try {
  await waitForHttp('http://127.0.0.1:3000/en')
  execFileSync('pnpm', ['exec', 'pa11y-ci', '--config', '.pa11yci.docs.json'], {
    stdio: 'inherit',
  })
} finally {
  docs.kill('SIGTERM')
}
