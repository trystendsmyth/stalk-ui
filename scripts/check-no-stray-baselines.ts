// Guard against accidentally committing Lost Pixel `current/` or `difference/`
// artifacts. Only the curated `baseline/` directory should ever be tracked
// by git. CI exit code is non-zero if any stray PNG slipped into the index.

import { execSync } from 'node:child_process'

const tracked = execSync('git ls-files apps/storybook/.lost-pixel', { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean)

const stray = tracked.filter(
  (path) =>
    path.includes('/current/') ||
    path.includes('/difference/') ||
    path.startsWith('apps/storybook/.lost-pixel/current/') ||
    path.startsWith('apps/storybook/.lost-pixel/difference/'),
)

if (stray.length > 0) {
  console.error(
    'Stray Lost Pixel artifacts are tracked by git — only `baseline/` should be committed:',
  )
  for (const path of stray) console.error(`  - ${path}`)
  console.error('\nRun `git rm` on the listed files and re-commit.')
  process.exit(1)
}

console.log(
  `Lost Pixel stray-artifact check passed (${String(tracked.length)} tracked baseline files).`,
)
