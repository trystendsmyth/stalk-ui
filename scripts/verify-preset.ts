import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

import { rimrafSync } from 'rimraf'

const rootDirectory = process.cwd()
const presetDirectory = join(rootDirectory, 'packages/preset')
const verifyDirectory = join(presetDirectory, '.verify')
const snapshotPath = join(presetDirectory, '__snapshots__/reference.css')

const run = (command: string, args: string[], cwd = rootDirectory) => {
  execFileSync(command, args, {
    cwd,
    stdio: 'inherit',
  })
}

rimrafSync(verifyDirectory)
mkdirSync(join(verifyDirectory, 'src'), { recursive: true })

writeFileSync(
  join(verifyDirectory, 'panda.config.ts'),
  `import { defineConfig } from '@pandacss/dev'
import stalkPreset from '../dist/index.js'

export default defineConfig({
  preflight: false,
  include: ['./src/**/*.{ts,tsx}'],
  outdir: 'styled-system',
  presets: [stalkPreset],
})
`,
)

writeFileSync(
  join(verifyDirectory, 'src/reference.tsx'),
  `import { css } from '../styled-system/css'

export const referenceClassName = css({
  bgColor: 'accent.solid',
  borderColor: 'border.default',
  rounded: 'md',
  color: 'accent.contrast',
  px: '4',
  py: '2',
})

export const rainbowClassName = css({
  bgColor: 'bg.default',
  borderColor: 'danger.solid',
  color: 'fg.default',
})

export const utilityClassName = css({
  backgroundAlpha: 'accent.solid/15',
  borderColorAlpha: 'border.default/50',
  textAlpha: 'fg.muted/80',
  _focusVisible: {
    focusRingWidth: 'base',
    focusRingColor: 'accent.subtle',
    focusRingOffsetWidth: '1',
    focusRingOffsetColor: 'bg.default',
  },
})
`,
)

run('pnpm', ['--filter', '@stalk-ui/preset', 'build'])
run('pnpm', ['exec', 'panda', 'codegen', '--cwd', verifyDirectory, '--config', 'panda.config.ts'])
run('pnpm', ['exec', 'panda', 'cssgen', '--cwd', verifyDirectory, '--config', 'panda.config.ts'])

const generatedCssPath = join(verifyDirectory, 'styled-system/styles.css')
const generatedCss = readFileSync(generatedCssPath, 'utf8')
  .replaceAll(verifyDirectory, '<verify-dir>')
  .trim()

mkdirSync(dirname(snapshotPath), { recursive: true })
writeFileSync(snapshotPath, `${generatedCss}\n`)

rimrafSync(verifyDirectory)
