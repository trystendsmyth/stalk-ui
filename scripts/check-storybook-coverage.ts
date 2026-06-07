// Builds Storybook and verifies every expected story is present in the
// generated index. Story coverage only; axe is handled by the a11y addon.

import { execFileSync } from 'node:child_process'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

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

// Mirror Storybook's `sanitize`/`toId`: lowercase, collapse any run of
// non-alphanumerics (slashes, spaces) to a single dash, trim dashes. This makes
// the expected id track the story `title` so components can be grouped into
// nested folders (e.g. `Components/Typography/Text`) without breaking coverage.
const toId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const collectExpectedStoryIds = (): string[] => {
  const expected: string[] = ['foundation-semantic-tokens--docs']

  const storyFiles = readdirSync(storiesDirectory).filter((file) => file.endsWith('.stories.tsx'))

  if (storyFiles.length === 0) {
    throw new Error(`No story files found in ${storiesDirectory}`)
  }

  for (const file of storyFiles) {
    const source = readFileSync(join(storiesDirectory, file), 'utf8')

    const titleMatch = /title:\s*'([^']+)'/.exec(source)
    if (titleMatch?.[1] === undefined) {
      throw new Error(`No story title found in ${file}`)
    }
    const titleSlug = toId(titleMatch[1])

    const exportNames = [...source.matchAll(/^export const (\w+)\b/gm)]
      .map((match) => match[1])
      .filter((name): name is string => name !== undefined)

    if (exportNames.length === 0) {
      throw new Error(`No stories exported from ${file}`)
    }

    for (const name of exportNames) {
      expected.push(`${titleSlug}--${toKebab(name)}`)
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
  `Storybook coverage OK; ${String(expectedStoryIds.length)} expected stories present in index.`,
)
