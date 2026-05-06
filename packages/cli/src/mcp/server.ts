import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

import {
  getAddCommandTool,
  getAuditChecklistTool,
  getInstallInstructionsTool,
  getProjectRegistriesTool,
  listItemsTool,
  searchItemsTool,
  viewItemsTool,
} from './tools'

import type { ToolContext } from './tools'

const variantField = z.enum(['radix', 'base']).optional()
const flavorField = z.enum(['stalk', 'shadcn']).optional()

const wrap = async <T>(impl: () => Promise<T> | T) => {
  try {
    const result = await impl()
    return result as { text: string }
  } catch (error) {
    return {
      text: `Error: ${error instanceof Error ? error.message : String(error)}`,
      isError: true,
    }
  }
}

const toMcp = (result: { text: string; isError?: boolean }) => ({
  content: [{ type: 'text' as const, text: result.text }],
  ...(result.isError === true ? { isError: true } : {}),
})

export interface ServerOptions {
  context: ToolContext
  /** Skip tools that depend on local project context. */
  scope: 'local' | 'remote'
}

export const createMcpServer = ({ context, scope }: ServerOptions): McpServer => {
  const server = new McpServer({ name: 'stalk-ui', version: '1.0.0' })

  server.registerTool(
    'list_items',
    {
      description:
        "List components in Stalk UI registries. Filter by `variant` (default: project's primitives, or `radix`) and `flavor` (`stalk` or `shadcn`).",
      inputSchema: {
        registries: z.array(z.string()).optional(),
        variant: variantField,
        flavor: flavorField,
      },
    },
    async (args) => toMcp(await wrap(() => listItemsTool(context, args))),
  )

  server.registerTool(
    'search_items',
    {
      description: 'Fuzzy search for Stalk UI components by name across registries.',
      inputSchema: {
        query: z.string(),
        registries: z.array(z.string()).optional(),
        variant: variantField,
        flavor: flavorField,
        limit: z.number().int().positive().optional(),
      },
    },
    async (args) => toMcp(await wrap(() => searchItemsTool(context, args))),
  )

  server.registerTool(
    'view_items',
    {
      description:
        'Fetch full manifests (file contents, dependencies, recipes, semantic tokens) for one or more registry items. Names use the `@<registry>/<name>` form, e.g. `@stalk-ui/button`.',
      inputSchema: {
        items: z.array(z.string()).min(1),
      },
    },
    async (args) => toMcp(await wrap(() => viewItemsTool(context, args))),
  )

  server.registerTool(
    'get_add_command',
    {
      description: 'Return the CLI command(s) to install one or more Stalk UI components.',
      inputSchema: {
        items: z.array(z.string()).min(1),
      },
    },
    (args) => toMcp(getAddCommandTool(context, args)),
  )

  server.registerTool(
    'get_install_instructions',
    {
      description:
        'Return prerequisites and setup steps for installing Stalk UI in a Next.js or React project.',
      inputSchema: {},
    },
    () => toMcp(getInstallInstructionsTool()),
  )

  server.registerTool(
    'get_audit_checklist',
    {
      description:
        'Return a Stalk UI audit checklist (panda codegen, semantic tokens, RTL, tree-shaking) to run after generating or modifying components.',
      inputSchema: {},
    },
    () => toMcp(getAuditChecklistTool()),
  )

  if (scope === 'local') {
    server.registerTool(
      'get_project_registries',
      {
        description:
          'Return the registries configured in stalk.config.json for the current project. Local-only.',
        inputSchema: {},
      },
      () => toMcp(getProjectRegistriesTool(context)),
    )
  }

  return server
}
