import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

const declarationPath = join(import.meta.dirname, '../packages/preset/dist/index.d.cts')

writeFileSync(
  declarationPath,
  `import type { Preset } from '@pandacss/dev';

declare const stalkPreset: Preset;

export = stalkPreset;
`,
)
