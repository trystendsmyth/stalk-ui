import { join } from 'node:path'

import { note } from '@clack/prompts'

import { CliError } from '../errors'
import { readJsonIfExists, writeJson, writeText } from '../fs'

import type { GlobalOptions } from '../types'

export type McpClient = 'claude' | 'cursor' | 'vscode' | 'opencode' | 'codex'

export const REMOTE_MCP_URL = 'https://stalk-ui.com/mcp'

interface InitMcpOptions extends GlobalOptions {
  client: McpClient
  local?: boolean
  url?: string
}

interface JsonConfig {
  mcpServers?: Record<string, unknown>
  servers?: Record<string, unknown>
}

const remoteServerConfig = (url: string) => ({
  type: 'http' as const,
  url,
})

const localServerConfig = () => ({
  command: 'npx',
  args: ['-y', '@stalk-ui/cli', 'mcp'],
})

const writeJsonConfig = async (
  path: string,
  key: 'mcpServers' | 'servers',
  serverEntry: unknown,
  options: GlobalOptions,
) => {
  const existing = (await readJsonIfExists<JsonConfig>(path)) ?? {}
  const next: JsonConfig = {
    ...existing,
    [key]: { ...(existing[key] ?? {}), 'stalk-ui': serverEntry },
  }

  if (options.dryRun === true) {
    console.log(`[dry-run] write ${path}`)
    return
  }

  await writeJson(path, next)
}

const writeTomlConfig = async (path: string, body: string, options: GlobalOptions) => {
  if (options.dryRun === true) {
    console.log(`[dry-run] write ${path}`)
    return
  }
  await writeText(path, body)
}

export const initMcpCommand = async (cwd: string, options: InitMcpOptions) => {
  const url = options.url ?? REMOTE_MCP_URL
  const serverEntry = options.local === true ? localServerConfig() : remoteServerConfig(url)

  switch (options.client) {
    case 'claude': {
      const path = join(cwd, '.mcp.json')
      await writeJsonConfig(path, 'mcpServers', serverEntry, options)
      note(`Wrote ${path}.`, 'Claude Code MCP configured')
      return
    }
    case 'cursor': {
      const path = join(cwd, '.cursor', 'mcp.json')
      await writeJsonConfig(path, 'mcpServers', serverEntry, options)
      note(`Wrote ${path}.`, 'Cursor MCP configured')
      return
    }
    case 'vscode': {
      const path = join(cwd, '.vscode', 'mcp.json')
      await writeJsonConfig(path, 'servers', serverEntry, options)
      note(`Wrote ${path}.`, 'VS Code MCP configured')
      return
    }
    case 'opencode': {
      const path = join(cwd, 'opencode.json')
      await writeJsonConfig(path, 'mcpServers', serverEntry, options)
      note(`Wrote ${path}.`, 'OpenCode MCP configured')
      return
    }
    case 'codex': {
      const path = join(cwd, '.codex', 'config.toml')
      const body =
        options.local === true
          ? `[mcp_servers.stalk-ui]\ncommand = "npx"\nargs = ["-y", "@stalk-ui/cli", "mcp"]\n`
          : `[mcp_servers.stalk-ui]\nurl = "${url}"\n`
      await writeTomlConfig(path, body, options)
      note(`Wrote ${path}.`, 'Codex MCP configured')
      return
    }
    default: {
      const exhaustiveCheck: never = options.client
      throw new CliError(`Unknown MCP client: ${String(exhaustiveCheck)}`)
    }
  }
}
