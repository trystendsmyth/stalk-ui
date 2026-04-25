import { execFileSync } from 'node:child_process'

import { assertNoGeneratedDrift, snapshotPaths } from './generated-drift'

const paths = ['apps/docs/content/components']
const before = snapshotPaths(paths)

execFileSync('pnpm', ['generate-docs'], { stdio: 'inherit' })

assertNoGeneratedDrift(before, snapshotPaths(paths))
