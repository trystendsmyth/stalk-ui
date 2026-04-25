import { execa } from 'execa'

import type { GlobalOptions, PackageManager } from './types'

const installCommands: Record<PackageManager, string[]> = {
  bun: ['add'],
  npm: ['install'],
  pnpm: ['add'],
  yarn: ['add'],
}

export const installPackages = async (
  packageManager: PackageManager,
  packages: string[],
  options: GlobalOptions,
) => {
  if (packages.length === 0) {
    return
  }

  if (options.dryRun === true) {
    console.log(
      `[dry-run] ${packageManager} ${installCommands[packageManager].join(' ')} ${packages.join(' ')}`,
    )
    return
  }

  await execa(packageManager, [...installCommands[packageManager], ...packages], {
    stdio: options.verbose === true ? 'inherit' : 'pipe',
  })
}

export const runPandaCodegen = async (packageManager: PackageManager, options: GlobalOptions) => {
  if (options.codegen === false) {
    return
  }

  if (options.dryRun === true) {
    console.log(`[dry-run] ${packageManager} exec panda codegen`)
    return
  }

  const args =
    packageManager === 'npm' ? ['exec', 'panda', 'codegen'] : ['exec', 'panda', 'codegen']

  await execa(packageManager, args, {
    stdio: options.verbose === true ? 'inherit' : 'pipe',
  })
}
