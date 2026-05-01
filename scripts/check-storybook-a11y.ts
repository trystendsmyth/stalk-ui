import { execFileSync } from 'node:child_process'
import { readFileSync, readdirSync } from 'node:fs'
import { basename, join } from 'node:path'

const root = process.cwd()
const storyIndexPath = join(root, 'apps/storybook/storybook-static/index.json')
const storiesDirectory = join(root, 'packages/components/src')

interface StorybookIndex {
  entries?: Record<string, unknown>
}

const toKebab = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()

const collectExpectedStoryIds = (): string[] => {
  const expected: string[] = ['foundation-semantic-tokens--docs']

  const storyFiles = readdirSync(storiesDirectory).filter((file) => file.endsWith('.stories.tsx'))

  if (storyFiles.length === 0) {
    throw new Error(`No story files found in ${storiesDirectory}`)
  }

  for (const file of storyFiles) {
    const componentName = basename(file, '.stories.tsx')
    const componentSlug = componentName.replaceAll('-', '')
    const source = readFileSync(join(storiesDirectory, file), 'utf8')
    const exportNames = [...source.matchAll(/^export const (\w+)\b/gm)].map((match) => match[1])

    if (exportNames.length === 0) {
      throw new Error(`No stories exported from ${file}`)
    }

    for (const name of exportNames) {
      expected.push(`components-${componentSlug}--${toKebab(name)}`)
    }
  }

  return expected
}

execFileSync('pnpm', ['--filter', '@stalk-ui/storybook', 'build'], { stdio: 'inherit' })

const storyIndex = JSON.parse(readFileSync(storyIndexPath, 'utf8')) as StorybookIndex
const storyIds = new Set(Object.keys(storyIndex.entries ?? {}))

const expectedStoryIds = collectExpectedStoryIds()
const missing = expectedStoryIds.filter((storyId) => !storyIds.has(storyId))

if (missing.length > 0) {
  throw new Error(
    `Missing Storybook stories in built index:\n${missing.map((id) => `  - ${id}`).join('\n')}`,
  )
}

console.log(
  `Storybook a11y addon build OK; ${String(expectedStoryIds.length)} expected stories present in index.`,
)
