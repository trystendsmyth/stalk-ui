import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const storyIndexPath = join(root, 'apps/storybook/storybook-static/index.json')

interface StorybookIndex {
  entries?: Record<string, unknown>
}

execFileSync('pnpm', ['--filter', '@stalk-ui/storybook', 'build'], { stdio: 'inherit' })

const storyIndex = JSON.parse(readFileSync(storyIndexPath, 'utf8')) as StorybookIndex
const storyIds = new Set(Object.keys(storyIndex.entries ?? {}))
const requiredStories = [
  'components-button--solid',
  'components-button--variants',
  'components-button--rtl',
  'components-button--dark-mode',
  'components-input--default',
  'components-input--states',
  'components-input--rtl',
  'components-input--dark-mode',
  'components-textarea--default',
  'components-textarea--states',
  'components-textarea--rtl',
  'components-textarea--dark-mode',
]

for (const storyId of requiredStories) {
  if (!storyIds.has(storyId)) {
    throw new Error(`Missing Storybook story for a11y coverage: ${storyId}`)
  }
}

console.log('Storybook a11y addon build and required Button stories passed.')
