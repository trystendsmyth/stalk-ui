// Caps the number of Lost Pixel baseline image changes per PR so a
// stylistic drift cannot silently hide unrelated regressions in a 200-image
// blast radius. PRs that legitimately need a larger sweep must apply the
// `baseline-only` label, which makes this gate a pure advisory.
//
// Inputs (provided by the GitHub Actions workflow):
//   STALK_PR_LABELS   — comma-separated list of PR labels
//   STALK_BASE_REF    — base ref to diff against (e.g. `origin/main`)
// Default cap: 40 changed PNGs. Override with STALK_BASELINE_CAP.

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
    "If this is an intentional global visual change (theme refresh, token rename, etc.), apply the 'baseline-only' label to bypass this gate. Otherwise split the changes across smaller PRs so reviewers can spot regressions.",
  )
  process.exit(1)
}

console.log(
  `Lost Pixel baseline-size gate passed: ${String(changedFiles.length)} of ${String(cap)} allowed PNGs changed.`,
)
