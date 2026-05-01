// Caps Lost Pixel baseline PNG changes per PR. Bypass with the
// `baseline-only` label. Env: STALK_BASE_REF, STALK_PR_LABELS,
// STALK_BASELINE_CAP (default 40).

import { execSync } from 'node:child_process'

const baseRef = process.env.STALK_BASE_REF ?? 'origin/main'
const labels = (process.env.STALK_PR_LABELS ?? '')
  .split(',')
  .map((label) => label.trim())
  .filter(Boolean)
const cap = Number.parseInt(process.env.STALK_BASELINE_CAP ?? '40', 10)

if (labels.includes('baseline-only')) {
  console.log("Skipping baseline-PR-size gate: 'baseline-only' label is set.")
  process.exit(0)
}

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

const changedFiles = diffOutput
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean)

if (changedFiles.length > cap) {
  console.error(
    `Lost Pixel baseline change too large: ${String(changedFiles.length)} PNGs changed (cap: ${String(cap)}).`,
  )
  console.error(
    "Apply the 'baseline-only' label for intentional global changes, or split into smaller PRs.",
  )
  process.exit(1)
}

console.log(
  `Lost Pixel baseline-size gate passed: ${String(changedFiles.length)} of ${String(cap)} allowed PNGs changed.`,
)
