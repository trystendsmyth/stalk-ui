import { execFileSync } from 'node:child_process'

import { assertNoGeneratedDrift, snapshotPaths } from './generated-drift'

const paths = ['apps/docs/lib/rsc-boundaries.ts']
const before = snapshotPaths(paths)

execFileSync('pnpm', ['generate-rsc-boundaries'], { stdio: 'inherit' })

assertNoGeneratedDrift(before, snapshotPaths(paths))
console.log('RSC boundaries doc is current.')
