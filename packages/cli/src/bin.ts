import { cancel, intro, outro } from '@clack/prompts'
import { Command } from 'commander'

import {
  addCommand,
  diffCommand,
  infoCommand,
  initCommand,
  readCliVersion,
  themeCommand,
  upgradeCommand,
} from './commands'
import { CliError } from './errors'
import { initMcpCommand, type McpClient } from './mcp/init'
import { runStdioMcpServer } from './mcp/stdio'

import type { GlobalOptions } from './types'

interface InitCommandOptions extends GlobalOptions {
  accentColor?: string
  borderRadius?: string
  grayColor?: string
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
  ).action(async (options: InitCommandOptions) => {
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

  program
    .command('theme [name]')
    .description('show Stalk UI theme usage')
    .action((name?: string) => {
      intro(name === undefined ? 'Stalk UI themes' : `Stalk UI theme ${name}`)
      themeCommand(name)
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

  withGlobalOptions(program.command('info').description('print project context'))
    .option('--json', 'emit JSON')
    .action(async (options: GlobalOptions & { json?: boolean }) => {
      await infoCommand(options)
    })

  const mcp = program.command('mcp').description('Stalk UI MCP server')

  mcp
    .command('start', { isDefault: true })
    .description('start the stdio MCP server')
    .option('--verbose', 'log connection diagnostics to stderr')
    .action(async (options: GlobalOptions) => {
      await runStdioMcpServer(options)
    })

  mcp
    .command('init')
    .description('write MCP config for an editor (defaults to remote https://stalk-ui.com/mcp)')
    .option('--client <client>', 'editor (claude | cursor | vscode | opencode | codex)', 'claude')
    .option('--local', 'configure the stdio server instead of the remote URL')
    .option('--url <url>', 'override the remote MCP URL')
    .option('--dry-run', 'print intended writes without modifying files')
    .action(
      async (options: { client: McpClient; local?: boolean; url?: string; dryRun?: boolean }) => {
        intro('Stalk UI MCP init')
        await initMcpCommand(process.cwd(), options)
        outro('Done')
      },
    )

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
