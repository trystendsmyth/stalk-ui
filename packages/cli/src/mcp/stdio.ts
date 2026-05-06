import { join } from 'node:path'

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

import { defaultConfig } from '../constants'
import { pathExists } from '../fs'
import { resolveProject } from '../project'

import { createMcpServer } from './server'

import type { GlobalOptions } from '../types'
import type { ToolContext } from './tools'

export const runStdioMcpServer = async (options: GlobalOptions) => {
  let context: ToolContext

  try {
    const project = await resolveProject({ ...options, dryRun: true })
    const hasProjectConfig = await pathExists(join(project.root, 'stalk.config.json'))
    context = {
      config: project.config,
      packageManager: project.packageManager,
      hasProjectConfig,
    }
  } catch {
    context = { config: { ...defaultConfig }, hasProjectConfig: false }
  }

  const server = createMcpServer({ context, scope: 'local' })
  const transport = new StdioServerTransport()
  await server.connect(transport)

  if (options.verbose === true) {
    console.error(
      `[stalk-ui mcp] connected (project context: ${context.hasProjectConfig ? 'detected' : 'fallback'})`,
    )
  }
}
