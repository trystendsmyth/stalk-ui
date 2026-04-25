import { spawn } from 'node:child_process'

import { watch } from 'chokidar'

const watchedPaths = [
  'registry/**/*.ts',
  'packages/components/src/**/*',
  'packages/utils/src/**/*',
  'registry/schema.ts',
  'scripts/build-registry.ts',
]

let timer: NodeJS.Timeout | undefined
let running = false
let queued = false

const build = async () => {
  if (running) {
    queued = true
    return
  }

  running = true

  try {
    await new Promise<void>((resolve, reject) => {
      const child = spawn('pnpm', ['build:registry'], { stdio: 'inherit' })

      child.on('exit', (code) => {
        if (code === 0) {
          resolve()
        } else {
          reject(new Error(`pnpm build:registry exited with ${String(code)}`))
        }
      })
      child.on('error', reject)
    })
  } finally {
    running = false

    if (queued) {
      queued = false
      await build()
    }
  }
}

const schedule = () => {
  if (timer !== undefined) {
    clearTimeout(timer)
  }

  timer = setTimeout(() => {
    void build()
  }, 250)
}

await build()

watch(watchedPaths, { ignoreInitial: true }).on('all', schedule)

console.log(`Watching registry inputs:\n${watchedPaths.map((path) => `- ${path}`).join('\n')}`)
