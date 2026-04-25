import { execFileSync } from 'node:child_process'

import { assertNoGeneratedDrift, snapshotPaths } from './generated-drift'

const paths = ['public/r', 'public/_headers']
const before = snapshotPaths(paths)

execFileSync('pnpm', ['build:registry'], { stdio: 'inherit' })

assertNoGeneratedDrift(before, snapshotPaths(paths))
