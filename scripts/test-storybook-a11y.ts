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
  'components-badge--default',
  'components-badge--variants',
  'components-badge--rtl',
  'components-badge--dark-mode',
  'components-button--solid',
  'components-button--variants',
  'components-button--rtl',
  'components-button--dark-mode',
  'components-checkbox--default',
  'components-checkbox--states',
  'components-checkbox--rtl',
  'components-checkbox--dark-mode',
  'components-dialog--default',
  'components-dialog--open',
  'components-dialog--rtl',
  'components-dialog--dark-mode',
  'components-dropdownmenu--default',
  'components-dropdownmenu--open',
  'components-dropdownmenu--rtl',
  'components-dropdownmenu--dark-mode',
  'components-input--default',
  'components-input--states',
  'components-input--rtl',
  'components-input--dark-mode',
  'components-label--default',
  'components-label--required',
  'components-label--rtl',
  'components-label--dark-mode',
  'components-radio--default',
  'components-radio--states',
  'components-radio--rtl',
  'components-radio--dark-mode',
  'components-select--default',
  'components-select--states',
  'components-select--rtl',
  'components-select--dark-mode',
  'components-switch--default',
  'components-switch--states',
  'components-switch--rtl',
  'components-switch--dark-mode',
  'components-tooltip--default',
  'components-tooltip--open',
  'components-tooltip--rtl',
  'components-tooltip--dark-mode',
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

console.log('Storybook a11y addon build and required component stories passed.')
