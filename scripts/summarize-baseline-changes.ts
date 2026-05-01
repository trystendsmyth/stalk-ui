// Writes a markdown summary of Lost Pixel baseline changes (added/modified/
// removed) for the visual-regression workflow's PR comment.

import { execSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'

const baseRef = process.env.STALK_BASE_REF ?? 'origin/main'
const outputPath = process.argv[2] ?? '.lost-pixel-summary.md'

let diffOutput: string
try {
  diffOutput = execSync(
    `git diff --name-status ${baseRef}...HEAD -- 'apps/storybook/.lost-pixel/baseline/**.png'`,
    { encoding: 'utf8' },
  )
} catch (error) {
  console.error(`Could not compute baseline diff against ${baseRef}:`, (error as Error).message)
  process.exit(1)
}

const added: string[] = []
const modified: string[] = []
const removed: string[] = []

for (const line of diffOutput.split('\n')) {
  const trimmed = line.trim()
  if (trimmed === '') continue
  const [status, ...pathParts] = trimmed.split(/\s+/)
  const path = pathParts.join(' ')
  if (status?.startsWith('A')) added.push(path)
  else if (status?.startsWith('M')) modified.push(path)
  else if (status?.startsWith('D')) removed.push(path)
}

const lines: string[] = []
lines.push('## Lost Pixel baseline summary')
lines.push('')
lines.push(
  `**${String(added.length + modified.length + removed.length)}** baseline screenshot${
    added.length + modified.length + removed.length === 1 ? '' : 's'
  } changed in this PR (vs \`${baseRef}\`).`,
)
lines.push('')

const formatList = (heading: string, paths: string[]) => {
  if (paths.length === 0) return
  lines.push(`### ${heading} (${String(paths.length)})`)
  lines.push('')
  for (const path of paths.slice(0, 50)) {
    lines.push(`- \`${path.replace('apps/storybook/.lost-pixel/baseline/', '')}\``)
  }
  if (paths.length > 50) {
    lines.push(`- _…and ${String(paths.length - 50)} more_`)
  }
  lines.push('')
}

formatList('Added', added)
formatList('Modified', modified)
formatList('Removed', removed)

if (added.length === 0 && modified.length === 0 && removed.length === 0) {
  lines.push('_No baseline changes._')
}

writeFileSync(outputPath, `${lines.join('\n')}\n`)
console.log(`Lost Pixel baseline summary written to ${outputPath}`)
