import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

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

rmSync(verifyDirectory, { force: true, recursive: true })
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
  backgroundColor: 'accent.solid',
  borderColor: 'border.default',
  borderRadius: 'md',
  color: 'accent.contrast',
  paddingInline: '4',
  paddingBlock: '2',
})

export const rainbowClassName = css({
  backgroundColor: 'bg.default',
  borderColor: 'danger.solid',
  color: 'fg.default',
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

rmSync(verifyDirectory, { force: true, recursive: true })
