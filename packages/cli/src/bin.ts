import { cancel, intro, outro } from '@clack/prompts'
import { Command } from 'commander'

import {
  addCommand,
  diffCommand,
  initCommand,
  readCliVersion,
  themeCommand,
  upgradeCommand,
} from './commands'
import { CliError } from './errors'

import type { GlobalOptions } from './types'

interface InitCommandOptions extends GlobalOptions {
  accentColor?: string
  borderRadius?: string
  grayColor?: string
}

interface ThemeCommandOptions extends GlobalOptions {
  accentColor?: string
}

const withGlobalOptions = (command: Command) =>
  command
    .option('--dry-run', 'print intended changes without writing files')
    .option('--force', 'overwrite existing files without prompting')
    .option('--verbose', 'print detailed debug output')
    .option('--no-codegen', 'skip panda codegen')
    .option('--registry <url>', 'override registry URL or URL template')
    .option('--config <path>', 'path to panda config')
    .option('--workspace <name>', 'workspace name when running at a monorepo root')

const main = async () => {
  const program = new Command()

  program.name('stalk-ui').description('Install and manage Stalk UI components')
  program.version(await readCliVersion())

  withGlobalOptions(
    program.command('init').description('initialize Stalk UI in the current project'),
  )
    .option('--accent-color <color>', 'default accent color', 'blue')
    .option('--gray-color <color>', 'default gray color', 'neutral')
    .option('--border-radius <radius>', 'default border radius', 'md')
    .action(async (options: InitCommandOptions) => {
      intro('Stalk UI init')
      await initCommand(options)
      outro('Done')
    })

  withGlobalOptions(
    program.command('add <name>').description('install a component from a registry'),
  ).action(async (name: string, options: GlobalOptions) => {
    intro(`Stalk UI add ${name}`)
    await addCommand(name, options)
    outro('Done')
  })

  withGlobalOptions(program.command('theme <name>').description('add an additional accent theme'))
    .option('--accent-color <color>', 'base accent color used in the primary preset')
    .action(async (name: string, options: ThemeCommandOptions) => {
      intro(`Stalk UI theme ${name}`)
      await themeCommand(name, options)
      outro('Done')
    })

  withGlobalOptions(
    program.command('diff <name>').description('compare a local component to the registry'),
  ).action(async (name: string, options: GlobalOptions) => {
    await diffCommand(name, options)
  })

  withGlobalOptions(
    program.command('upgrade').description('upgrade shared Stalk UI runtime packages'),
  ).action(async (options: GlobalOptions) => {
    intro('Stalk UI upgrade')
    await upgradeCommand(options)
    outro('Done')
  })

  await program.parseAsync()
}

try {
  await main()
} catch (error) {
  if (error instanceof CliError) {
    cancel(error.message)
    process.exitCode = 1
  } else {
    throw error
  }
}
